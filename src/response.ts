import { RESPONSE } from '@/constants/sheet'

// シート取得
const reports = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(RESPONSE)

// シートの最後の行番号と列番号を取得
const lastRow = reports.getLastRow()
const lastColumn = reports.getLastColumn()

// 最後の行(最新のフォーム入力データ)を配列として取得
export const values = reports
  .getRange(lastRow, 1, 1, lastColumn)
  .getValues()
  .flat()

export const school = values[1]
export const id = values[2]
export const studentName = values[3]
export const attendanceDays = values[4]
