/**
 * Ab.ai — registration form → Google Sheets
 *
 * Setup (once):
 *  1. Create a Google Sheet. Rename the first tab to "Заявки".
 *  2. Extensions → Apps Script. Replace the editor contents with this file.
 *  3. Deploy → New deployment → type "Web app".
 *       Execute as: Me
 *       Who has access: Anyone
 *  4. Copy the web-app URL (ends with /exec) into FORM_ENDPOINT in script.js.
 *
 * After editing this file, you must create a NEW deployment (or "Manage
 * deployments → Edit → New version"), otherwise the old code keeps running.
 */

var SHEET_NAME = 'Заявки';
var HEADERS = ['Дата', 'Имя Фамилия', 'Почта', 'Место обучения/работы',
               'Желаемый язык программирования', 'Роль', 'Страница'];
var FIELDS  = ['name', 'email', 'place', 'language', 'role', 'page'];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    var p = (e && e.parameter) || {};
    var row = [new Date()].concat(FIELDS.map(function (k) { return (p[k] || '').toString().trim(); }));
    sheet.appendRow(row);

    return json({ result: 'success' });
  } catch (err) {
    return json({ result: 'error', error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return json({ result: 'ok', message: 'Ab.ai form endpoint is live' });
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
