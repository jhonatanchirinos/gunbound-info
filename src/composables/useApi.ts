import { ref } from 'vue'

const BASE_URL = 'http://127.0.0.1:3000/api'

export function useApi() {
  const loading = ref(false)
  const error = ref<string | null>(null)

  const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
    try {
      loading.value = true
      error.value = null

      const response = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || `Error: ${response.status}`)
      }

      return await response.json()
    } catch (err) {
      error.value = err instanceof Error ? err.message : String(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const login = (credentials: { email: string; password: string }) =>
    apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })

  const fetchEmotes = () => apiRequest('/emotes')

  // 🔹 NUEVAS FUNCIONES PARA USUARIOS (CRUD)
  const fetchUsers = () => apiRequest('/usuarios')
  const createUser = (user: Record<string, unknown>) =>
    apiRequest('/usuarios', {
      method: 'POST',
      body: JSON.stringify(user),
    })
  const updateUser = (id: string | number, user: Record<string, unknown>) =>
    apiRequest(`/usuarios/${id}`, {
      method: 'PUT',
      body: JSON.stringify(user),
    })
  const deleteUser = (id: string | number) =>
    apiRequest(`/usuarios/${id}`, {
      method: 'DELETE',
    })

  return {
    loading,
    error,
    login,
    fetchEmotes,
    apiRequest,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
  }
}
