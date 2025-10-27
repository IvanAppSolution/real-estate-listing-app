export const API_SERVERS = {
  express: {
    name: 'Express Server',
    url: 'https://real-estate-listing-server.netlify.app/.netlify/functions',
    description: 'Original Express backend'
  },
  nest: {
    name: 'NestJS Server',
    url: 'https://real-estate-listing-nest-server.netlify.app/.netlify/functions',
    description: 'New NestJS backend'
  },
  local: {
    name: 'Local Development',
    url: 'http://localhost:4000',
    description: 'Local dev server'
  },
} as const

export type ServerType = keyof typeof API_SERVERS

// Get current server from localStorage or default to local in dev
export function getCurrentServer(): ServerType {
  const stored = localStorage.getItem('api-server') as ServerType
  
  if (stored && API_SERVERS[stored]) {
    return stored
  }
  
  // Default to local in development, nest in production
  return import.meta.env.DEV ? 'local' : 'nest'
}

// Get the API base URL
export function getApiBaseUrl(): string {
  const server = getCurrentServer()
  return API_SERVERS[server].url
}

// Set the server and persist to localStorage
export function setApiServer(server: ServerType): void {
  if (!API_SERVERS[server]) {
    console.error(`Invalid server: ${server}`)
    return
  }
  localStorage.setItem('api-server', server)
}

// Get all available servers for dropdown
export function getAvailableServers() {
  const isDev = import.meta.env.DEV
  
  return Object.entries(API_SERVERS)
    .filter(([key]) => {
      // Only show local in development
      if (key === 'local') return isDev
      return true
    })
    .map(([key, value]) => ({
      value: key as ServerType,
      label: value.name,
      description: value.description,
      url: value.url,
    }))
}