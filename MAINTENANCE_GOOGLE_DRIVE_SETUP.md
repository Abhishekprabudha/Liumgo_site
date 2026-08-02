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

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const f = payload.fields || {};
    const recordId = String(payload.recordId || `VEH-${Date.now()}`).slice(0, 50);
    const parent = DriveApp.getFolderById(DRIVE_FOLDER_ID);
    const folder = parent.createFolder(`${safeName(recordId)} - ${safeName(f.registrationNumber)}`);

    (payload.documents || []).forEach(doc => {
      if (!doc.data || !doc.name) return;
      const allowed = ["application/pdf", "image/jpeg", "image/png"];
      if (!allowed.includes(doc.type)) throw new Error(`Unsupported file type: ${doc.type}`);
      const bytes = Utilities.base64Decode(doc.data);
      if (bytes.length > 10 * 1024 * 1024) throw new Error(`${doc.name} exceeds 10 MB`);
      folder.createFile(Utilities.newBlob(bytes, doc.type, safeName(doc.name)));
    });

    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName("Vehicles");
    sheet.appendRow([recordId, new Date(), f.registrationNumber, f.assetId, f.category,
      f.powertrain, f.make, f.model, f.modelYear, f.odometerKm, f.homeHub,
      f.operationalStatus, f.serviceType, f.priority, f.lastServiceDate,
      f.nextServiceDate, f.workshop, f.estimatedCost, f.maintenanceNotes,
      f.insuranceExpiry, f.fitnessExpiry, f.permitExpiry, f.pucExpiry,
      f.driverName, f.driverId, f.driverMobile, f.mappingStart, f.mappingEnd,
      f.shift, f.mappingNotes, folder.getUrl()]);
    return json({ ok: true, recordId: recordId, folderUrl: folder.getUrl() });
  } catch (error) {
    return json({ ok: false, error: error.message });
  }
}

function safeName(value) {
  return String(value || "record").replace(/[\\/:*?\"<>|]/g, "-").slice(0, 100);
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

## Production checklist

- Put the page and endpoint behind organisation authentication. An unguessable Apps Script URL is not authentication.
- Validate registration numbers, identities, MIME types and file sizes again on the server; add rate limiting and an audit log for a production backend.
- Use least-privilege folder sharing, two-step verification, retention/deletion rules and periodic access reviews.
- Vehicle and driver documents contain personal and operational data. Collect only what is needed, record consent where required, and have counsel review applicable privacy obligations.
- Empty-endpoint mode saves field values and document **names** to browser `localStorage` for demonstration only. It does not save file contents and is not appropriate for shared or sensitive production records.
