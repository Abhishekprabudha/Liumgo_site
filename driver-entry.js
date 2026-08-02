const DRIVER_API_ENDPOINT = "https://script.google.com/macros/s/AKfycbweZ7bZP9FmlLtiGJMuPGLkKDAgtqFhOJsTLSswcWvM9xc0cRLjSl2MVw5TjRvzpUf1Dw/exec";
const STORAGE_KEY = "liumgoDriverRecords";
const FILE_FIELDS = ["aadhaarFile", "licenceFile", "photoFile", "policeFile"];

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("driver-entry-form");
  const message = document.getElementById("entry-message");
  const recordSelect = document.getElementById("driver-record-select");
  const recordContext = document.getElementById("record-context");
  const attendanceDate = document.getElementById("attendance-date");
  if (!form || !message || !recordSelect) return;

  let activeRecordId = "";
  let isLoadingRecord = false;
  setToday();
  refreshRecordOptions();
  setRelatedSectionsEnabled(false);

  form.addEventListener("submit", (event) => event.preventDefault());

  form.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-save-section]");
    if (!button) return;
    await saveSection(button.dataset.saveSection, button);
  });

  recordSelect.addEventListener("change", () => {
    if (!recordSelect.value) {
      resetForNewDriver();
      return;
    }
    loadRecord(recordSelect.value);
  });

  form.addEventListener("reset", () => {
    if (!isLoadingRecord) window.setTimeout(resetForNewDriver, 0);
  });

  async function saveSection(sectionName, button) {
    if (sectionName !== "personal" && !activeRecordId) {
      showMessage("Save or select a driver’s personal details first.", "error");
      return;
    }

    const section = form.querySelector(`[data-section="${sectionName}"]`);
    const controls = [...section.querySelectorAll("input, select, textarea")];
    const invalidControl = controls.find((control) => !control.checkValidity());
    if (invalidControl) {
      invalidControl.reportValidity();
      showMessage(`Complete the required ${sectionTitle(sectionName)} fields before saving.`, "error");
      return;
    }

    const formData = new FormData();
    controls.forEach((control) => {
      if (control.type === "file") {
        if (control.files[0]) formData.append(control.name, control.files[0]);
      } else {
        formData.append(control.name, control.value);
      }
    });

    const oversized = FILE_FIELDS.map((name) => formData.get(name)).find((file) => file && file.size > 10 * 1024 * 1024);
    if (oversized) {
      showMessage(`${oversized.name} is larger than 10 MB. Choose a smaller file.`, "error");
      return;
    }

    button.disabled = true;
    showMessage(`Saving ${sectionTitle(sectionName)}…`, "working");
    const isNewRecord = !activeRecordId;
    try {
      const fields = Object.fromEntries([...formData.entries()].filter(([, value]) => typeof value === "string"));
      if (!activeRecordId) activeRecordId = createRecordId();

      if (DRIVER_API_ENDPOINT) {
        const payload = await serializeForm(formData, FILE_FIELDS);
        payload.recordId = activeRecordId;
        payload.section = sectionName;
        const response = await fetch(DRIVER_API_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(payload)
        });
        const result = await response.json();
        if (!response.ok || !result.ok) throw new Error(result.error || "The Drive service rejected the update.");
        activeRecordId = result.recordId || activeRecordId;
      }

      saveLocally(sectionName, fields, formData);
      setRelatedSectionsEnabled(true);
      refreshRecordOptions();
      recordSelect.value = activeRecordId;
      updateRecordContext();
      showMessage(`${sectionTitle(sectionName)} saved independently for record ${activeRecordId}.`, "success");
    } catch (error) {
      if (isNewRecord) activeRecordId = "";
      showMessage(`Could not save: ${error.message}`, "error");
    } finally {
      button.disabled = false;
    }
  }

  function saveLocally(sectionName, fields, formData) {
    const records = getRecords();
    let record = records.find((item) => item.id === activeRecordId);
    if (!record) {
      record = { id: activeRecordId, sections: {}, createdAt: new Date().toISOString() };
      records.push(record);
    }
    if (!record.sections) record.sections = {};
    const sectionData = { ...fields, savedAt: new Date().toISOString() };
    if (sectionName === "documents") {
      sectionData.documents = FILE_FIELDS.map((name) => formData.get(name))
        .filter((file) => file && file.name)
        .map((file) => file.name);
    }
    record.sections[sectionName] = sectionData;
    record.updatedAt = sectionData.savedAt;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  }

  function loadRecord(recordId) {
    const record = getRecords().find((item) => item.id === recordId);
    if (!record) return resetForNewDriver();
    activeRecordId = record.id;
    isLoadingRecord = true;
    form.reset();
    isLoadingRecord = false;
    const sections = record.sections || { personal: record };
    Object.values(sections).forEach((data) => {
      Object.entries(data).forEach(([name, value]) => {
        const control = form.elements.namedItem(name);
        if (control && control.type !== "file" && typeof value === "string") control.value = value;
      });
    });
    setToday();
    recordSelect.value = activeRecordId;
    setRelatedSectionsEnabled(true);
    updateRecordContext();
    showMessage("Driver selected. Each section can now be saved separately.", "success");
  }

  function resetForNewDriver() {
    activeRecordId = "";
    recordSelect.value = "";
    setToday();
    setRelatedSectionsEnabled(false);
    recordContext.textContent = "Create a personal profile to unlock the remaining sections.";
    message.className = "entry-message";
    message.textContent = "";
  }

  function setRelatedSectionsEnabled(enabled) {
    form.querySelectorAll('[data-section]:not([data-section="personal"])').forEach((section) => {
      section.classList.toggle("entry-card--locked", !enabled);
      section.setAttribute("aria-disabled", String(!enabled));
      section.querySelectorAll("input, select, textarea, button").forEach((control) => { control.disabled = !enabled; });
    });
  }

  function refreshRecordOptions() {
    const selected = activeRecordId;
    recordSelect.innerHTML = '<option value="">New driver</option>';
    getRecords().forEach((record) => {
      const personal = record.sections?.personal || record;
      const option = document.createElement("option");
      option.value = record.id;
      option.textContent = `${personal.fullName || "Unnamed driver"} · ${personal.mobile || record.id}`;
      recordSelect.append(option);
    });
    recordSelect.value = selected;
  }

  function updateRecordContext() {
    const record = getRecords().find((item) => item.id === activeRecordId);
    const personal = record?.sections?.personal || record || {};
    recordContext.textContent = `Adding information for ${personal.fullName || "this driver"} (${activeRecordId}).`;
  }

  function getRecords() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
    catch { return []; }
  }

  function setToday() {
    if (attendanceDate && !attendanceDate.value) attendanceDate.value = new Date().toISOString().slice(0, 10);
  }

  function showMessage(text, type) {
    message.className = `entry-message entry-message--${type}`;
    message.textContent = text;
  }
});

function createRecordId() {
  return `DRV-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

function sectionTitle(sectionName) {
  return { personal: "personal details", documents: "documents & compliance", attendance: "attendance", vehicle: "vehicle mapping" }[sectionName];
}

async function serializeForm(formData, fileFields) {
  const fields = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string") fields[key] = value;
  }
  const documents = [];
  for (const field of fileFields) {
    const file = formData.get(field);
    if (!file || !file.name) continue;
    documents.push({ field, name: file.name, type: file.type, data: await fileToBase64(file) });
  }
  return { fields, documents };
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1]);
    reader.onerror = () => reject(new Error(`Could not read ${file.name}.`));
    reader.readAsDataURL(file);
  });
}
