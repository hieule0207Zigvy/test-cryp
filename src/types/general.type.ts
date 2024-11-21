export type DefaultEntity = {
  id: string
}

export type DefaultParams = {
  page?: number
  take?: number
}

export type MockingInformation = {
  total: number
  profitByToday: number
  profitByWeek: number
  profitBytMonth: number
}

export type MockingValue = {
  value: number
  time: number
}
export type MockingDataFromForm = {
  totalSubstance: number
  profitToday: number
  profitByWeek: number
  profitByMonth: number
  totalProfitChart: number
  totalProfitChartData: MockingValue[]
  profitByDateChart: number
  profitByDateChartData: MockingValue[]
  profitTrendChart: number
  profitTrendChartData: MockingValue[]
}
