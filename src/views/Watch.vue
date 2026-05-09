<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useVideos } from '../composables/useVideos.js'
import { useAuth } from '../composables/useAuth.js'

const route = useRoute()
const router = useRouter()

const { getVideoById, incrementViews, toggleLike, addComment, deleteComment } = useVideos()
const { currentUser, addToWatched, hasLiked, toggleLike: toggleUserLike } = useAuth()

const video = ref(null)
const newCommentText = ref('')

function loadVideo() {
  const foundVideo = getVideoById(route.params.id)
  
  if (foundVideo) {
    video.value = foundVideo
    if (currentUser.value) {
      const wasAdded = addToWatched(route.params.id)
      if (wasAdded) incrementViews(route.params.id)
    }
  } else {
    router.push('/')
  }
}

function handleLike() {
  if (!video.value || !currentUser.value) return
  toggleUserLike(video.value.id)
  
  const videoRef = getVideoById(video.value.id)
  if (videoRef) {
    if (hasLiked(video.value.id)) {
      videoRef.likes += 1
    } else {
      videoRef.likes = Math.max(0, videoRef.likes - 1)
    }
  }
}

function submitComment() {
  if (!newCommentText.value.trim() || !currentUser.value || !video.value) return

  const success = addComment(
    video.value.id, 
    newCommentText.value, 
    currentUser.value.name || currentUser.value.email.split('@')[0]
  )

  if (success) newCommentText.value = ''
}

function removeComment(commentId) {
  if (!video.value || !currentUser.value) return
  deleteComment(video.value.id, commentId)
}

onMounted(() => {
  loadVideo()
})
</script>

<template>
  <div class="watch-page">
    <div class="video-wrapper">
      <div class="video-container">
        <video controls autoplay class="video-player" :poster="video?.poster">
          <source :src="video?.url" type="video/mp4" />
        </video>
      </div>

      <h1 class="video-title">{{ video?.title }}</h1>
      
      <div class="video-info">
        <p><strong>Автор:</strong> {{ video?.author || 'Неизвестно' }}</p>
        <p><strong>Просмотров:</strong> {{ video?.views?.toLocaleString() || 0 }}</p>
      </div>

      <div class="like-section">
        <button class="like-button" :class="{ liked: hasLiked(video?.id) }" @click="handleLike">
          ❤️ <span class="like-count">{{ video?.likes?.toLocaleString() || 0 }}</span>
        </button>
      </div>

      <div class="comments-section">
        <h3>Комментарии ({{ video?.comments?.length || 0 }})</h3>

        <div v-if="currentUser" class="comment-form">
          <textarea 
            v-model="newCommentText"
            placeholder="Напишите комментарий..."
            rows="4"
          ></textarea>
          <button @click="submitComment" class="send-btn">Отправить комментарий</button>
        </div>

        <p v-else class="login-to-comment">Войдите в аккаунт, чтобы оставлять комментарии</p>

        <div class="comments-list">
          <div v-for="comment in video?.comments" :key="comment.id" class="comment">
            <div class="comment-avatar">{{ comment.user[0].toUpperCase() }}</div>
            <div class="comment-body">
              <div class="comment-header">
                <strong>{{ comment.user }}</strong>
                <span class="comment-time">{{ comment.time }}</span>
              </div>
              <p class="comment-text">{{ comment.text }}</p>
            </div>
            
            <button 
              v-if="currentUser && comment.user === (currentUser.name || currentUser.email.split('@')[0])"
              class="delete-btn"
              @click="removeComment(comment.id)"
              title="Удалить"
            >
              ✕
            </button>
          </div>

          <p v-if="video?.comments?.length === 0" class="no-comments">
            Пока нет комментариев. Будьте первым!
          </p>
        </div>
      </div>

      <div class="description">
        <h3>Описание</h3>
        <p>{{ video?.description || 'Описание видео отсутствует.' }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.watch-page { background: var(--bg-2); min-height: calc(100vh - 56px); padding: 24px 0; }
.video-wrapper { max-width: 1280px; margin: 0 auto; padding: 0 24px; }
.video-container { background: #000; border-radius: 12px; overflow: hidden; margin-bottom: 20px; box-shadow: 0 4px 16px rgba(0,0,0,0.15); }
.video-player { width: 100%; aspect-ratio: 16 / 9; }

.video-title { font-size: 26px; margin: 20px 0 12px; }
.video-info { display: flex; gap: 24px; color: var(--muted); margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid var(--border); }

.like-section { margin: 20px 0 30px 0; }

.like-button {
  display: flex; align-items: center; gap: 8px;
  background: var(--bg); border: 2px solid var(--border);
  border-radius: 50px; padding: 10px 24px; font-size: 22px;
  cursor: pointer;
}
.like-button.liked { background: #e3f2fd; border-color: #1976d2; color: #1976d2; }

.comments-section {
  margin-top: 40px;
  background: var(--bg);
  padding: 28px;
  border-radius: 12px;
}

.comments-section h3 { margin-bottom: 24px; font-size: 20px; }

.comment-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 32px;
}

.comment-form textarea {
  padding: 14px 16px;
  border: 1px solid var(--border);
  border-radius: 10px;
  resize: vertical;
  min-height: 110px;
  font-size: 15px;
}

.send-btn {
  align-self: flex-start;
  padding: 12px 32px;
  background: #1976d2;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.send-btn:hover {
  background: #1565c0;
  transform: translateY(-2px);
}

.comments-list { margin-top: 8px; }

.comment {
  display: flex;
  gap: 16px;
  padding: 20px 0;
  border-top: 1px solid var(--border);
  position: relative;
}

.comment:first-child { border-top: none; }

.comment-avatar {
  width: 44px;
  height: 44px;
  background: #1976d2;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
}

.comment-body { flex: 1; padding-right: 40px; }

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.comment-time { color: var(--muted); font-size: 13.5px; }

.delete-btn {
  position: absolute;
  top: 20px;
  right: 8px;
  background: none;
  border: none;
  color: #ff5252;
  font-size: 20px;
  cursor: pointer;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;
}

.delete-btn:hover {
  background: #ffebee;
  color: #d32f2f;
}

.no-comments {
  color: var(--muted);
  font-style: italic;
  text-align: center;
  padding: 60px 0;
}

.description {
  background: var(--bg);
  padding: 24px;
  border-radius: 12px;
  margin-top: 40px;
}
</style>