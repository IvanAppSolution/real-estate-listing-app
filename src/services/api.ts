// src/services/api.ts (or wherever you have your axios config)
import axios from 'axios'
import { getApiBaseUrl } from '@/config/api'

const apiClient = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor to add auth token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Function to update base URL dynamically (call after server change)
export function updateApiBaseUrl() {
  apiClient.defaults.baseURL = getApiBaseUrl()
}

export default apiClient