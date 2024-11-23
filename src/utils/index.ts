import dayjs from 'dayjs'

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
  return data.map((item) => {
    return { ...item, time: new Date(item.time).getTime() }
  })
}

const generateRandomNumberWithGap = (profit: number, gap: number) => {
  const min = profit * gap * -1
  const max = profit * gap
  return Math.random() * (max - min) + min
}

const generateArrayWithTotal = (length: number, profit: number, gap: number) => {
  if (length <= 0 || profit <= 0) return []

  let array = Array.from({ length }, () => generateRandomNumberWithGap(profit, gap)) // Generate random values
  const sum = array.reduce((acc, num) => acc + num, 0) // Calculate current sum

  // Normalize values to ensure the total equals the given total
  array = array.map((num) => Math.floor((num / sum) * profit))

  // Adjust for rounding errors
  const currentSum = array.reduce((acc, num) => acc + num, 0)
  let diff = profit - currentSum

  // Distribute the difference to make up the total
  for (let i = 0; diff > 0; i = (i + 1) % length) {
    array[i]++
    diff--
  }
  return array
}
export const generateChartData = (profit: number, chart: string) => {
  // const next30Day = dayjs().add(30, 'day')
  const gap = 100
  const length = chart === 'histogram' ? 30 : 900
  return generateArrayWithTotal(length, profit, gap).map((value, index) => ({
    value,
    time: new Date(
      dayjs()
        .add(1 + index, 'day')
        .format('YYYY-MM-DD')
    ).getTime(),
    color: value < 0 ? 'red' : undefined
  }))
}
