<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth.js'
import { useVideos } from '../composables/useVideos.js'
import VideoCard from '../components/VideoCard.vue'

const router = useRouter()
const { currentUser, updateUser, logout } = useAuth()
const { getVideoById } = useVideos()

const name = ref(currentUser.value?.name || '')
const oldPassword = ref('')
const newPassword = ref('')
const confirmNewPassword = ref('')

const nameError = ref('')
const passwordError = ref('')
const successMessage = ref('')

const avatarColor = computed(() => {
  if (!currentUser.value) return '#ff5722'
  const colors = ['#ff0000', '#00bfff', '#32cd32', '#ff8c00', '#8a2be2', '#ff1493']
  const hash = currentUser.value.email.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return colors[hash % colors.length]
})

const watchedVideos = computed(() => {
  if (!currentUser.value?.watched || !currentUser.value.watched.length) return []
  return currentUser.value.watched
    .map(id => getVideoById(id))
    .filter(Boolean)
})

function saveName() {
  if (!name.value.trim()) {
    nameError.value = 'Имя не может быть пустым'
    return
  }
  updateUser({ name: name.value.trim() })
  successMessage.value = 'Имя успешно обновлено!'
  setTimeout(() => { successMessage.value = '' }, 2500)
}

function changePassword() {
  passwordError.value = ''
  successMessage.value = ''

  if (!oldPassword.value || !newPassword.value || !confirmNewPassword.value) {
    passwordError.value = 'Заполните все поля'
    return
  }
  if (oldPassword.value !== currentUser.value.password) {
    passwordError.value = 'Старый пароль неверный'
    return
  }
  if (newPassword.value.length < 6) {
    passwordError.value = 'Новый пароль должен быть не менее 6 символов'
    return
  }
  if (newPassword.value !== confirmNewPassword.value) {
    passwordError.value = 'Новые пароли не совпадают'
    return
  }

  updateUser({ password: newPassword.value })
  successMessage.value = 'Пароль успешно изменён!'
  oldPassword.value = ''
  newPassword.value = ''
  confirmNewPassword.value = ''
}

function logoutUser() {
  logout()
  router.push('/login')
}
</script>

<template>
  <div class="profile-page">
    <div class="profile-container">
      <div class="profile-card">
        <div class="profile-header">
          <div class="avatar-big" :style="{ backgroundColor: avatarColor }">
            {{ currentUser?.email[0]?.toUpperCase() || '?' }}
          </div>
          <div>
            <h1>{{ currentUser?.name || 'Пользователь' }}</h1>
            <p class="email">{{ currentUser?.email }}</p>
          </div>
        </div>

        <div class="section">
          <h2>Изменить имя пользователя</h2>
          <div class="form-row">
            <input v-model="name" placeholder="Новое имя" />
            <button @click="saveName" class="save-btn">Сохранить</button>
          </div>
          <p v-if="nameError" class="error-text">{{ nameError }}</p>
        </div>

        <div class="section">
          <h2>Изменить пароль</h2>
          <input 
            v-model="oldPassword" 
            type="password" 
            placeholder="Старый пароль" 
          />
          <input 
            v-model="newPassword" 
            type="password" 
            placeholder="Новый пароль" 
          />
          <input 
            v-model="confirmNewPassword" 
            type="password" 
            placeholder="Повторите новый пароль" 
          />
          <button @click="changePassword" class="save-btn full-width">Изменить пароль</button>
          <p v-if="passwordError" class="error-text">{{ passwordError }}</p>
        </div>

        <p v-if="successMessage" class="success">{{ successMessage }}</p>

        <button @click="logoutUser" class="logout-btn">Выйти из аккаунта</button>

        <div class="section">
          <h2>История просмотров ({{ watchedVideos.length }})</h2>
          
          <div v-if="watchedVideos.length === 0" class="placeholder">
            Вы ещё не посмотрели ни одного видео
          </div>
          
          <div v-else class="history-grid">
            <VideoCard
              v-for="v in watchedVideos"
              :key="v.id"
              :id="v.id"
              :title="v.title"
              :poster="v.poster"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-page {
  background: var(--bg-2);
  min-height: calc(100vh - 56px);
  padding: 40px 20px;
}

.profile-container {
  max-width: 1100px;
  margin: 0 auto;
}

.profile-card {
  background: var(--bg);
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 40px;
  padding-bottom: 32px;
  border-bottom: 1px solid var(--border);
}

.avatar-big {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  font-size: 42px;
  font-weight: bold;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

h2 {
  margin-bottom: 16px;
  font-size: 20px;
  color: var(--fg);
}

.form-row {
  display: flex;
  gap: 12px;
  margin-bottom: 8px;
}

input {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 15px;
  margin-bottom: 12px;
}

input:focus {
  border-color: var(--accent);
  outline: none;
}

.save-btn {
  padding: 12px 28px;
  background: var(--accent);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 15px;
  white-space: nowrap;
}

.full-width {
  width: 100%;
  margin-top: 8px;
}

.logout-btn {
  width: 100%;
  padding: 14px;
  background: var(--red);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  margin: 30px 0 20px 0;
}

.error-text {
  color: var(--red);
  margin-top: 4px;
}

.success {
  color: #2e8b57;
  font-weight: 500;
  margin: 16px 0;
}

.placeholder {
  color: var(--muted);
  font-style: italic;
  margin: 20px 0;
}

.history-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 16px;
}

@media (max-width: 900px) {
  .profile-container {
    max-width: 100%;
  }
  .profile-card {
    padding: 30px 20px;
  }
  .history-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}
</style>