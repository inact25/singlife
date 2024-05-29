// const exceptText = (text: string, length: number) => {
//   return text?.length > length ? text.substring(0, length) + '...' : text
// }

const exceptText = (
  text: string,
  length: number,
  maxParagraphs: number = 2,
) => {
  if (!text) return ''

  // Split text into paragraphs
  const paragraphs = text.split('\n\n')

  // Handle case with more paragraphs than allowed
  if (paragraphs.length > maxParagraphs) {
    return paragraphs.slice(0, maxParagraphs).join('\n\n') + '...'
  }

  // Handle case with text longer than allowed length
  if (text.length > length) {
    return text.substring(0, length) + '...'
  }

  return text
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
