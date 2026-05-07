<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  id: Number,
  title: String,
  poster: String
})

const router = useRouter()

function openVideo() {
  router.push(`/watch/${props.id}`)
}
</script>

<template>
  <article class="card" @click="openVideo">
    <div class="thumbnail">
      <img :src="poster" alt="thumbnail" />
      <div class="play-overlay">▶</div>
    </div>
    <h3 class="title">{{ title }}</h3>
  </article>
</template>

<style scoped>
.card {
  background: var(--bg-2);
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
}

.thumbnail {
  position: relative;
  aspect-ratio: 16 / 9;
  background: #000;
  overflow: hidden;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.play-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,0.35);
  font-size: 52px;
  color: white;
  opacity: 0;
  transition: opacity 0.2s;
}

.card:hover .play-overlay {
  opacity: 1;
}

.title {
  margin: 12px 16px 16px;
  font-size: 15px;
  font-weight: 500;
  line-height: 1.35;
}
</style>