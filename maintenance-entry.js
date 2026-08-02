const MAINTENANCE_API_ENDPOINT = "";
const MAINTENANCE_STORAGE_KEY = "liumgoMaintenanceRecords";
const MAINTENANCE_FILE_FIELDS = ["rcFile", "insuranceFile", "fitnessFile", "serviceFile"];

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("maintenance-entry-form");
  const message = document.getElementById("maintenance-message");
  const submit = document.getElementById("maintenance-submit");
  if (!form || !message || !submit) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const files = MAINTENANCE_FILE_FIELDS.map((name) => data.get(name)).filter((file) => file?.name);
    const invalidFile = files.find((file) => file.size > 10 * 1024 * 1024);
    if (invalidFile) return showMessage(`${invalidFile.name} is larger than 10 MB.`, "error");

    submit.disabled = true;
    showMessage("Saving vehicle record…", "working");
    const recordId = `VEH-${Date.now().toString(36).toUpperCase()}`;
    try {
      const fields = Object.fromEntries([...data.entries()].filter(([, value]) => typeof value === "string"));
      if (MAINTENANCE_API_ENDPOINT) {
        const documents = await Promise.all(files.map(async (file) => ({
          field: MAINTENANCE_FILE_FIELDS.find((name) => data.get(name) === file), name: file.name,
          type: file.type, data: await fileToBase64(file)
        })));
        const response = await fetch(MAINTENANCE_API_ENDPOINT, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify({ recordId, fields, documents }) });
        const result = await response.json();
        if (!response.ok || !result.ok) throw new Error(result.error || "The storage service rejected the record.");
      }
      const records = JSON.parse(localStorage.getItem(MAINTENANCE_STORAGE_KEY) || "[]");
      records.push({ recordId, ...fields, documentNames: files.map((file) => file.name), savedAt: new Date().toISOString() });
      localStorage.setItem(MAINTENANCE_STORAGE_KEY, JSON.stringify(records));
      showMessage(`${recordId} saved${MAINTENANCE_API_ENDPOINT ? " to Google Drive" : " in this browser (prototype mode)"}.`, "success");
      form.reset();
    } catch (error) { showMessage(`Could not save: ${error.message}`, "error"); }
    finally { submit.disabled = false; }
  });

  function showMessage(text, type) { message.className = `entry-message entry-message--${type}`; message.textContent = text; }
});

function fileToBase64(file) {
  return new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(String(reader.result).split(",")[1]); reader.onerror = () => reject(new Error(`Could not read ${file.name}.`)); reader.readAsDataURL(file); });
}
