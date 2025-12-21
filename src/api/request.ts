import axios, { type AxiosInstance } from 'axios'

const request: AxiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  timeout: 10000,
  headers: {
    Accept: 'application/json',
  },
})

// 👉 GẮN TOKEN
request.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 👉 BẮT 401
request.interceptors.response.use(
    (res) => res,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.clear()
        window.location.href = '/login'
      }
      return Promise.reject(error)
    }
)

export default request
