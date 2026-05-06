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

  const fetchEmotes = () => apiRequest('/emotes')

  return {
    loading,
    error,
    fetchEmotes,
    apiRequest,
  }
}
