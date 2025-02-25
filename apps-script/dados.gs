const sheetName = 'Lista'
const scriptProp = PropertiesService.getScriptProperties()

function initialSetup() {
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  PropertiesService.getScriptProperties().setProperty('key', activeSpreadsheet.getId());
}

function doPost(e) {
  try {
    const scriptProp = PropertiesService.getScriptProperties();
    const spreadsheetId = scriptProp.getProperty('key');

    if (!spreadsheetId) {
      throw new Error("Spreadsheet ID não encontrado. Execute initialSetup() primeiro.");
    }

    const doc = SpreadsheetApp.openById(spreadsheetId);
    const sheet = doc.getSheetByName('Lista');

    if (!sheet) {
      throw new Error("Sheet 'Lista' não achada.");
    }

    const headers = sheet.getRange(2, 1, 1, sheet.getLastColumn()).getValues()[0];
    const nextRow = Math.max(sheet.getLastRow() + 1, 3);

    const newRow = headers.map(header => e.parameter[header] || '');

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

    return ContentService.createTextOutput(JSON.stringify({ result: 'success', row: nextRow }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    Logger.log("Erro: " + error.toString());
    return ContentService.createTextOutput(JSON.stringify({ result: 'error', error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}