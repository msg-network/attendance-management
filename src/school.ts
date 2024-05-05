import { SCHOOLS } from '@/constants/sheet'
import { school } from '@/response'

// シート取得
const schools = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SCHOOLS)

// シートの最後の行番号を取得
const lastRow = schools.getLastRow()

// 校舎名を配列として取得
const schoolNames = schools.getRange(1, 1, lastRow).getValues().flat()

// 該当する校舎の所在行を特定
const row = schoolNames.indexOf(school)

// 校舎名とエリアのスプレッドシートIDを取得
export const schoolName =
  row !== -1 ? schools.getRange(row + 1, 2).getValue() : null
export const sheetUrl =
  row !== -1 ? schools.getRange(row + 1, 4).getValue() : null
