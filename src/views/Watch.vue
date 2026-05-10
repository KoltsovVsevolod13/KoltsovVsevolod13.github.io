<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useVideos } from '../composables/useVideos.js'
import { useAuth } from '../composables/useAuth.js'

const route = useRoute()
const router = useRouter()

const { getVideoById, incrementViews, toggleLike, addComment, deleteComment } = useVideos()
const { currentUser, addToWatched, hasLiked, toggleLike: toggleUserLike } = useAuth()

const video = ref(null)
const newCommentText = ref('')

const recommendedVideos = computed(() => {
  if (!video.value) return []
  const otherVideos = videos.value.filter(v => v.id !== video.value.id)
  const shuffled = [...otherVideos].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, 7)
})

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
    <div class="watch-container">
      <div class="video-main">
        <div class="video-wrapper">
          <div class="video-container">
            <video controls autoplay class="video-player" :poster="video?.poster">
              <source :src="video?.url" type="video/mp4" />
            </video>
          </div>

          <div class="title-row">
            <h1 class="video-title">{{ video?.title }}</h1>
            
            <button class="like-button" :class="{ liked: hasLiked(video?.id) }" @click="handleLike">
              ❤️ <span class="like-count">{{ video?.likes?.toLocaleString() || 0 }}</span>
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
        </div>
      </div>

      <div class="recommended-sidebar">
        <h3 class="recommended-title">Рекомендуемые видео</h3>
        
        <div class="recommended-list">
          <VideoCard
            v-for="rec in recommendedVideos"
            :key="rec.id"
            :id="rec.id"
            :title="rec.title"
            :poster="rec.poster"
            class="recommended-card"
          />
        </div>
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
<<<<<<< HEAD
<<<<<<< HEAD
.watch-page {
  background: var(--bg-2);
  min-height: calc(100vh - 56px);
  padding: 24px 0 40px;
}

.watch-container {
  max-width: 1920px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  gap: 32px;
  align-items: flex-start;
}

.video-main {
  flex: 1;
  max-width: 1360px;
}

.video-wrapper {
  width: 100%;
}
=======
.watch-page { background: var(--bg-2); min-height: calc(100vh - 56px); padding: 24px 0; }
.video-wrapper { max-width: 1280px; margin: 0 auto; padding: 0 24px; }
.video-container { background: #000; border-radius: 12px; overflow: hidden; margin-bottom: 20px; box-shadow: 0 4px 16px rgba(0,0,0,0.15); }
.video-player { width: 100%; aspect-ratio: 16 / 9; }

.video-title { font-size: 26px; margin: 20px 0 12px; }
.video-info { display: flex; gap: 24px; color: var(--muted); margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid var(--border); }
>>>>>>> 65d9972da5e179c21c33dc5c50cc23ff0f070925

=======
.watch-page { background: var(--bg-2); min-height: calc(100vh - 56px); padding: 24px 0; }
.video-wrapper { max-width: 1280px; margin: 0 auto; padding: 0 24px; }
.video-container { background: #000; border-radius: 12px; overflow: hidden; margin-bottom: 20px; box-shadow: 0 4px 16px rgba(0,0,0,0.15); }
.video-player { width: 100%; aspect-ratio: 16 / 9; }

.video-title { font-size: 26px; margin: 20px 0 12px; }
.video-info { display: flex; gap: 24px; color: var(--muted); margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid var(--border); }

>>>>>>> 65d9972da5e179c21c33dc5c50cc23ff0f070925
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
<<<<<<< HEAD
<<<<<<< HEAD
  overflow: hidden;
  margin-bottom: 20px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
}

.video-player {
  width: 100%;
  aspect-ratio: 16 / 9;
}

.title-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 12px;
}

.video-title {
  font-size: 26px;
  margin: 0;
  line-height: 1.3;
  flex: 1;
}

.like-button {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--bg);
  border: 2px solid var(--border);
  border-radius: 50px;
  padding: 10px 24px;
  font-size: 22px;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  margin-top: 4px;
}

.like-button.liked {
  background: #e3f2fd;
  border-color: #1976d2;
  color: #1976d2;
}

.video-info {
  display: flex;
  gap: 24px;
  color: var(--muted);
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border);
}

.recommended-sidebar {
  width: 460px;
  flex-shrink: 0;
}

.recommended-title {
  font-size: 18px;
  margin-bottom: 16px;
  padding-left: 4px;
  font-weight: 500;
}

.recommended-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.recommended-card {
  display: flex;
  gap: 12px;
}

.recommended-card :deep(.card) {
  flex-direction: row;
  background: transparent;
  border: none;
  box-shadow: none;
  padding: 0;
}

.recommended-card :deep(.thumbnail) {
  width: 190px;
  flex-shrink: 0;
  aspect-ratio: 16 / 9;
  border-radius: 8px;
}

.recommended-card :deep(.title) {
  font-size: 14.8px;
  margin: 0 0 0 12px;
  line-height: 1.35;
}

.description,
.comments-section {
  background: var(--bg);
  padding: 28px;
  border-radius: 12px;
  margin-top: 40px;
}

.description h3,
.comments-section h3 {
  margin-bottom: 24px;
  font-size: 20px;
}

.comment-form {
  display: flex;
=======
}

.comments-section h3 { margin-bottom: 24px; font-size: 20px; }

.comment-form {
  display: flex;
>>>>>>> 65d9972da5e179c21c33dc5c50cc23ff0f070925
=======
}

.comments-section h3 { margin-bottom: 24px; font-size: 20px; }

.comment-form {
  display: flex;
>>>>>>> 65d9972da5e179c21c33dc5c50cc23ff0f070925
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
  transition: all 0.2s;
>>>>>>> 65d9972da5e179c21c33dc5c50cc23ff0f070925
=======
  transition: all 0.2s;
>>>>>>> 65d9972da5e179c21c33dc5c50cc23ff0f070925
}

.send-btn:hover {
  background: #1565c0;
<<<<<<< HEAD
<<<<<<< HEAD
=======
  transform: translateY(-2px);
>>>>>>> 65d9972da5e179c21c33dc5c50cc23ff0f070925
=======
  transform: translateY(-2px);
>>>>>>> 65d9972da5e179c21c33dc5c50cc23ff0f070925
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
  transition: all 0.2s;
>>>>>>> 65d9972da5e179c21c33dc5c50cc23ff0f070925
=======
  transition: all 0.2s;
>>>>>>> 65d9972da5e179c21c33dc5c50cc23ff0f070925
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

<<<<<<< HEAD
<<<<<<< HEAD
@media (max-width: 1480px) {
  .recommended-sidebar { width: 420px; }
}

@media (max-width: 1280px) {
  .watch-container {
    flex-direction: column;
    padding: 0 16px;
  }
  .recommended-sidebar { width: 100%; }
  .title-row { flex-direction: column; align-items: flex-start; }
}

@media (max-width: 768px) {
  .video-title { font-size: 22px; }
  .recommended-card :deep(.thumbnail) { width: 160px; }
=======
=======
>>>>>>> 65d9972da5e179c21c33dc5c50cc23ff0f070925
.description {
  background: var(--bg);
  padding: 24px;
  border-radius: 12px;
  margin-top: 40px;
<<<<<<< HEAD
>>>>>>> 65d9972da5e179c21c33dc5c50cc23ff0f070925
=======
>>>>>>> 65d9972da5e179c21c33dc5c50cc23ff0f070925
}
</style>