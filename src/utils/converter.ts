export const convertToQuery = (key: string, value: string | string[] | number | number[] | boolean) => {
  if (Array.isArray(value)) {
    return value.map((v) => `${key}=${v}`).join('&')
  }
  return `${key}=${value}`
}

export const preProcessingTextForMarkdown = (text: string) => {
  return text
    .replace(/(\t| {4})/g, '&nbsp;&nbsp;&nbsp;&nbsp;') // Handle tabs
    .replace(/```/g, '``` ') // Handle code blocks
    .replace(/(\r\n|\n|\r)/gm, '  \n') // Handle line breaks
}

export const formatDate = (date: string) => {
  const dateObj = new Date(date)
  const gmtPlus7Date = new Date(dateObj.getTime() + 7 * 60 * 60 * 1000)
  return gmtPlus7Date
    .toLocaleString('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'UTC'
    })
    .replace(',', '')
}

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price)
}
