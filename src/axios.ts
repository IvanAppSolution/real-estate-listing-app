import axios from 'axios'
import { getApiBaseUrl } from './config/api'

// Create axios instance with dynamic base URL
const instance = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor - add auth token
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor - handle errors
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Function to update base URL when server changes
export function updateApiBaseUrl() {
  instance.defaults.baseURL = getApiBaseUrl()
  console.log(`📡 API Base URL updated to: ${instance.defaults.baseURL}`)
}

export default instance