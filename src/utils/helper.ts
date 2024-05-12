const exceptText = (text: string, length: number) => {
  return text?.length > length ? text.substring(0, length) + '...' : text
}
const arrayOdd = (arr: any[]) => {
  return arr.filter((_, i) => i % 2 === 0)
}
const arrayEven = (arr: any[]) => {
  return arr.filter((_, i) => i % 2 !== 0)
}

const numberComma = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
export { exceptText, arrayEven, arrayOdd, numberComma }
