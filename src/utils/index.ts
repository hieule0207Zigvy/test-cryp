export const formatCurrency = (number: number) => {
  return number.toLocaleString('en-US', {
    style: 'currency',
    currency: 'VND'
  })
}
