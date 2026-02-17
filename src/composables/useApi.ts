import { ref } from 'vue'

const BASE_URL = 'http://127.0.0.1:3000/api'

export function useApi() {
  const loading = ref(false)
  const error = ref(null)

  const apiRequest = async (endpoint, options = {}) => {
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
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const login = (credentials) =>
    apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })

  const fetchEmotes = () => apiRequest('/emotes')

  // 🔹 NUEVAS FUNCIONES PARA USUARIOS (CRUD)
  const fetchUsers = () => apiRequest('/usuarios')
  const createUser = (user) =>
    apiRequest('/usuarios', {
      method: 'POST',
      body: JSON.stringify(user),
    })
  const updateUser = (id, user) =>
    apiRequest(`/usuarios/${id}`, {
      method: 'PUT',
      body: JSON.stringify(user),
    })
  const deleteUser = (id) =>
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
