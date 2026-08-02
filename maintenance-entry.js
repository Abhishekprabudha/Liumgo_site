const MAINTENANCE_API_ENDPOINT = "https://script.google.com/macros/s/AKfycbz5FqngMF4rO_9EQeOnpx7PFEGoBLfty3535T41-X-HSYi8d2uSCO6DF8FlwwEJ0e01/exec";
const MAINTENANCE_STORAGE_KEY = "liumgoMaintenanceRecords";
const MAINTENANCE_FILE_FIELDS = ["rcFile", "insuranceFile", "fitnessFile", "serviceFile"];
const MAINTENANCE_REQUEST_TIMEOUT_MS = 30000;

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("maintenance-entry-form");
  const message = document.getElementById("maintenance-message");
  const recordSelect = document.getElementById("vehicle-record-select");
  const recordContext = document.getElementById("vehicle-record-context");
  if (!form || !message || !recordSelect || !recordContext) return;

  let activeRecordId = "";
  let isLoadingRecord = false;
  refreshRecordOptions();
  setRelatedSectionsEnabled(false);

  form.addEventListener("submit", (event) => event.preventDefault());
  form.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-save-section]");
    if (button) await saveSection(button.dataset.saveSection, button);
  });
  recordSelect.addEventListener("change", () => {
    if (recordSelect.value) loadRecord(recordSelect.value);
    else resetForNewVehicle();
  });
  form.addEventListener("reset", () => {
    if (!isLoadingRecord) window.setTimeout(resetForNewVehicle, 0);
  });

  async function saveSection(sectionName, button) {
    if (sectionName !== "vehicle" && !activeRecordId) {
      showMessage("Save or select vehicle details first.", "error");
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
    const files = MAINTENANCE_FILE_FIELDS.map((name) => formData.get(name)).filter((file) => file?.name);
    const invalidFile = files.find((file) => file.size > 10 * 1024 * 1024);
    if (invalidFile) {
      showMessage(`${invalidFile.name} is larger than 10 MB.`, "error");
      return;
    }

    button.disabled = true;
    showMessage(`Saving ${sectionTitle(sectionName)}…`, "working");
    const isNewRecord = !activeRecordId;
    try {
      const fields = Object.fromEntries([...formData.entries()].filter(([, value]) => typeof value === "string"));
      if (!activeRecordId) activeRecordId = createRecordId();
      // Keep the user's field values even when the remote service is unavailable. Previously,
      // any backend error discarded a new record ID and left every later section locked.
      saveLocally(sectionName, fields, files);
      setRelatedSectionsEnabled(true);
      refreshRecordOptions();
      recordSelect.value = activeRecordId;
      updateRecordContext();

      if (MAINTENANCE_API_ENDPOINT) {
        const documents = await Promise.all(files.map(async (file) => ({
          field: MAINTENANCE_FILE_FIELDS.find((name) => formData.get(name) === file),
          name: file.name,
          type: file.type,
          data: await fileToBase64(file)
        })));
        const response = await fetchWithTimeout(MAINTENANCE_API_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify({ recordId: activeRecordId, section: sectionName, fields, documents })
        });
        const responseText = await response.text();
        let result;
        try {
          result = JSON.parse(responseText);
        } catch {
          throw new Error("The backend returned an invalid response. Check the Apps Script deployment access and /exec URL.");
        }
        if (!response.ok || !result.ok) throw new Error(result.error || "The storage service rejected the update.");
        activeRecordId = result.recordId || activeRecordId;
      }
      showMessage(`${sectionTitle(sectionName)} saved to the backend for ${activeRecordId}.`, "success");
    } catch (error) {
      const localMessage = isNewRecord
        ? `Your entries are saved in this browser as ${activeRecordId}, and the remaining sections are now available.`
        : "Your latest entries are still saved in this browser.";
      showMessage(`Backend save failed: ${friendlyError(error)} ${localMessage} Try saving this section again.`, "error");
    } finally {
      button.disabled = false;
    }
  }

  function saveLocally(sectionName, fields, files) {
    const records = getRecords();
    let record = records.find((item) => item.recordId === activeRecordId);
    if (!record) {
      record = { recordId: activeRecordId, sections: {}, createdAt: new Date().toISOString() };
      records.push(record);
    }
    if (!record.sections) record.sections = {};
    const sectionData = { ...fields, savedAt: new Date().toISOString() };
    if (sectionName === "documents") sectionData.documentNames = files.map((file) => file.name);
    record.sections[sectionName] = sectionData;
    record.updatedAt = sectionData.savedAt;
    localStorage.setItem(MAINTENANCE_STORAGE_KEY, JSON.stringify(records));
  }

  function loadRecord(recordId) {
    const record = getRecords().find((item) => item.recordId === recordId);
    if (!record) return resetForNewVehicle();
    activeRecordId = record.recordId;
    isLoadingRecord = true;
    form.reset();
    isLoadingRecord = false;
    const sections = record.sections || { vehicle: record };
    Object.values(sections).forEach((data) => Object.entries(data).forEach(([name, value]) => {
      const control = form.elements.namedItem(name);
      if (control && control.type !== "file" && typeof value === "string") control.value = value;
    }));
    recordSelect.value = activeRecordId;
    setRelatedSectionsEnabled(true);
    updateRecordContext();
    showMessage("Vehicle selected. Each related section can now be saved separately.", "success");
  }

  function resetForNewVehicle() {
    activeRecordId = "";
    recordSelect.value = "";
    setRelatedSectionsEnabled(false);
    recordContext.textContent = "Save a vehicle first, or select an existing vehicle to add information.";
    message.className = "entry-message";
    message.textContent = "";
  }

  function setRelatedSectionsEnabled(enabled) {
    form.querySelectorAll('[data-section]:not([data-section="vehicle"])').forEach((section) => {
      section.classList.toggle("entry-card--locked", !enabled);
      section.setAttribute("aria-disabled", String(!enabled));
      section.querySelectorAll("input, select, textarea, button").forEach((control) => { control.disabled = !enabled; });
    });
  }

  function refreshRecordOptions() {
    const selected = activeRecordId;
    recordSelect.innerHTML = '<option value="">New vehicle</option>';
    getRecords().forEach((record) => {
      const vehicle = record.sections?.vehicle || record;
      const option = document.createElement("option");
      option.value = record.recordId;
      option.textContent = `${vehicle.registrationNumber || "Unnamed vehicle"} · ${vehicle.assetId || record.recordId}`;
      recordSelect.append(option);
    });
    recordSelect.value = selected;
  }

  function updateRecordContext() {
    const record = getRecords().find((item) => item.recordId === activeRecordId);
    const vehicle = record?.sections?.vehicle || record || {};
    recordContext.textContent = `Adding information for ${vehicle.registrationNumber || "this vehicle"} (${activeRecordId}).`;
  }

  function getRecords() {
    try { return JSON.parse(localStorage.getItem(MAINTENANCE_STORAGE_KEY) || "[]"); }
    catch { return []; }
  }

  function showMessage(text, type) {
    message.className = `entry-message entry-message--${type}`;
    message.textContent = text;
  }
});

function createRecordId() {
  return `VEH-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

function sectionTitle(sectionName) {
  return { vehicle: "vehicle details", maintenance: "maintenance details", documents: "vehicle documents", mapping: "driver mapping" }[sectionName];
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1]);
    reader.onerror = () => reject(new Error(`Could not read ${file.name}.`));
    reader.readAsDataURL(file);
  });
}

async function fetchWithTimeout(url, options) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), MAINTENANCE_REQUEST_TIMEOUT_MS);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    window.clearTimeout(timeout);
  }
}

function friendlyError(error) {
  if (error?.name === "AbortError") return "The backend did not respond within 30 seconds.";
  if (error instanceof TypeError) return "The backend could not be reached. Check the deployment URL, access permissions, and network connection.";
  return error?.message || "An unexpected error occurred.";
}
