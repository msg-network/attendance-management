let global = this;
function app() {
}
(() => {
  // src/constants/sheet.ts
  var RESPONSE = "response";
  var SCHOOLS = "schools";

  // src/response.ts
  var reports = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(RESPONSE);
  var lastRow = reports.getLastRow();
  var lastColumn = reports.getLastColumn();
  var values = reports.getRange(lastRow, 1, 1, lastColumn).getValues().flat();
  var school = values[1];
  var id = values[2];
  var studentName = values[3];
  var attendanceDays = values[4];

  // src/school.ts
  var schools = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SCHOOLS);
  var lastRow2 = schools.getLastRow();
  var schoolNames = schools.getRange(1, 1, lastRow2).getValues().flat();
  var row = schoolNames.indexOf(school);
  var schoolName = row !== -1 ? schools.getRange(row + 1, 2).getValue() : null;
  var sheetUrl = row !== -1 ? schools.getRange(row + 1, 4).getValue() : null;

  // src/convertDayToBoolean.ts
  var convertDaysToBooleans = (inputDaysString) => {
    const inputDays = inputDaysString.split(",").map((item) => {
      return item.trim();
    });
    const dayMap = {
      \u6708\u66DC\u65E5: 0,
      \u706B\u66DC\u65E5: 1,
      \u6C34\u66DC\u65E5: 2,
      \u6728\u66DC\u65E5: 3,
      \u91D1\u66DC\u65E5: 4,
      \u571F\u66DC\u65E5: 5,
      \u65E5\u66DC\u65E5: 6
    };
    let result = [false, false, false, false, false, false, false];
    console.log(inputDays);
    inputDays.forEach((day) => {
      if (day in dayMap) {
        result[dayMap[day]] = true;
      }
    });
    console.log(result);
    return result;
  };

  // src/findLastRow.ts
  var findLastRow = (sheet) => {
    const column = 4;
    const lastRow3 = sheet.getLastRow();
    const values2 = sheet.getRange(3, column, lastRow3).getValues();
    for (var i = 0; i < values2.length; i++) {
      if (values2[i][0] === "" || values2[i][0] == null) {
        return i;
      }
    }
    return 0;
  };

  // src/app.ts
  var setAttendanceDays = () => {
    console.log(id, attendanceDays, sheetUrl);
    const sheet = SpreadsheetApp.openByUrl(sheetUrl);
    const list = sheet.getSheetByName(schoolName);
    const lastRow3 = findLastRow(list);
    console.log(lastRow3);
    const ids = list.getRange(3, 1, lastRow3).getValues().flat();
    const row2 = ids.indexOf(id);
    if (row2 > 0) {
      list.getRange(row2 + 3, 12, 1, 7).setValues([convertDaysToBooleans(attendanceDays)]);
    } else {
      list.getRange(lastRow3 + 3, 1).setValue(id);
      list.getRange(lastRow3 + 3, 4).setValue(studentName);
      list.getRange(lastRow3 + 3, 12, 1, 7).setValues([convertDaysToBooleans(attendanceDays)]);
    }
  };
  function app() {
    setAttendanceDays();
  }
  global.app = app;
})();
