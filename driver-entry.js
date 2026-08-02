// Leave blank for local prototype mode. After following GOOGLE_DRIVE_SETUP.md,
// paste the deployed Google Apps Script /exec URL here.
const DRIVER_API_ENDPOINT = "";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("driver-entry-form");
  const message = document.getElementById("entry-message");
  const attendanceDate = document.getElementById("attendance-date");
  if (!form || !message) return;

  if (attendanceDate && !attendanceDate.value) {
    attendanceDate.value = new Date().toISOString().slice(0, 10);
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    message.className = "entry-message entry-message--working";
    message.textContent = "Saving driver record…";

    const formData = new FormData(form);
    const files = ["aadhaarFile", "licenceFile", "photoFile", "policeFile"];
    const oversized = files.map((name) => formData.get(name)).find((file) => file && file.size > 10 * 1024 * 1024);
    if (oversized) {
      message.className = "entry-message entry-message--error";
      message.textContent = `${oversized.name} is larger than 10 MB. Choose a smaller file.`;
      return;
    }

    try {
      if (DRIVER_API_ENDPOINT) {
        // Apps Script accepts URL-encoded JSON reliably without a CORS preflight.
        const payload = await serializeForm(formData, files);
        const response = await fetch(DRIVER_API_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(payload)
        });
        const result = await response.json();
        if (!result.ok) throw new Error(result.error || "The Drive service rejected the record.");
        showSuccess(`Driver saved. Record ID: ${result.recordId}`);
      } else {
        const record = Object.fromEntries([...formData.entries()].filter(([, value]) => typeof value === "string"));
        record.documents = files.map((name) => formData.get(name)).filter((file) => file && file.name).map((file) => file.name);
        record.savedAt = new Date().toISOString();
        const records = JSON.parse(localStorage.getItem("liumgoDriverRecords") || "[]");
        records.push(record);
        localStorage.setItem("liumgoDriverRecords", JSON.stringify(records));
        showSuccess("Driver record saved in this browser (prototype mode). Connect Google Drive before production use.");
      }
      form.reset();
      if (attendanceDate) attendanceDate.value = new Date().toISOString().slice(0, 10);
    } catch (error) {
      message.className = "entry-message entry-message--error";
      message.textContent = `Could not save: ${error.message}`;
    }
  });

  function showSuccess(text) {
    message.className = "entry-message entry-message--success";
    message.textContent = text;
  }
});

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
