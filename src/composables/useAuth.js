import { ref, onMounted } from 'vue'

const users = ref([])
const currentUser = ref(null)

function loadFromStorage() {
  const savedUsers = localStorage.getItem('users')
  const savedCurrentUser = localStorage.getItem('currentUser')

  if (savedUsers) users.value = JSON.parse(savedUsers)
  if (savedCurrentUser) currentUser.value = JSON.parse(savedCurrentUser)
}

function saveToStorage() {
  localStorage.setItem('users', JSON.stringify(users.value))
  if (currentUser.value) {
    localStorage.setItem('currentUser', JSON.stringify(currentUser.value))
  } else {
    localStorage.removeItem('currentUser')
  }
}

export function useAuth() {
  onMounted(() => {
    loadFromStorage()
  })

  function login(email, password) {
    const user = users.value.find(u => u.email === email && u.password === password)
    if (user) {
      currentUser.value = user
      saveToStorage()
      return true
    }
    return false
  }

  function register(email, password) {
    if (users.value.some(u => u.email === email)) return false

    const newUser = {
      id: Date.now(),
      email,
      password,
      name: email.split('@')[0]
    }

    users.value.push(newUser)
    saveToStorage()
    return true
  }

  function updateUser(newData) {
    if (!currentUser.value) return false

    const userIndex = users.value.findIndex(u => u.id === currentUser.value.id)
    if (userIndex === -1) return false

    users.value[userIndex] = { ...users.value[userIndex], ...newData }
    currentUser.value = users.value[userIndex]

    saveToStorage()
    return true
  }

  function logout() {
    currentUser.value = null
    saveToStorage()
  }

  return {
    login,
    register,
    logout,
    updateUser,
    currentUser
  }
}