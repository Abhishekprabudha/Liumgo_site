# Connect HRMS payroll entry to Google Drive

The site is static, so **never put a Drive API key, OAuth secret or service-account JSON in browser code**. Use Google Apps Script as a server-side bridge: structured data goes to a Google Sheet and uploaded documents go to a restricted Drive folder.

## 1. Create restricted storage

1. In the organisation's Google Workspace Drive, create **Lium Go HRMS Records**. Copy the folder ID from the URL after `/folders/`.
2. Share it only with named HR/payroll administrators; disable link sharing. Apply retention, audit and deletion policies appropriate to employee records.
3. Create **Lium Go HRMS Register**, rename its first tab `HRMS`, and add this header row:

   `Record ID | Updated at | Section | Employee ID | Full name | Mobile | Email | Hub | Role | Vehicle | Employment status | Appointment date | Contract type | Payment type | Monthly salary | Hourly rate | KM rate | Payroll month | Approved hours | Approved KM | Incentives | Reimbursements | Deductions | Base pay | KM payment | Gross pay | Net pay | Approval status | Payment reference | Document folder URL`

4. Copy the spreadsheet ID between `/d/` and `/edit` in its URL. Treat the Sheet and Drive folder as sensitive HR systems, not public files.

## 2. Create the Apps Script bridge

Open [script.google.com](https://script.google.com), create a project, replace the two IDs below, and paste this into `Code.gs`:

```javascript
const HRMS_FOLDER_ID = "REPLACE_WITH_DRIVE_FOLDER_ID";
const HRMS_SHEET_ID = "REPLACE_WITH_SPREADSHEET_ID";

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    if (payload.action === "bulkEmployees") return importHrmsBatch(payload);
    const f = payload.fields || {};
    const recordId = safe(payload.recordId || `HR-${Date.now()}`);
    const section = safe(payload.section || "unknown");
    const parent = DriveApp.getFolderById(HRMS_FOLDER_ID);
    const folders = parent.getFoldersByName(recordId);
    const employeeFolder = folders.hasNext() ? folders.next() : parent.createFolder(recordId);
    const sectionFolders = employeeFolder.getFoldersByName(section);
    const documentFolder = sectionFolders.hasNext() ? sectionFolders.next() : employeeFolder.createFolder(section);

    (payload.documents || []).forEach(document => {
      const allowed = ["application/pdf", "image/jpeg", "image/png"];
      if (!allowed.includes(document.type)) throw new Error("Unsupported document type");
      const bytes = Utilities.base64Decode(document.data);
      if (bytes.length > 10 * 1024 * 1024) throw new Error("Document exceeds 10 MB");
      documentFolder.createFile(Utilities.newBlob(bytes, document.type, safe(document.name)));
    });

    SpreadsheetApp.openById(HRMS_SHEET_ID).getSheetByName("HRMS").appendRow([
      recordId, new Date(), section, f.employeeId || "", f.fullName || "", f.mobile || "",
      f.email || "", f.hub || "", f.role || "", f.vehicleRegistration || "",
      f.employmentStatus || "", f.appointmentDate || "", f.contractType || "",
      f.paymentType || "", f.monthlySalary || "", f.hourlyRate || "", f.kmRate || "",
      f.payrollMonth || "", f.approvedHours || "", f.approvedKm || "", f.incentives || "",
      f.reimbursements || "", f.deductions || "", f.basePay || "", f.kmPayment || "",
      f.grossPay || "", f.netPay || "", f.approvalStatus || "", f.paymentReference || "",
      documentFolder.getUrl()
    ]);
    return json({ ok: true, recordId });
  } catch (error) {
    return json({ ok: false, error: error.message });
  }
}

function importHrmsBatch(payload) {
  const employees = payload.employees || [];
  const documents = payload.documents || [];
  if (!employees.length) throw new Error("No employee records supplied");
  const ids = new Set(employees.map(employee => safe(employee.recordId)));
  if (ids.size !== employees.length) throw new Error("Record IDs must be unique");
  const parent = DriveApp.getFolderById(HRMS_FOLDER_ID);
  const sheet = SpreadsheetApp.openById(HRMS_SHEET_ID).getSheetByName("HRMS");
  employees.forEach(employee => {
    if (!employee.recordId || !employee.employeeId || !employee.fullName || !employee.mobile) throw new Error("Each row requires recordId, employeeId, fullName and mobile");
    const recordId = safe(employee.recordId);
    const folders = parent.getFoldersByName(recordId);
    const folder = folders.hasNext() ? folders.next() : parent.createFolder(recordId);
    sheet.appendRow(hrmsRow(recordId, employee, folder.getUrl(), "bulk"));
  });
  documents.forEach(document => {
    const recordId = safe(document.recordId);
    if (!ids.has(recordId)) throw new Error("A document does not match an employee record");
    const allowed = ["application/pdf", "image/jpeg", "image/png"];
    if (!allowed.includes(document.type)) throw new Error("Unsupported document type");
    const bytes = Utilities.base64Decode(document.data);
    if (bytes.length > 10 * 1024 * 1024) throw new Error("Document exceeds 10 MB");
    const folders = parent.getFoldersByName(recordId);
    const employeeFolder = folders.hasNext() ? folders.next() : parent.createFolder(recordId);
    const documentFolders = employeeFolder.getFoldersByName("documents");
    const documentFolder = documentFolders.hasNext() ? documentFolders.next() : employeeFolder.createFolder("documents");
    documentFolder.createFile(Utilities.newBlob(bytes, document.type, safe(document.name)));
  });
  return json({ ok: true, imported: employees.length, documentCount: documents.length });
}

function hrmsRow(recordId, f, folderUrl, section) {
  return [recordId, new Date(), section, f.employeeId || "", f.fullName || "", f.mobile || "", f.email || "", f.hub || "", f.role || "", f.vehicleRegistration || "", f.employmentStatus || "", f.appointmentDate || "", f.contractType || "", f.paymentType || "", f.monthlySalary || "", f.hourlyRate || "", f.kmRate || "", f.payrollMonth || "", f.approvedHours || "", f.approvedKm || "", f.incentives || "", f.reimbursements || "", f.deductions || "", "", "", "", "", f.approvalStatus || "", f.paymentReference || "", folderUrl];
}

function doGet(e) {
  try {
    const action = String((e.parameter || {}).action || "employees");
    const sheet = SpreadsheetApp.openById(HRMS_SHEET_ID).getSheetByName("HRMS");
    const values = sheet.getDataRange().getDisplayValues();
    const headers = values.shift() || [];
    const rows = values.map(row => Object.fromEntries(headers.map((header, index) => [camel(header), row[index]])));

    if (action === "documents") {
      const documents = rows.filter(row => row.documentFolderUrl).map(row => ({
        recordId: row.recordId,
        fullName: row.fullName,
        files: row.section === "documents" ? ["HRMS documents"] : [],
        folderUrl: row.documentFolderUrl
      }));
      return json({ ok: true, documents });
    }
    if (action !== "employees") throw new Error("Unsupported action");
    return json({ ok: true, employees: rows });
  } catch (error) {
    return json({ ok: false, error: error.message });
  }
}

function camel(value) {
  return String(value).trim().replace(/[^a-zA-Z0-9]+(.)/g, (_, letter) => letter.toUpperCase()).replace(/^./, first => first.toLowerCase());
}

function safe(value) {
  return String(value || "record").replace(/[\\/:*?"<>|]/g, "-").slice(0, 100);
}
function json(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}
```

## 3. Deploy and connect

1. In Apps Script, set the project time zone, then choose **Deploy → New deployment → Web app**.
2. Set **Execute as** to the Workspace owner. Prefer **Who has access: users in your Workspace domain**. A public `Anyone` deployment is unsuitable for production HR data.
3. Authorise Drive and Sheets, deploy, and copy the URL ending in `/exec`.
4. Paste that URL into `HRMS_API_ENDPOINT` at the top of `hrms-entry.js`. Do not paste any credentials.
5. Submit one employee section and one small test PDF. Verify the Sheet rows, employee/section folders and permissions. Then delete the test personal data.

## Production checklist

- Put the dashboard behind organisation authentication. Apps Script deployment access alone is not a complete application-authorisation model.
- Validate the signed-in user and role server-side; add CSRF/replay protection, rate limits and audit logs before handling real payroll.
- Recalculate payroll on the trusted backend. Never treat browser totals as authoritative.
- Validate file signatures, scan malware, restrict MIME types and sizes, and prevent formula injection in Sheet cells.
- Replace `localStorage` fallback before launch. It is included only for this prototype and is not suitable for employee, appointment or payroll data.
- Obtain HR/legal review for contracts, tax, PF/ESI, wage rules, privacy notices, consent, retention and employee access/correction processes applicable to the workforce.
- Use separate test and production folders, least-privilege administrators, two-step verification, regular access reviews and backups.
