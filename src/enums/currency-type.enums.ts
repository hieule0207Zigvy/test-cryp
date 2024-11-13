export enum CurrencyType {
  USDT_M_Futures = 'USDT_M_Futures',
  Coin_M_Futures = 'Coin_M_Futures',
  USDC_M_Futures = 'USDC_M_Futures'
}

export const CurrencyTypeName = {
  [CurrencyType.USDT_M_Futures]: 'USDT-M Futures',
  [CurrencyType.Coin_M_Futures]: 'Coin-M Futures',
  [CurrencyType.USDC_M_Futures]: 'USDC-M Futures'
}

export enum ProfitContent {
  profitByToday = `* Lời&Lỗ hôm nay = tài sản hiện tại - tài sản khi chụp nhanh vào 00:00 (UTC+0) hôm nay - tiền chuyển ròng nội bộ hôm nay.
* Bảo trì dữ liệu diễn ra từ 00:00 đến 7:00 mỗi ngày. Dữ liệu sẽ không được cập nhật trong khoảng thời gian này.`,
  profitByWeek = `* Lời&Lỗ 7 ngày = tài sản hiện tại - tài sản khi chụp nhanh vào 00:00 (UTC+0) 7 ngày trước - tiền chuyển ròng nội bộ 7 ngày.
* Bảo trì dữ liệu diễn ra từ 00:00 đến 7:00 mỗi ngày. Dữ liệu sẽ không được cập nhật trong khoảng thời gian này.`,
  profitBytMonth = `* Lời&Lỗ 30 ngày = tài sản hiện tại - tài sản khi chụp nhanh vào 00:00 (UTC+0) 30 ngày trước - tiền chuyển ròng nội bộ 30 ngày.
* Bảo trì dữ liệu diễn ra từ 00:00 đến 7:00 mỗi ngày. Dữ liệu sẽ không được cập nhật trong khoảng thời gian này.`
}

export enum ProfitLabel {
  profitByToday = `Lời&Lỗ hôm nay`,
  profitByWeek = `Lời/Lỗ 7 ngày`,
  profitBytMonth = `Lời/Lỗ 30 ngày`
}
