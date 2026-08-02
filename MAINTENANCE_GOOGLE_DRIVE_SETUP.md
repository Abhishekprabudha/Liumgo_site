# Connect maintenance entry to Google Drive

The page must **not** contain a Google password, OAuth secret or service-account key. Use a Google Apps Script web app as the server-side bridge: form fields go to a Sheet, while uploaded files go to a restricted Drive folder.

## 1. Create the Drive folder and register

1. Sign in with the Google Workspace account that should own the fleet records.
2. Create a Drive folder named **Lium Go Vehicle Records**. Restrict sharing to authorised fleet administrators. Copy the folder ID (the text after `folders/` in its URL).
3. Create a Google Sheet named **Lium Go Vehicle Register**, rename its first tab `Vehicles`, and copy its spreadsheet ID (between `/d/` and `/edit` in its URL).
4. Paste this header row into row 1 of `Vehicles`:

   `Record ID | Saved at | Registration number | Asset ID | Category | Powertrain | Make | Model | Model year | Odometer km | Home hub | Operational status | Service type | Priority | Last service date | Next service date | Workshop | Estimated cost | Maintenance notes | Insurance expiry | Fitness expiry | Permit expiry | PUC expiry | Driver name | Driver ID | Driver mobile | Mapping start | Mapping end | Shift | Mapping notes | Document folder URL`

## 2. Create the Apps Script bridge

Open [Google Apps Script](https://script.google.com), create a project, and replace `Code.gs` with the code below. Replace the two placeholder IDs.

```javascript
const DRIVE_FOLDER_ID = "REPLACE_WITH_FOLDER_ID";
const SPREADSHEET_ID = "REPLACE_WITH_SPREADSHEET_ID";
const FIELD_COLUMNS = {
  registrationNumber: 3, assetId: 4, category: 5, powertrain: 6, make: 7,
  model: 8, modelYear: 9, odometerKm: 10, homeHub: 11, operationalStatus: 12,
  serviceType: 13, priority: 14, lastServiceDate: 15, nextServiceDate: 16,
  workshop: 17, estimatedCost: 18, maintenanceNotes: 19, insuranceExpiry: 20,
  fitnessExpiry: 21, permitExpiry: 22, pucExpiry: 23, driverName: 24,
  driverId: 25, driverMobile: 26, mappingStart: 27, mappingEnd: 28,
  shift: 29, mappingNotes: 30
};

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const payload = JSON.parse(e.postData.contents);
    const fields = payload.fields || {};
    const recordId = String(payload.recordId || `VEH-${Date.now()}`).slice(0, 50);
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName("Vehicles");
    const row = findOrCreateRow(sheet, recordId);
    let folder = findVehicleFolder(recordId);

    if (!folder && (payload.documents || []).length) {
      folder = DriveApp.getFolderById(DRIVE_FOLDER_ID)
        .createFolder(`${safeName(recordId)} - ${safeName(fields.registrationNumber)}`);
    }
    (payload.documents || []).forEach(doc => saveDocument(folder, doc));
    Object.keys(fields).forEach(name => {
      if (FIELD_COLUMNS[name]) sheet.getRange(row, FIELD_COLUMNS[name]).setValue(fields[name]);
    });
    sheet.getRange(row, 2).setValue(new Date());
    if (folder) sheet.getRange(row, 31).setValue(folder.getUrl());
    return json({ ok: true, recordId: recordId, section: payload.section || "complete" });
  } catch (error) {
    return json({ ok: false, error: error.message });
  } finally {
    lock.releaseLock();
  }
}

function findOrCreateRow(sheet, recordId) {
  const lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    const match = sheet.getRange(2, 1, lastRow - 1, 1).createTextFinder(recordId)
      .matchEntireCell(true).findNext();
    if (match) return match.getRow();
  }
  const row = lastRow + 1;
  sheet.getRange(row, 1).setValue(recordId);
  return row;
}

function findVehicleFolder(recordId) {
  const folders = DriveApp.getFolderById(DRIVE_FOLDER_ID).getFolders();
  while (folders.hasNext()) {
    const folder = folders.next();
    if (folder.getName().startsWith(`${safeName(recordId)} -`)) return folder;
  }
  return null;
}

function saveDocument(folder, doc) {
  if (!folder || !doc.data || !doc.name) return;
  const allowed = ["application/pdf", "image/jpeg", "image/png"];
  if (!allowed.includes(doc.type)) throw new Error(`Unsupported file type: ${doc.type}`);
  const bytes = Utilities.base64Decode(doc.data);
  if (bytes.length > 10 * 1024 * 1024) throw new Error(`${doc.name} exceeds 10 MB`);
  folder.createFile(Utilities.newBlob(bytes, doc.type, safeName(doc.name)));
}

function safeName(value) {
  return String(value || "record").replace(/[\\/:*?"<>|]/g, "-").slice(0, 100);
}

function json(value) {
  return ContentService.createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## 3. Deploy and connect the page

1. In Apps Script, open **Project Settings** and choose the correct time zone.
2. Select **Deploy → New deployment → Web app**.
3. Choose **Execute as: Me**. Prefer **Who has access: Anyone in your Workspace domain**. If the static site cannot authenticate to that domain, use “Anyone” only for a controlled pilot; a production system should use an authenticated backend.
4. Authorise Sheet and Drive access, deploy, then copy the URL ending in `/exec` (not `/dev`).
5. Open `maintenance-entry.js` and set `MAINTENANCE_API_ENDPOINT` to the `/exec` URL:

   ```javascript
   const MAINTENANCE_API_ENDPOINT = "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec";
   ```

6. Submit a test record. Confirm that a new row appears in `Vehicles`, a vehicle subfolder is created, and each uploaded document opens only for an authorised user.
7. Every time the Apps Script code changes, create a new deployment version (or edit the deployment to use the new version) and retest.

## Troubleshooting backend saves

- If the page reports that the backend could not be reached, confirm that the configured URL is the deployed `/exec` URL, not the editor or `/dev` URL.
- Open the deployment URL in a private browser window. A Google sign-in or permission page means the static site cannot access the web app with its current deployment permissions. Update **Who has access**, then deploy a new version.
- In Apps Script, check **Executions** immediately after a failed save. No execution usually indicates a deployment URL, permission, browser-policy or network problem; a failed execution provides the server-side exception to fix.
- The endpoint must always return JSON in the shape `{ "ok": true, "recordId": "..." }` on success or `{ "ok": false, "error": "..." }` on failure. HTML login/error pages are not valid API responses.
- A backend failure no longer clears the form or locks the later sections. Field values are retained in that browser so they can be retried, but they have **not** reached the Sheet/Drive until the page displays a successful backend-save message. Selected file contents cannot be retained by browser storage and must be selected again when retrying document uploads.

## Production checklist

- Put the page and endpoint behind organisation authentication. An unguessable Apps Script URL is not authentication.
- Validate registration numbers, identities, MIME types and file sizes again on the server; add rate limiting and an audit log for a production backend.
- Use least-privilege folder sharing, two-step verification, retention/deletion rules and periodic access reviews.
- Vehicle and driver documents contain personal and operational data. Collect only what is needed, record consent where required, and have counsel review applicable privacy obligations.
- Empty-endpoint mode saves field values and document **names** to browser `localStorage` for demonstration only. It does not save file contents and is not appropriate for shared or sensitive production records.
