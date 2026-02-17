<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useApi } from '@/composables/useApi'

const { fetchUsers, createUser, updateUser, deleteUser, loading, error } = useApi()

const users = ref([])
const newUser = ref({ username: '', password: '', role: 'user' })
const editingUser = ref(null)
const showDeleteConfirm = ref(false)
const userToDelete = ref(null)
const selectedUserId = ref(null)
const showPassword = ref(false)

// Estados para los checkboxes
const selectedUsers = ref(new Set())
const selectAll = computed({
  get: () => users.value.length > 0 && selectedUsers.value.size === users.value.length,
  set: (value) => {
    if (value) {
      selectedUsers.value = new Set(users.value.map((user) => user._id))
    } else {
      selectedUsers.value = new Set()
    }
  },
})

const loadUsers = async () => {
  users.value = await fetchUsers()
}

const addUser = async () => {
  if (!newUser.value.username || !newUser.value.password) return
  await createUser(newUser.value)
  newUser.value = { username: '', password: '', role: 'user' }
  loadUsers()
}

const startEdit = (user) => {
  editingUser.value = { ...user }
}

const saveEdit = async () => {
  await updateUser(editingUser.value._id, editingUser.value)
  editingUser.value = null
  loadUsers()
}

const removeUser = async (user) => {
  userToDelete.value = user
  showDeleteConfirm.value = true
}

const confirmDelete = async () => {
  if (userToDelete.value) {
    await deleteUser(userToDelete.value._id)
    // Remover de seleccionados si estaba seleccionado
    selectedUsers.value.delete(userToDelete.value._id)
    loadUsers()
  }
  cancelDelete()
}

const cancelDelete = () => {
  showDeleteConfirm.value = false
  userToDelete.value = null
}

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const toggleRowSelection = (userId) => {
  // Alternar selección de fila
  selectedUserId.value = selectedUserId.value === userId ? null : userId

  // También alternar el checkbox
  toggleUserSelection(userId)
}

// Función para alternar selección individual
const toggleUserSelection = (userId) => {
  if (selectedUsers.value.has(userId)) {
    selectedUsers.value.delete(userId)
  } else {
    selectedUsers.value.add(userId)
  }
}

// Nueva función para manejar solo el checkbox
const handleCheckboxClick = (userId) => {
  toggleUserSelection(userId)
  // También seleccionar la fila si el checkbox se marca
  if (selectedUsers.value.has(userId)) {
    selectedUserId.value = userId
  } else {
    // Si se desmarca y era la fila seleccionada, deseleccionar fila
    if (selectedUserId.value === userId) {
      selectedUserId.value = null
    }
  }
}

onMounted(loadUsers)
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
    <div class="max-w-6xl mx-auto">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-white mb-2">Panel de Usuarios</h1>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="flex items-center text-white">
          <svg
            class="animate-spin -ml-1 mr-3 h-8 w-8 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Cargando usuarios...
        </div>
      </div>

      <!-- Content -->
      <div v-else class="space-y-6">
        <!-- Formulario agregar usuario -->
        <div class="bg-gray-900 backdrop-blur-lg shadow-[0_0_24px_#2563eb80] rounded-lg p-6">
          <h2 class="text-xl font-semibold text-white mb-4">Agregar nuevo usuario</h2>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div class="relative">
              <input
                v-model="newUser.username"
                placeholder="Nombre de usuario"
                maxlength="10"
                class="bg-gray-800 border border-gray-700 text-white placeholder-gray-400 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all w-full"
              />
              <button
                v-if="newUser.username"
                type="button"
                @click="newUser.username = ''"
                class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="Limpiar campo"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div class="relative">
              <input
                v-model="newUser.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Contraseña"
                maxlength="10"
                class="bg-gray-800 border border-gray-700 text-white placeholder-gray-400 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all w-full"
              />
              <button
                type="button"
                @click="togglePasswordVisibility"
                class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="Mostrar/Ocultar contraseña"
              >
                <!-- Ojo abierto (mostrar) -->
                <svg
                  v-if="!showPassword"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <!-- Ojo cerrado (ocultar) -->
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                  />
                </svg>
              </button>
            </div>

            <select
              v-model="newUser.role"
              class="bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="user">Usuario</option>
              <option value="admin">Admin</option>
            </select>
            <button
              @click="addUser"
              class="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2 justify-center"
            >
              <!-- Ícono de agregar usuario -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3"
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
              Agregar
            </button>
          </div>
        </div>

        <!-- Tabla de usuarios -->
        <div
          class="bg-gray-900 backdrop-blur-lg shadow-[0_0_24px_#2563eb80] rounded-lg overflow-hidden"
        >
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-800 border-b border-gray-700">
                <tr>
                  <th class="px-6 py-4 text-center text-sm font-semibold text-white w-16">
                    <input
                      type="checkbox"
                      v-model="selectAll"
                      class="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
                    />
                  </th>
                  <th class="px-6 py-4 text-center text-sm font-bold text-white">USUARIO</th>
                  <th class="px-6 py-4 text-center text-sm font-semibold text-white">ROL</th>
                  <th class="px-6 py-4 text-center text-base font-semibold text-white">ACCIONES</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-700">
                <tr
                  v-for="user in users"
                  :key="user._id"
                  @click="toggleRowSelection(user._id)"
                  class="transition-colors group cursor-pointer"
                >
                  <td class="px-6 py-4 text-center">
                    <input
                      type="checkbox"
                      :checked="selectedUsers.has(user._id)"
                      @click.stop="handleCheckboxClick(user._id)"
                      class="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
                    />
                  </td>
                  <td class="px-6 py-4 text-white font-medium text-center">{{ user.username }}</td>
                  <td class="px-6 py-4 text-gray-300 text-center">
                    <span
                      :class="[
                        'px-2 py-1 rounded-full text-xs font-medium',
                        user.role === 'admin'
                          ? 'bg-blue-900/50 text-blue-300 border border-blue-700'
                          : 'bg-gray-700/50 text-gray-300 border border-gray-600',
                      ]"
                    >
                      {{ user.role }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <div
                      :class="[
                        'flex justify-center items-center space-x-2 transition-opacity',
                        selectedUserId === user._id
                          ? 'opacity-100'
                          : 'opacity-0 group-hover:opacity-100',
                      ]"
                    >
                      <button
                        @click.stop="startEdit(user)"
                        class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm font-medium transition-all transform hover:scale-105 cursor-pointer flex items-center gap-1"
                      >
                        <!-- Icono de editar -->
                        <svg
                          class="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          ></path>
                        </svg>
                        Editar
                      </button>
                      <button
                        @click.stop="removeUser(user)"
                        class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm font-medium transition-all transform hover:scale-105 cursor-pointer flex items-center gap-1"
                      >
                        <!-- Icono de eliminar -->
                        <svg
                          class="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          ></path>
                        </svg>
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Error Message -->
      <div
        v-if="error"
        class="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center mt-4"
      >
        {{ error }}
      </div>

      <!-- Modal editar -->
      <div
        v-if="editingUser"
        class="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50"
      >
        <div
          class="bg-gray-900 backdrop-blur-lg shadow-[0_0_24px_#2563eb80] rounded-lg p-6 w-full max-w-md"
        >
          <h2 class="text-xl font-semibold text-white mb-6">Editar Usuario</h2>
          <div class="space-y-4">
            <input
              v-model="editingUser.username"
              placeholder="Nombre de usuario"
              maxlength="10"
              class="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-400 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <select
              v-model="editingUser.role"
              class="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="user">Usuario</option>
              <option value="admin">Admin</option>
            </select>
            <div class="flex justify-end space-x-3 pt-4">
              <button
                @click="editingUser = null"
                class="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-all cursor-pointer"
              >
                Cancelar
              </button>
              <button
                @click="saveEdit"
                class="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-2 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal confirmación eliminar -->
      <div
        v-if="showDeleteConfirm"
        class="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50"
      >
        <div
          class="bg-gray-900 backdrop-blur-lg shadow-[0_0_24px_#ef444480] rounded-lg p-6 w-full max-w-md border border-red-700/50"
        >
          <div class="text-center">
            <!-- Icono de advertencia -->
            <div
              class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-900/50 mb-6"
            >
              <svg
                class="h-6 w-6 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.996-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>

            <h3 class="text-lg font-semibold text-white mb-2">Confirmar eliminación</h3>
            <p class="text-gray-400 mb-6">
              ¿Estás seguro de que quieres eliminar al usuario
              <span class="text-white font-medium">{{ userToDelete?.username }}</span
              >? <br /><span class="text-red-400 text-sm">Esta acción no se puede deshacer.</span>
            </p>

            <div class="flex justify-center space-x-3">
              <button
                @click="cancelDelete"
                class="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-6 rounded-lg transition-all cursor-pointer"
              >
                Cancelar
              </button>
              <button
                @click="confirmDelete"
                class="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-2 px-6 rounded-lg transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Animación personalizada para el spinner */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
