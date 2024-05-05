export const findLastRow = (sheet: GoogleAppsScript.Spreadsheet.Sheet) => {
  // 検索対象の列を設定（例：2列目＝B列）
  const column = 4
  const lastRow = sheet.getLastRow()

  // 対象の列の値を取得
  const values = sheet.getRange(3, column, lastRow).getValues()

  // 列をループして最初の空白セルを探す
  for (var i = 0; i < values.length; i++) {
    if (values[i][0] === '' || values[i][0] == null) {
      // 空白が見つかった行番号を返す（行は1から始まるので +1）
      return i
    }
  }

  // 空白が見つからなければ0を返す（または適宜エラーメッセージを返す）
  return 0
}
