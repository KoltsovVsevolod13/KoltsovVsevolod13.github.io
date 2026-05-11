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

function generateRandomColor() {
  const hue = Math.floor(Math.random() * 360)
  return `hsl(${hue}, 85%, 55%)`
}

export function useAuth() {
  onMounted(() => {
    loadFromStorage()
  })

  function login(email, password) {
    const user = users.value.find(u => u.email === email && u.password === password)
    if (user) {
      currentUser.value = { ...user }
      saveToStorage()
      return true
    }
    return false
  }

  function register(email, password) {
    if (users.value.some(u => u.email === email)) return false

    const avatarColor = generateRandomColor()

    const newUser = {
      id: Date.now(),
      email,
      password,
      name: email.split('@')[0],
      avatarColor: avatarColor,
      watched: [],
      likedVideos: []
    }

    users.value.push(newUser)
    saveToStorage()
    return true
  }

  function updateUser(updates) {
    if (!currentUser.value) return false

    currentUser.value = { ...currentUser.value, ...updates }

    const userIndex = users.value.findIndex(u => u.id === currentUser.value.id)
    if (userIndex !== -1) {
      users.value[userIndex] = { ...currentUser.value }
    }

    saveToStorage()
    return true
  }

  function toggleLike(videoId) {
    if (!currentUser.value) return false

    const videoIdNum = Number(videoId)
    if (!currentUser.value.likedVideos) currentUser.value.likedVideos = []

    const index = currentUser.value.likedVideos.indexOf(videoIdNum)

    if (index === -1) {
      currentUser.value.likedVideos.push(videoIdNum)
    } else {
      currentUser.value.likedVideos.splice(index, 1)
    }

    const userIndex = users.value.findIndex(u => u.id === currentUser.value.id)
    if (userIndex !== -1) {
      users.value[userIndex] = { ...currentUser.value }
    }

    saveToStorage()
    return true
  }

  function hasLiked(videoId) {
    if (!currentUser.value?.likedVideos) return false
    return currentUser.value.likedVideos.includes(Number(videoId))
  }

  function addToWatched(videoId) {
    if (!currentUser.value) return false
    const videoIdNum = Number(videoId)
    if (!currentUser.value.watched) currentUser.value.watched = []

    currentUser.value.watched = currentUser.value.watched.filter(id => id !== videoIdNum)
    currentUser.value.watched.push(videoIdNum)

    const userIndex = users.value.findIndex(u => u.id === currentUser.value.id)
    if (userIndex !== -1) {
      users.value[userIndex] = { ...currentUser.value }
    }
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
    toggleLike,
    hasLiked,
    addToWatched,
    currentUser
  }
}