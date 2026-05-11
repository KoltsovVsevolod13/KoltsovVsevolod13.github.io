<script setup>
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useVideos } from '../composables/useVideos.js'
import { useAuth } from '../composables/useAuth.js'
import Plyr from 'plyr'

const route = useRoute()
const router = useRouter()

const { getVideoById, incrementViews, toggleLike: toggleVideoLike } = useVideos()
const { currentUser, hasLiked, addToWatched, toggleLike: toggleUserLike } = useAuth()

const video = ref(null)
let player = null
const videoElement = ref(null)

const isLiked = computed(() => hasLiked(video.value?.id))
const errorMessage = ref('')

function loadVideo() {
  const foundVideo = getVideoById(route.params.id)
  if (foundVideo) {
    video.value = foundVideo
    incrementViews(route.params.id)
    addToWatched(route.params.id)
  } else {
    router.push('/')
  }
}

function initPlyr() {
  if (!videoElement.value) return
  player = new Plyr(videoElement.value, {
    controls: ['play-large', 'play', 'progress', 'current-time', 'duration', 'mute', 'volume', 'settings', 'fullscreen'],
    speed: { selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5, 2] }
  })
}

function handleLike() {
  if (!currentUser.value) {
    errorMessage.value = 'Войдите в аккаунт, чтобы ставить лайки'
    setTimeout(() => {
      errorMessage.value = ''
    }, 3000)
    return
  }

  toggleVideoLike(route.params.id)
  toggleUserLike(route.params.id)
}

onMounted(() => {
  loadVideo()
  setTimeout(initPlyr, 150)
})

onUnmounted(() => {
  if (player) player.destroy()
})

watch(() => video.value?.url, () => {
  if (player) player.destroy()
  setTimeout(initPlyr, 100)
})
</script>

<template>
  <div class="watch-page">
    <div class="video-wrapper">
      <div class="video-container">
        <video 
          ref="videoElement"
          controls 
          autoplay 
          class="video-player"
          :poster="video?.poster"
        >
          <source :src="video?.url" type="video/mp4" />
          Ваш браузер не поддерживает видео.
        </video>
      </div>

      <div class="video-header">
        <h1 class="video-title">{{ video?.title }}</h1>
        
        <button 
          class="like-button"
          :class="{ liked: isLiked }"
          @click="handleLike"
        >
          ❤️ {{ video?.likes?.toLocaleString() || 0 }}
        </button>
      </div>

      <div class="video-info">
        <p><strong>Автор:</strong> {{ video?.author || 'Неизвестно' }}</p>
        <p><strong>Просмотров:</strong> {{ video?.views?.toLocaleString() || 0 }}</p>
      </div>

      <div class="description">
        <h3>Описание</h3>
        <p>{{ video?.description || 'Описание видео отсутствует.' }}</p>
      </div>

      <div v-if="errorMessage" class="error-notification">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.watch-page {
  background: var(--bg-2);
  min-height: calc(100vh - 56px);
  padding: 24px 0;
}

.video-wrapper {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
  position: relative;
}

.video-container {
  background: #000;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.video-player {
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
}

.video-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 16px;
}

.video-title {
  font-size: 26px;
  line-height: 1.3;
  margin: 0;
  color: var(--fg);
  flex: 1;
}

.like-button {
  background: #f2f2f2;
  border: 1px solid #dadada;
  border-radius: 9999px;
  padding: 10px 24px;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
  white-space: nowrap;
  font-weight: 500;
}

.like-button:hover {
  background: #ffe6e6;
  border-color: #ff0000;
}

.like-button.liked {
  background: #ffe6e6;
  border-color: #ff0000;
  color: #ff0000;
}

.video-info {
  display: flex;
  gap: 24px;
  color: var(--muted);
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border);
  font-size: 15px;
}

.description {
  background: var(--bg);
  padding: 20px;
  border-radius: 12px;
  line-height: 1.6;
}

.description h3 {
  margin-top: 0;
  margin-bottom: 12px;
  font-size: 18px;
}

.error-notification {
  position: fixed;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  background: #ff5252;
  color: white;
  padding: 14px 24px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  font-size: 15px;
  animation: fadeOut 3s forwards;
}

@keyframes fadeOut {
  0% { opacity: 1; }
  80% { opacity: 1; }
  100% { opacity: 0; }
}

@media (max-width: 900px) {
  .video-header {
    flex-direction: column;
    align-items: stretch;
  }
  .like-button {
    align-self: flex-start;
  }
}
</style>