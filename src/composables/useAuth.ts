import { ref, computed } from 'vue'
import api from '@/axios' // Use your custom api instance
import router from '@/router'
import type { User, AuthResponse } from '@/types'

const token = ref<string | null>(localStorage.getItem('token'))
const user = ref<User | null>(getUserInStorage())

function getUserInStorage():User | null{
  const userString = localStorage.getItem('user');
  if (!userString) return null;
  try {
    return JSON.parse(userString);
  } catch (error) {
    console.error('Error parsing stored user data:', error);
    return null;
  }
}

export const useAuth = () => {
  const isAuthenticated = computed(() => !!token.value)

  const login = async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await api.post('/api/auth/login', { // No /api prefix needed
        email,
        password
      })

      if (response.status) {
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
      const response = await api.post('/api/user/register', { // No /api prefix needed
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
  }

  const getCurrentUser = async () => {
    if (!token.value) return null
    
    try {
      const response = await api.get('/api/user/profile') // No /api prefix needed
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
    getCurrentUser
  }
}
