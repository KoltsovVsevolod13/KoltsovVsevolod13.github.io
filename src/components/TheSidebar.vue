<script setup>
import { ref } from 'vue'
import { useAuth } from '../composables/useAuth.js'

const emit = defineEmits(['category-selected'])

const props = defineProps({
  isOpen: Boolean
})

const { currentUser } = useAuth()

const categories = ref([
  { icon: '🏠', label: 'Главная' },
  { icon: '❤️', label: 'Понравившиеся' },
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

const activeCategory = ref('Главная')

function selectCategory(label) {
  activeCategory.value = label
  emit('category-selected', label)
}
</script>

<template>
  <aside class="sidebar" :class="{ open: isOpen }">
    <button
      v-for="cat in categories"
      :key="cat.label"
      class="item"
      :class="{ active: activeCategory === cat.label }"
      @click="selectCategory(cat.label)"
    >
      <span class="icon">{{ cat.icon }}</span>
      <span class="label">{{ cat.label }}</span>
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