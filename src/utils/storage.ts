// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isValidJSON = (value: any): boolean => {
  if (value === null) return false
  try {
    JSON.parse(value)
    return true
  } catch (e) {
    return false
  }
}

export const setStorage = (name: string, value: string | Record<string, unknown> | number) => {
  return localStorage.setItem(name, JSON.stringify(value))
}

export const getStorage = (name: string) => {
  const value = localStorage.getItem(name)
  return isValidJSON(value) ? JSON.parse(value as string) : value
}
