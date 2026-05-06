<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth.js'

const router = useRouter()
const { currentUser, logout } = useAuth()

const search = ref('')

const avatarColor = computed(() => {
  if (!currentUser.value) return '#ff5722'
  const colors = ['#ff0000', '#00bfff', '#32cd32', '#ff8c00', '#8a2be2', '#ff1493']
  const hash = currentUser.value.email.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return colors[hash % colors.length]
})

function goToLogin() {
  router.push('/login')
}

function goToRegister() {
  router.push('/register')
}

function goToProfile() {
  router.push('/profile')
}

function logoutUser() {
  logout()
  router.push('/login')
}
</script>

<template>
  <header class="header">
    <div class="left">
      <button class="icon-btn">☰</button>
      <a class="logo" href="/">
        <span class="logo-icon">▶</span>
        <span class="logo-text">Videohosting</span>
      </a>
    </div>

    <div class="center">
      <input
        v-model="search"
        class="search"
        type="text"
        placeholder="Поиск"
      />
      <button class="search-btn">🔍</button>
      <button class="mic-btn">🎤</button>
    </div>

    <div class="right">
      <template v-if="!currentUser">
        <button class="auth-link" @click="goToRegister">Создать аккаунт</button>
        <button class="auth-link login-btn" @click="goToLogin">Войти</button>
      </template>

      <template v-else>
        <button class="icon-btn">＋</button>
        <button class="avatar-btn" @click="goToProfile" title="Профиль" :style="{ backgroundColor: avatarColor }">
          {{ currentUser.email[0].toUpperCase() }}
        </button>
      </template>
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  height: 56px;
  background: var(--bg);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 10;
}

.left, .right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.center {
  display: flex;
  flex: 0 1 640px;
  align-items: center;
  margin: 0 16px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 4px;
  text-decoration: none;
}

.logo-icon {
  color: var(--red);
  font-size: 22px;
}

.logo-text {
  font-weight: bold;
  font-size: 20px;
  letter-spacing: -1px;
  color: var(--fg);
}

.icon-btn {
  background: transparent;
  border: none;
  color: var(--fg);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 18px;
}

.icon-btn:hover {
  background: var(--hover);
}

.search {
  flex: 1;
  padding: 0 16px;
  height: 40px;
  background: var(--bg);
  color: var(--fg);
  border: 1px solid #ccc;
  border-radius: 20px 0 0 20px;
  outline: none;
  font-size: 14px;
}

.search:focus {
  border-color: var(--accent);
}

.search-btn {
  height: 40px;
  width: 64px;
  background: var(--bg-2);
  border: 1px solid #ccc;
  border-left: none;
  border-radius: 0 20px 20px 0;
  color: var(--fg);
  cursor: pointer;
}

.search-btn:hover {
  background: var(--hover);
}

.mic-btn {
  width: 40px;
  height: 40px;
  margin-left: 8px;
  background: var(--bg-2);
  border: none;
  border-radius: 50%;
  color: var(--fg);
  cursor: pointer;
}

.auth-link {
  padding: 8px 16px;
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 9999px;
  cursor: pointer;
  font-size: 14px;
  white-space: nowrap;
}

.auth-link:hover {
  background: var(--hover);
}

.login-btn {
  background: var(--red);
  color: white;
  border: none;
}

.login-btn:hover {
  background: #cc0000;
}

.avatar-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  color: white;
  border: none;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  transition: transform 0.2s;
}

.avatar-btn:hover {
  transform: scale(1.08);
}
</style>