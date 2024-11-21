type mockData = {
  value: number
  time: string
}
export const formatCurrency = (number: number) => {
  return number.toLocaleString('en-US', {
    style: 'currency',
    currency: 'VND'
  })
}

export const toJsonMockData = (data: string) => {
  return JSON.parse(data.trim().replace(/\s/g, '').replace(/'/g, '"'))
}

export const formatDateMockData = (data: mockData[]) => {
  return data.map((item) => ({ ...item, time: new Date(item.time).getTime() }))
}
