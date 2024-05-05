export const convertDaysToBooleans = (inputDaysString: string) => {
  // カンマと空白で文字列を分割して配列に変換
  const inputDays = inputDaysString.split(',').map((item) => {
    return item.trim() // 不要な空白を削除
  })

  // 曜日をキーとして、曜日のインデックスを保持するマップを定義
  const dayMap = {
    月曜日: 0,
    火曜日: 1,
    水曜日: 2,
    木曜日: 3,
    金曜日: 4,
    土曜日: 5,
    日曜日: 6,
  }

  // 曜日の存在を記録するための配列を初期化（全てfalseとする）
  let result = [false, false, false, false, false, false, false]
  console.log(inputDays)
  // 入力された曜日の配列をループし、対応する曜日インデックスの位置をtrueに設定
  inputDays.forEach((day) => {
    if (day in dayMap) {
      // マップに曜日が存在する場合のみ
      result[dayMap[day]] = true
    }
  })
  console.log(result)

  return result
}
