<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useVideos } from '../composables/useVideos.js'
import { useAuth } from '../composables/useAuth.js'

const router = useRouter()
const { addVideo } = useVideos()
const { currentUser } = useAuth()

const title = ref('')
const url = ref('https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_2MB.mp4')
const poster = ref('https://picsum.photos/id/1015/1280/720')
const category = ref('Разное')
const description = ref('')

const titleError = ref('')
const urlError = ref('')
const posterError = ref('')
const generalError = ref('')

const categories = [
  'Животные', 'Кулинария', 'Образование', 'Путешествия',
  'Здоровье', 'Фото и видео', 'Игры', 'Музыка', 'Наука', 'Разное'
]

function isValidUrl(string) {
  try {
    new URL(string)
    return true
  } catch (_) {
    return false
  }
}

function validateForm() {
  titleError.value = ''
  urlError.value = ''
  posterError.value = ''
  generalError.value = ''

  let isValid = true

  if (!title.value.trim()) {
    titleError.value = 'Название видео обязательно'
    isValid = false
  }

  if (!url.value.trim()) {
    urlError.value = 'Введите ссылку на видео'
    isValid = false
  } else if (!isValidUrl(url.value)) {
    urlError.value = 'Введите корректную ссылку на видео'
    isValid = false
  }

  if (poster.value.trim() && !isValidUrl(poster.value)) {
    posterError.value = 'Введите корректную ссылку на изображение'
    isValid = false
  }

  return isValid
}

function publishVideo() {
  if (!currentUser.value) {
    generalError.value = 'Войдите в аккаунт, чтобы загружать видео'
    return
  }

  if (!validateForm()) return

  const newVideo = {
    id: Date.now(),
    title: title.value.trim(),
    url: url.value.trim(),
    poster: poster.value.trim() || 'https://picsum.photos/id/1015/1280/720',
    author: currentUser.value.name || currentUser.value.email.split('@')[0],
    views: 0,
    likes: 0,
    category: category.value,
    description: description.value.trim(),
    comments: []
  }

  const success = addVideo(newVideo)

  if (success) {
    title.value = ''
    url.value = 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_2MB.mp4'
    poster.value = 'https://picsum.photos/id/1015/1280/720'
    description.value = ''
    router.push('/')
  } else {
    generalError.value = 'Ошибка при публикации видео'
  }
}
</script>

<template>
  <div class="upload-page">
    <div class="upload-container">
      <h1>Загрузка нового видео</h1>

      <form @submit.prevent="publishVideo" class="upload-form">
        <div class="form-group">
          <label>Название видео *</label>
          <input
            v-model="title"
            type="text"
            placeholder="Введите название видео"
            :class="{ 'input-error': titleError }"
          />
          <p v-if="titleError" class="error-text">{{ titleError }}</p>
        </div>

        <div class="form-group">
          <label>Ссылка на видео *</label>
          <input
            v-model="url"
            type="text"
            placeholder="https://example.com/video.mp4"
            :class="{ 'input-error': urlError }"
          />
          <p v-if="urlError" class="error-text">{{ urlError }}</p>
          <small class="hint">По умолчанию используется тестовое видео</small>
        </div>

        <div class="form-group">
          <label>Ссылка на превью (poster)</label>
          <input
            v-model="poster"
            type="text"
            placeholder="https://picsum.photos/id/1015/1280/720"
            :class="{ 'input-error': posterError }"
          />
          <p v-if="posterError" class="error-text">{{ posterError }}</p>
          <small class="hint">Изображение, которое будет отображаться до воспроизведения</small>
        </div>

        <div class="form-group">
          <label>Категория</label>
          <select v-model="category">
            <option v-for="cat in categories" :key="cat" :value="cat">
              {{ cat }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label>Описание</label>
          <textarea
            v-model="description"
            rows="5"
            placeholder="Расскажите подробнее о видео..."
          ></textarea>
        </div>

        <p v-if="generalError" class="error-text general">{{ generalError }}</p>

        <button type="submit" class="publish-btn">
          Опубликовать видео
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.upload-page {
  background: var(--bg-2);
  min-height: calc(100vh - 56px);
  padding: 40px 20px;
}

.upload-container {
  max-width: 680px;
  margin: 0 auto;
  background: var(--bg);
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
}

h1 {
  text-align: center;
  margin-bottom: 32px;
  color: var(--fg);
}

.upload-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 8px;
  font-weight: 500;
  color: var(--fg);
}

input, select, textarea {
  padding: 12px 14px;
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 15px;
  background: var(--bg);
}

input:focus, select:focus, textarea:focus {
  border-color: var(--accent);
  outline: none;
}

.input-error {
  border-color: var(--red) !important;
}

.hint {
  font-size: 13px;
  color: var(--muted);
  margin-top: 4px;
}

.publish-btn {
  margin-top: 16px;
  padding: 14px;
  background: var(--red);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
}

.publish-btn:hover {
  background: #cc0000;
}

.error-text {
  color: var(--red);
  font-size: 14px;
  margin: 6px 0 0 0;
  min-height: 20px;
}

.general {
  margin-bottom: 12px;
  text-align: center;
}
</style>