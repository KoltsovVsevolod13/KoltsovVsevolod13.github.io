<script setup>
import { ref } from 'vue'

const props = defineProps({
  isOpen: Boolean
})

const items = ref([
  { icon: '🏠', label: 'Главная' },
  { icon: '🎵', label: 'Музыка' },
  { icon: '🎮', label: 'Игры' },
  { icon: '📚', label: 'Образование' },
  { icon: '🍳', label: 'Кулинария' },
  { icon: '🏞️', label: 'Путешествия' },
  { icon: '💪', label: 'Здоровье' },
  { icon: '📸', label: 'Фото и видео' },
  { icon: '🐱', label: 'Животные' },
  { icon: '🧠', label: 'Наука' }
])

const active = ref('Главная')

function onClick(label) {
  active.value = label
}
</script>

<template>
  <aside class="sidebar" :class="{ open: isOpen }">
    <button
      v-for="i in items"
      class="item"
      :class="{ active: active === i.label }"
      @click="onClick(i.label)"
    >
      <span class="icon">{{ i.icon }}</span>
      <span class="label">{{ i.label }}</span>
    </button>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 280px;
  background: var(--bg);
  border-right: 1px solid var(--border);
  height: calc(100vh - 56px);
  overflow-y: auto;
  position: fixed;
  top: 56px;
  left: -280px;
  z-index: 200;
  padding: 12px 0;
  transition: left 0.3s ease;
}

.sidebar.open {
  left: 0;
}

.item {
  display: flex;
  align-items: center;
  gap: 24px;
  width: 100%;
  padding: 0 24px;
  height: 40px;
  background: transparent;
  border: none;
  color: var(--fg);
  cursor: pointer;
  font-size: 14px;
  text-align: left;
}

.item:hover {
  background: var(--hover);
}

.item.active {
  background: var(--hover);
  font-weight: 500;
}

.icon {
  font-size: 18px;
  width: 20px;
  text-align: center;
}
</style>