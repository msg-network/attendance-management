import { id, attendanceDays, studentName } from '@/response'
import { schoolName, sheetUrl } from '@/school'
import { convertDaysToBooleans } from '@/convertDayToBoolean'
import { findLastRow } from '@/findLastRow'

const setAttendanceDays = () => {
  console.log(id, attendanceDays, sheetUrl)
  const sheet = SpreadsheetApp.openByUrl(sheetUrl)
  const list = sheet.getSheetByName(schoolName)

  // シートの最後の行番号と列番号を取得

  const lastRow = findLastRow(list)
  console.log(lastRow)

  // 校舎名を配列として取得
  const ids = list.getRange(3, 1, lastRow).getValues().flat()

  // 該当する生徒の所在行を特定
  const row = ids.indexOf(id)

  // 校舎名とエリアのスプレッドシートIDを取得
  if (row > 0) {
    list
      .getRange(row + 3, 12, 1, 7)
      .setValues([convertDaysToBooleans(attendanceDays)])
  } else {
    list.getRange(lastRow + 3, 1).setValue(id)
    list.getRange(lastRow + 3, 4).setValue(studentName)
    list
      .getRange(lastRow + 3, 12, 1, 7)
      .setValues([convertDaysToBooleans(attendanceDays)])
  }
}
// トリガーとなるフォームが保護者向けのものだった場合のみ、メール配信
function app() {
  setAttendanceDays()
}

// GASが認識できるように関数を定義
declare let global: any
global.app = app
