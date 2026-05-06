<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth.js'

const router = useRouter()
const { currentUser, updateUser, logout } = useAuth()

const name = ref(currentUser.value?.name || '')
const oldPassword = ref('')
const newPassword = ref('')
const confirmNewPassword = ref('')

const nameError = ref('')
const passwordError = ref('')
const successMessage = ref('')

const avatarColor = computed(() => {
  const colors = ['#ff0000', '#00bfff', '#32cd32', '#ff8c00', '#8a2be2', '#ff1493']
  const hash = currentUser.value?.email.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return colors[hash % colors.length]
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
    <div class="profile-card">
      <div class="profile-header">
        <div class="avatar-big" :style="{ backgroundColor: avatarColor }">
          {{ currentUser?.email[0].toUpperCase() }}
        </div>
        <div>
          <h1>{{ currentUser?.name }}</h1>
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
        <h2>История просмотров</h2>
        <p class="placeholder">Пока здесь ничего нет. История просмотров будет отображаться позже.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-page {
  background: var(--bg-2);
  min-height: calc(100vh - 56px);
  padding: 40px 20px;
  display: flex;
  justify-content: center;
}

.profile-card {
  background: var(--bg);
  max-width: 680px;
  width: 100%;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 36px;
  padding-bottom: 28px;
  border-bottom: 1px solid var(--border);
}

.avatar-big {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  font-size: 38px;
  font-weight: bold;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

h2 {
  margin-bottom: 12px;
  font-size: 18px;
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
  padding: 12px 24px;
  background: var(--accent);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 15px;
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
  margin-top: 20px;
}

.error-text {
  color: var(--red);
  margin-top: 4px;
}

.success {
  color: #2e8b57;
  font-weight: 500;
  margin: 12px 0;
}

.placeholder {
  color: var(--muted);
  font-style: italic;
  margin: 8px 0;
}
</style>