<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { 
  getAvailableServers, 
  getCurrentServer, 
  setApiServer, 
  type ServerType 
} from '@/config/api'
import axios, { updateApiBaseUrl } from '@/axios' // ← Use your existing axios!
import { useAuth } from '@/composables/useAuth'


const { login, token } = useAuth();
const router = useRouter()
const toast = useToast()

// Environment info
const isDev = import.meta.env.DEV

// Form data
const email = ref('')
const password = ref('')
const selectedServer = ref<ServerType>(getCurrentServer())
const availableServers = getAvailableServers()

// UI state
const loading = ref(false)
const error = ref('')

// Computed property for current server info
const currentServerInfo = computed(() => {
  return availableServers.find(s => s.value === selectedServer.value)
})

// Update server when selection changes
function handleServerChange() {
  setApiServer(selectedServer.value)
  updateApiBaseUrl() // Update axios base URL
}

// Login function - use your existing axios
async function handleLogin() {
  error.value = ''
  loading.value = true

  try {
    // Ensure we're using the selected server
    setApiServer(selectedServer.value)
    updateApiBaseUrl()

    // Use your existing axios instance
    const response = await login(email.value,password.value)
 
    if (response.success) {
 
      toast.add({
        severity: 'success',
        summary: 'Login Successful',
        detail: 'Redirecting to dashboard...',
        life: 2000
      })

      router.push('/dashboard')
      
    } else {
      error.value = response.data.message || 'Login failed'
      toast.add({
        severity: 'error',
        summary: 'Login Failed',
        detail: error.value,
        life: 5000
      })
    }
  } catch (err: any) {
    console.error('Login error:', err)
    
    const errorMessage = err.response?.data?.message || err.message || 'Connection refused. Is the server running?'
    error.value = errorMessage
    
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: errorMessage,
      life: 5000
    })
  } finally {
    loading.value = false
  }
}

// Load saved server on mount
onMounted(() => {
  selectedServer.value = getCurrentServer()
  updateApiBaseUrl() // Ensure axios uses correct URL
})
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <!-- Environment Badge -->
      <div v-if="isDev" class="env-badge dev">
        DEV MODE
      </div>

      <h2>Login</h2>

      <!-- Server Selection Dropdown -->
      <div v-if="availableServers.length > 1" class="form-group">
        <label for="server">API Server</label>
        <select
          id="server"
          v-model="selectedServer"
          @change="handleServerChange"
          class="form-control"
        >
          <option
            v-for="server in availableServers"
            :key="server.value"
            :value="server.value"
          >
            {{ server.label }}
          </option>
        </select>
        <small class="server-info">
          {{ currentServerInfo?.description }}
        </small>
      </div>

      <!-- Login Form -->
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            placeholder="Enter your email"
            class="form-control"
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            placeholder="Enter your password"
            class="form-control"
          />
        </div>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="btn-login"
        >
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
      </form>

      <!-- Debug Info -->
      <div v-if="isDev" class="debug-info">
        <small>API: {{ currentServerInfo?.url }}</small>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  /* background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); */
}

.login-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.login-card h2 {
  margin-bottom: 1.5rem;
  text-align: center;
  color: #333;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #555;
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-control:focus {
  outline: none;
  border-color: #667eea;
}

.server-info {
  display: block;
  margin-top: 0.25rem;
  color: #666;
  font-size: 0.875rem;
}

.error-message {
  background: #fee;
  color: #c33;
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  font-size: 0.875rem;
}

.btn-login {
  width: 100%;
  padding: 0.875rem;
  background: linear-gradient(135deg, #55bd7d 0%, #32a06d 100%);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
}

.btn-login:hover:not(:disabled) {
  transform: translateY(-2px);
}

.btn-login:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.debug-info {
  margin-top: 1rem;
  padding: 0.5rem;
  background: #f5f5f5;
  border-radius: 4px;
  text-align: center;
}

.debug-info small {
  color: #666;
  font-family: monospace;
  font-size: 0.75rem;
}
</style>