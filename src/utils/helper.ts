export const setCookie = (name: string, value: string) => {
  document.cookie = `${name}=${encodeURIComponent(value)};path=/;`
}

export const getCookie = (name: string) => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return decodeURIComponent(parts.pop()?.split(';').shift() || '')
  return null
}

export const deleteCookie = (name: string) => {
  document.cookie = `${name}=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT`
}
