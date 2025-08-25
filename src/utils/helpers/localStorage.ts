export const getAuthTokenFromLocalStorage = () => {
  const token = localStorage.getItem('token')
  if (!token) return null
  return JSON.parse(token)
}

export const setAuthTokenToLocalStorage = (token: string) => {
  localStorage.setItem('token', JSON.stringify(token))
}

