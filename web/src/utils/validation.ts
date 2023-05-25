export function validateImageURL(url: string): boolean {
  const imagePattern = /\.(jpeg|jpg|gif|png|bmp)$/i
  return imagePattern.test(url)
}

export function hasMoreThanThreeCharacters(str: string): boolean {
  return str.length > 3
}

export function validateFloatNumber(numberString: string): boolean {
  const floatPattern = /^\d+(\.\d{1,2})?$/
  return floatPattern.test(numberString.replace(',', '.'))
}
