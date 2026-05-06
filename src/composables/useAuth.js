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
    if (users.value.some(u => u.email === email)) {
      return false
    }

    const newUser = {
      id: Date.now(),
      email: email,
      password: password
    }

    users.value.push(newUser)
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
    currentUser
  }
}