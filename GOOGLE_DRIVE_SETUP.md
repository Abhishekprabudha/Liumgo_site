# Connect driver entry to Google Drive

This static site cannot safely write directly to Drive with a service-account key. Use a Google Apps Script web app as the server-side boundary. It stores structured fields in a Google Sheet and documents in a restricted Drive folder.

## 1. Create the storage

1. Sign in to the Google Workspace account that will own the records.
2. In Drive, create a folder named **Lium Go Driver Records**. Share it only with authorised operations administrators. Copy the folder ID from the URL after `folders/`.
3. Create a Google Sheet named **Lium Go Driver Register**. Rename the first tab to `Drivers`. Copy the spreadsheet ID from the URL between `/d/` and `/edit`.
4. Add this header row to `Drivers`:

   `Record ID | Saved at | Full name | Mobile | Email | DOB | Emergency contact | Hub | Address | Aadhaar | Licence | Licence expiry | Police verification | Attendance date | Attendance status | Shift | Check-in | Vehicle registration | Vehicle category | Client | Mapping start | Remarks | Document folder URL`

Apply the organisation's retention policy, enable two-step verification, and avoid giving drivers access to the parent folder or register.

## 2. Add the Apps Script endpoint

Open [Google Apps Script](https://script.google.com), create a project, and paste the following into `Code.gs`. Replace both IDs. The script creates one subfolder per submission and appends a row to the Sheet.

```javascript
const DRIVE_FOLDER_ID = "REPLACE_WITH_FOLDER_ID";
const SPREADSHEET_ID = "REPLACE_WITH_SPREADSHEET_ID";

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const f = payload.fields || {};
    const recordId = `DRV-${Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyyMMdd-HHmmss")}`;
    const parent = DriveApp.getFolderById(DRIVE_FOLDER_ID);
    const folder = parent.createFolder(`${recordId} - ${safeName(f.fullName)}`);

    (payload.documents || []).forEach(doc => {
      const bytes = Utilities.base64Decode(doc.data);
      folder.createFile(Utilities.newBlob(bytes, doc.type || "application/octet-stream", safeName(doc.name)));
    });

    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName("Drivers");
    sheet.appendRow([recordId, new Date(), f.fullName, f.mobile, f.email, f.dateOfBirth,
      f.emergencyContact, f.hub, f.address, f.aadhaarNumber, f.licenceNumber,
      f.licenceExpiry, f.policeVerification, f.attendanceDate, f.attendanceStatus,
      f.shift, f.checkIn, f.vehicleRegistration, f.vehicleCategory, f.client,
      f.mappingStart, f.remarks, folder.getUrl()]);
    return output({ ok: true, recordId });
  } catch (error) {
    return output({ ok: false, error: error.message });
  }
}

function safeName(value) {
  return String(value || "document").replace(/[\\/:*?\"<>|]/g, "-").slice(0, 100);
}

function output(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}
```

## 3. Deploy and connect

1. In Apps Script, choose **Project Settings**, set the time zone, then **Deploy → New deployment → Web app**.
2. Set **Execute as** to yourself. For **Who has access**, prefer your Workspace domain. If the static page is not authenticated with that Workspace account, Apps Script may require “Anyone”; only use that for a short pilot and add proper authentication before production.
3. Authorise Drive and Sheets access, deploy, and copy the URL ending in `/exec` (not the `/dev` test URL).
4. In `driver-entry.js`, set `DRIVER_API_ENDPOINT` to that URL.
5. Submit a test driver, verify a new Sheet row and Drive subfolder, and test with an account that has the same access as real users.

## Production security checklist

- Do not commit OAuth client secrets, API keys, or service-account JSON to this repository.
- Put the portal behind Workspace authentication or a real application backend; an Apps Script URL alone is not access control.
- Validate identity and file type server-side, add request authentication and rate limiting, and log administrative access.
- Aadhaar and licence data are sensitive. Collect only what is necessary, mask values in operational views, encrypt/back up appropriately, document consent and deletion procedures, and have counsel review applicable Indian privacy requirements.
- Replace browser `localStorage` prototype mode before collecting real driver data. Local storage is not suitable for sensitive documents or multi-user operations.
