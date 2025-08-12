import { ref, computed } from 'vue'
import axios from 'axios'
import router from '@/router'

interface User {
  id: string
  email: string
  username?: string
  [key: string]: unknown
}

interface AuthResponse {
  success: boolean
  message: string
  token?: string
  user?: User
}

const token = ref<string | null>(localStorage.getItem('token'))
const user = ref<User | null>(null)

export const useAuth = () => {
  const isAuthenticated = computed(() => !!token.value)

  const setupAxiosInterceptors = () => {    
    axios.interceptors.request.use(
      (config) => {
        if (token.value) {
          config.headers.Authorization = `Bearer ${token.value}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          logout()
        }
        return Promise.reject(error)
      }
    )
  }

  const login = async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await axios.post('/api/user/login', {
        email,
        password
      })

      if (response.data.success) {
        token.value = response.data.token
        localStorage.setItem('token', response.data.token)
        
        if (response.data.user) {
          user.value = response.data.user
          localStorage.setItem('user', JSON.stringify(response.data.user))
        }

        return { success: true, message: response.data.message }
      } else {
        return { success: false, message: response.data.message || 'Login failed' }
      }
    } catch (error: unknown) {
      let errorMessage = 'An error occurred during login'
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } }
        errorMessage = axiosError.response?.data?.message || errorMessage
      }
      return { success: false, message: errorMessage }
    }
  }

  const register = async (email: string, password: string, username?: string): Promise<AuthResponse> => {
    try {
      const response = await axios.post('/api/user/register', {
        email,
        password,
        username: username || email.split('@')[0]
      })

      if (response.data.success) {
        return { success: true, message: response.data.message }
      } else {
        return { success: false, message: response.data.message || 'Registration failed' }
      }
    } catch (error: unknown) {
      let errorMessage = 'An error occurred during registration'
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } }
        errorMessage = axiosError.response?.data?.message || errorMessage
      }
      return { success: false, message: errorMessage }
    }
  }

  const logout = () => {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/login')
  }

  const initializeAuth = () => {
    console.log('Initializing auth state...')
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')
    
    if (storedToken) {
      token.value = storedToken
    }
    
    if (storedUser) {
      try {
        user.value = JSON.parse(storedUser)
      } catch (error) {
        console.error('Error parsing stored user data:', error)
        localStorage.removeItem('user')
      }
    }

    setupAxiosInterceptors()
  }


  const getCurrentUser = async () => {
    if (!token.value) return null
    
    try {
      const response = await axios.get('/api/user/profile')
      if (response.data.success) {
        user.value = response.data.user
        localStorage.setItem('user', JSON.stringify(response.data.user))
        return response.data.user
      }
    } catch (error) {
      console.error('Error fetching user profile:', error)
      logout()
    }
    return null
  }

  return {
    token: computed(() => token.value),
    user: computed(() => user.value),
    isAuthenticated,
    login,
    register,
    logout,
    initializeAuth,
    getCurrentUser,
    setupAxiosInterceptors
  }
}
