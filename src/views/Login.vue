<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth.js'

const router = useRouter()
const { login } = useAuth()

const email = ref('')
const password = ref('')
const emailError = ref('')
const passwordError = ref('')
const generalError = ref('')

function isValidEmail(emailString) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(emailString)
}

function validateForm() {
  emailError.value = ''
  passwordError.value = ''
  generalError.value = ''

  let isValid = true

  if (!email.value.trim()) {
    emailError.value = 'Введите email'
    isValid = false
  } else if (!isValidEmail(email.value.trim())) {
    emailError.value = 'Введите корректный email адрес'
    isValid = false
  }

  if (!password.value) {
    passwordError.value = 'Введите пароль'
    isValid = false
  }

  return isValid
}

function loginUser() {
  if (!validateForm()) return

  const success = login(email.value.trim(), password.value)

  if (success) {
    router.push('/')
  } else {
    generalError.value = 'Неверный email или пароль'
  }
}
</script>

<template>
  <div class="auth-page">
    <div class="auth-card">
      <h1>Вход в аккаунт</h1>
      
      <form @submit.prevent="loginUser" novalidate>
        <div class="form-group">
          <label>Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="your@email.com"
            :class="{ 'input-error': emailError }"
          />
          <p v-if="emailError" class="error-text">{{ emailError }}</p>
        </div>

        <div class="form-group">
          <label>Пароль</label>
          <input
            v-model="password"
            type="password"
            placeholder="Ваш пароль"
            :class="{ 'input-error': passwordError }"
          />
          <p v-if="passwordError" class="error-text">{{ passwordError }}</p>
        </div>

        <p v-if="generalError" class="error-text general">{{ generalError }}</p>

        <button type="submit" class="auth-btn">Войти</button>
      </form>

      <p class="link-text">
        Нет аккаунта? 
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </div>
</template>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-2);
}

.auth-card {
  background: var(--bg);
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 380px;
}

h1 {
  text-align: center;
  margin-bottom: 24px;
  color: var(--fg);
}

.form-group {
  margin-bottom: 18px;
}

label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 15px;
}

input:focus {
  border-color: var(--accent);
  outline: none;
}

.input-error {
  border-color: var(--red) !important;
}

.error-text {
  color: var(--red);
  font-size: 14px;
  margin: 6px 0 0 0;
  min-height: 20px;
}

.general {
  margin-bottom: 12px;
}

.auth-btn {
  width: 100%;
  padding: 12px;
  background: var(--red);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 8px;
}

.auth-btn:hover {
  background: #cc0000;
}

.link-text {
  text-align: center;
  margin-top: 20px;
  color: var(--muted);
}

.link-text a {
  color: var(--accent);
}
</style>