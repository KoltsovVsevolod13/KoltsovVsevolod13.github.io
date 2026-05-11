<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth.js'
import { useVideos } from '../composables/useVideos.js'
import VideoCard from '../components/VideoCard.vue'

const router = useRouter()
const { currentUser, updateUser, logout } = useAuth()
const { videos, getVideoById, deleteVideo, getScheduledVideos, deleteScheduledVideo } = useVideos()

const name = ref('')
const oldPassword = ref('')
const newPassword = ref('')
const confirmNewPassword = ref('')

const nameError = ref('')
const passwordError = ref('')
const successMessage = ref('')

const showDeleteVideoModal = ref(false)
const videoToDelete = ref(null)

const showDeleteScheduledModal = ref(false)
const scheduledToDelete = ref(null)

if (currentUser.value) {
  name.value = currentUser.value.name || ''
}

const avatarColor = computed(() => {
  return currentUser.value?.avatarColor || '#ff5722'
})

const myVideos = computed(() => {
  if (!currentUser.value) return []
  const userName = currentUser.value.name || currentUser.value.email.split('@')[0]
  return videos.value.filter(v => v.author === userName)
})

const myScheduledVideos = computed(() => {
  if (!currentUser.value) return []
  const userName = currentUser.value.name || currentUser.value.email.split('@')[0]
  return getScheduledVideos(userName)
})

const watchedVideos = computed(() => {
  if (!currentUser.value?.watched || !currentUser.value.watched.length) return []
  return currentUser.value.watched
    .map(id => getVideoById(id))
    .filter(Boolean)
})

function saveName() {
  nameError.value = ''
  successMessage.value = ''

  if (!name.value.trim()) {
    nameError.value = 'Имя не может быть пустым'
    return
  }

  const success = updateUser({ name: name.value.trim() })

  if (success) {
    successMessage.value = 'Имя успешно обновлено!'
    setTimeout(() => { successMessage.value = '' }, 2500)
  } else {
    nameError.value = 'Ошибка при обновлении'
  }
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

  const success = updateUser({ password: newPassword.value })

  if (success) {
    successMessage.value = 'Пароль успешно изменён!'
    oldPassword.value = ''
    newPassword.value = ''
    confirmNewPassword.value = ''
    setTimeout(() => { successMessage.value = '' }, 2500)
  }
}

function openDeleteVideoModal(video) {
  videoToDelete.value = video
  showDeleteVideoModal.value = true
}

function confirmDeleteVideo() {
  if (videoToDelete.value) {
    deleteVideo(videoToDelete.value.id)
    successMessage.value = 'Видео успешно удалено!'
    setTimeout(() => { successMessage.value = '' }, 2000)
  }
  closeDeleteVideoModal()
}

function closeDeleteVideoModal() {
  showDeleteVideoModal.value = false
  videoToDelete.value = null
}

function openDeleteScheduledModal(video) {
  scheduledToDelete.value = video
  showDeleteScheduledModal.value = true
}

function confirmDeleteScheduled() {
  if (scheduledToDelete.value) {
    deleteScheduledVideo(scheduledToDelete.value.id)
    successMessage.value = 'Запланированное видео удалено!'
    setTimeout(() => { successMessage.value = '' }, 2000)
  }
  closeDeleteScheduledModal()
}

function closeDeleteScheduledModal() {
  showDeleteScheduledModal.value = false
  scheduledToDelete.value = null
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
          <input v-model="oldPassword" type="password" placeholder="Старый пароль" />
          <input v-model="newPassword" type="password" placeholder="Новый пароль" />
          <input v-model="confirmNewPassword" type="password" placeholder="Повторите новый пароль" />
          <button @click="changePassword" class="save-btn full-width">Изменить пароль</button>
          <p v-if="passwordError" class="error-text">{{ passwordError }}</p>
        </div>

        <p v-if="successMessage" class="success">{{ successMessage }}</p>

        <button @click="logoutUser" class="logout-btn">Выйти из аккаунта</button>

        <div class="section">
          <h2>Мои видео ({{ myVideos.length }})</h2>
          <div v-if="myVideos.length === 0" class="placeholder">
            Вы ещё не загрузили ни одного видео
          </div>
          <div v-else class="my-videos-grid">
            <div v-for="v in myVideos" :key="v.id" class="my-video-card">
              <VideoCard :id="v.id" :title="v.title" :poster="v.poster" />
              <button class="delete-video-btn" @click="openDeleteVideoModal(v)">Удалить</button>
            </div>
          </div>
        </div>

        <div class="section">
          <h2>Запланированные видео ({{ myScheduledVideos.length }})</h2>
          <div v-if="myScheduledVideos.length === 0" class="placeholder">
            У вас нет запланированных видео
          </div>
          <div v-else class="my-videos-grid">
            <div v-for="v in myScheduledVideos" :key="v.id" class="my-video-card">
              <VideoCard :id="v.id" :title="v.title" :poster="v.poster" />
              <div class="scheduled-info">
                <small>Запланировано на:</small>
                <span>{{ new Date(v.scheduledFor).toLocaleString('ru-RU') }}</span>
              </div>
              <button class="delete-video-btn" @click="openDeleteScheduledModal(v)">Удалить</button>
            </div>
          </div>
        </div>

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

  <div v-if="showDeleteVideoModal" class="modal-overlay">
    <div class="modal">
      <h3>Удалить видео?</h3>
      <p>Вы действительно хотите удалить видео «{{ videoToDelete?.title }}»?<br>Это действие нельзя отменить.</p>
      <div class="modal-buttons">
        <button class="cancel-btn" @click="closeDeleteVideoModal">Отмена</button>
        <button class="delete-confirm-btn" @click="confirmDeleteVideo">Удалить</button>
      </div>
    </div>
  </div>

  <div v-if="showDeleteScheduledModal" class="modal-overlay">
    <div class="modal">
      <h3>Удалить запланированное видео?</h3>
      <p>Видео «{{ scheduledToDelete?.title }}» не будет опубликовано.<br>Это действие нельзя отменить.</p>
      <div class="modal-buttons">
        <button class="cancel-btn" @click="closeDeleteScheduledModal">Отмена</button>
        <button class="delete-confirm-btn" @click="confirmDeleteScheduled">Удалить</button>
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

/* Сетка видео */
.history-grid, .my-videos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 16px;
}

.my-video-card {
  position: relative;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
  padding-bottom: 12px;
  transition: all 0.2s ease;
}

.my-video-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
}

/* Информация о запланированной дате */
.scheduled-info {
  padding: 8px 12px 12px;
  font-size: 13px;
  color: var(--muted);
  background: #fff8e1;
  border-top: 1px solid var(--border);
}

.scheduled-info small {
  display: block;
  margin-bottom: 2px;
  font-weight: 500;
}

.scheduled-info span {
  color: #d97706;
  font-weight: 500;
}

/* Кнопка удалить */
.delete-video-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  background: var(--red);
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  z-index: 10;
  opacity: 0.9;
  transition: all 0.2s;
}

.delete-video-btn:hover {
  background: #cc0000;
  opacity: 1;
  transform: scale(1.05);
}

/* Модальные окна */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: var(--bg);
  padding: 28px;
  border-radius: 12px;
  width: 90%;
  max-width: 420px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  text-align: center;
}

.modal h3 { margin: 0 0 12px 0; }
.modal p { color: var(--muted); margin-bottom: 24px; }

.modal-buttons {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.cancel-btn, .delete-confirm-btn {
  padding: 10px 24px;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  border: none;
}

.cancel-btn {
  background: var(--hover);
  color: var(--fg);
}

.delete-confirm-btn {
  background: var(--red);
  color: white;
}
</style>