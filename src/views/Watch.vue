<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useVideos } from '../composables/useVideos.js'
import Plyr from 'plyr'

const route = useRoute()
const router = useRouter()

const { getVideoById } = useVideos()

const video = ref(null)
const loading = ref(true)
let player = null

const videoElement = ref(null)

function loadVideo() {
  const foundVideo = getVideoById(route.params.id)
  if (foundVideo) {
    video.value = foundVideo
  } else {
    router.push('/')
  }
  loading.value = false
}

function initPlyr() {
  if (!videoElement.value) return

  player = new Plyr(videoElement.value, {
    controls: [
      'play-large',
      'play',
      'progress',
      'current-time',
      'duration',
      'mute',
      'volume',
      'settings',
      'fullscreen'
    ],
    settings: ['quality', 'speed'],
    speed: { selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5, 2] },
    quality: { default: '720', options: ['1080', '720', '480'] },
    fullscreen: { enabled: true, fallback: true }
  })
}

onMounted(() => {
  loadVideo()
  
  setTimeout(() => {
    initPlyr()
  }, 100)
})

onUnmounted(() => {
  if (player) {
    player.destroy()
    player = null
  }
})

watch(() => video.value?.url, () => {
  if (player) {
    player.destroy()
    player = null
  }
  setTimeout(initPlyr, 50)
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

      <h1 class="video-title">{{ video?.title }}</h1>
      
      <div class="video-info">
        <p><strong>Автор:</strong> {{ video?.author || 'Неизвестно' }}</p>
        <p><strong>Просмотров:</strong> {{ video?.views?.toLocaleString() || 0 }}</p>
      </div>

      <div class="description">
        <h3>Описание</h3>
        <p>{{ video?.description || 'Описание видео отсутствует.' }}</p>
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

.plyr {
  border-radius: 12px;
  overflow: hidden;
}

.video-title {
  font-size: 26px;
  line-height: 1.3;
  margin: 16px 0 12px 0;
  color: var(--fg);
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

@media (max-width: 900px) {
  .video-player {
    aspect-ratio: 16 / 9;
  }
}
</style>