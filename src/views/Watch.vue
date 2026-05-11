<script setup>
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useVideos } from '../composables/useVideos.js'
import { useAuth } from '../composables/useAuth.js'
import Plyr from 'plyr'

const route = useRoute()
const router = useRouter()

const { getVideoById, incrementViews, toggleLike, addComment, deleteComment } = useVideos()
const { currentUser, addToWatched } = useAuth()

const video = ref(null)
let player = null
const videoElement = ref(null)

const commentText = ref('')
const errorMessage = ref('')

const showDeleteModal = ref(false)
const commentToDelete = ref(null)

function loadVideo() {
  const foundVideo = getVideoById(route.params.id)
  if (foundVideo) {
    video.value = foundVideo
    incrementViews(route.params.id)
    
    if (currentUser.value) {
      addToWatched(route.params.id)
    }
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

const userAvatarColor = computed(() => {
  return currentUser.value?.avatarColor || '#ff0000'
})

function isOwnComment(comment) {
  if (!currentUser.value) return false
  const userName = currentUser.value.name || currentUser.value.email.split('@')[0]
  return comment.user === userName
}

function getCommentAvatarColor(comment) {
  return comment.userColor || '#ff0000'
}

function handleLike() {
  if (!currentUser.value) {
    errorMessage.value = 'Войдите в аккаунт, чтобы ставить лайки'
    setTimeout(() => { errorMessage.value = '' }, 3000)
    return
  }
  toggleLike(route.params.id)
}

function addNewComment() {
  if (!commentText.value.trim()) return
  if (!currentUser.value) {
    errorMessage.value = 'Войдите в аккаунт, чтобы оставлять комментарии'
    return
  }

  const userName = currentUser.value.name || currentUser.value.email.split('@')[0]

  const success = addComment(
    route.params.id,
    commentText.value.trim(),
    userName,
    userAvatarColor.value
  )

  if (success) {
    commentText.value = ''
  }
}

function openDeleteModal(comment) {
  commentToDelete.value = comment
  showDeleteModal.value = true
}

function confirmDelete() {
  if (commentToDelete.value) {
    deleteComment(route.params.id, commentToDelete.value.id)
  }
  closeDeleteModal()
}

function closeDeleteModal() {
  showDeleteModal.value = false
  commentToDelete.value = null
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
        </video>
      </div>

      <div class="video-header">
        <h1 class="video-title">{{ video?.title }}</h1>
        <button class="like-button" @click="handleLike">
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

      <div class="comments-section">
        <h3>Комментарии ({{ video?.comments?.length || 0 }})</h3>

        <div class="comment-form" v-if="currentUser">
          <div class="avatar-small" :style="{ backgroundColor: userAvatarColor }">
            {{ currentUser.email[0].toUpperCase() }}
          </div>
          <div class="input-area">
            <textarea 
              v-model="commentText"
              placeholder="Напишите комментарий..."
              rows="3"
              @keyup.enter.ctrl="addNewComment"
            ></textarea>
            <button 
              class="send-btn"
              :disabled="!commentText.trim()"
              @click="addNewComment"
            >
              Отправить
            </button>
          </div>
        </div>

        <p v-else class="login-to-comment">
          Войдите в аккаунт, чтобы оставлять комментарии
        </p>

        <div v-if="video?.comments?.length" class="comments-list">
          <div 
            v-for="comment in video.comments" 
            :key="comment.id"
            class="comment-item"
          >
            <div 
              class="avatar-small"
              :style="{ backgroundColor: getCommentAvatarColor(comment) }"
            >
              {{ comment.user[0].toUpperCase() }}
            </div>
            
            <div class="comment-content">
              <div class="comment-header">
                <strong>{{ comment.user }}</strong>
                <span class="comment-time">{{ comment.time }}</span>
              </div>
              <p class="comment-text">{{ comment.text }}</p>
            </div>

            <button 
              v-if="isOwnComment(comment)"
              class="delete-btn"
              @click="openDeleteModal(comment)"
              title="Удалить комментарий"
            >
              ✕
            </button>
          </div>
        </div>

        <div v-else class="no-comments">
          Пока нет комментариев. Будьте первым!
        </div>
      </div>
    </div>

    <div v-if="showDeleteModal" class="modal-overlay">
      <div class="modal">
        <h3>Удалить комментарий?</h3>
        <p>Это действие нельзя отменить.</p>
        <div class="modal-buttons">
          <button class="cancel-btn" @click="closeDeleteModal">Отмена</button>
          <button class="delete-confirm-btn" @click="confirmDelete">Удалить</button>
        </div>
      </div>
    </div>

    <div v-if="errorMessage" class="error-notification">
      {{ errorMessage }}
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
  margin-bottom: 32px;
}

.description h3 {
  margin-top: 0;
  margin-bottom: 12px;
  font-size: 18px;
}

.comments-section {
  background: var(--bg);
  border-radius: 12px;
  padding: 24px;
  margin-top: 24px;
}

.comments-section h3 {
  margin-bottom: 20px;
  font-size: 20px;
}

.comment-form {
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
}

.avatar-small {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
}

.input-area {
  flex: 1;
}

.input-area textarea {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid var(--border);
  border-radius: 8px;
  resize: vertical;
  min-height: 80px;
  font-size: 15px;
}

.send-btn {
  margin-top: 8px;
  padding: 10px 24px;
  background: var(--red);
  color: white;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  font-weight: 500;
}

.send-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.comment-item {
  display: flex;
  gap: 16px;
  position: relative;
}

.comment-content {
  flex: 1;
}

.comment-header {
  margin-bottom: 6px;
}

.comment-header strong {
  margin-right: 12px;
}

.comment-time {
  color: var(--muted);
  font-size: 14px;
}

.comment-text {
  line-height: 1.5;
  color: var(--fg);
}

.delete-btn {
  position: absolute;
  right: 0;
  top: 0;
  background: transparent;
  border: none;
  color: var(--muted);
  cursor: pointer;
  font-size: 18px;
  padding: 4px 8px;
}

.delete-btn:hover {
  color: var(--red);
}

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
  max-width: 380px;
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

.no-comments, .login-to-comment {
  text-align: center;
  color: var(--muted);
  font-style: italic;
  padding: 40px 0;
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
}
</style>