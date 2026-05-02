<script setup>
import { ref } from 'vue'

const chips = ref([
  'Все', 'Музыка', 'Игры', 'JavaScript', 'Vue', 'CSS',
  'Frontend', 'HTML', 'Программирование', 'Туториалы',
  'Веб-разработка', 'Подкасты', 'Кино', 'Новости',
])

const active = ref('Все')

function onClick(chip) {
  active.value = chip
}
</script>

<template>
  <div class="chips">
    <button
      v-for="c in chips"
      class="chip"
      :class="{ active: active === c }"
      @click="onClick(c)"
    >
      {{ c }}
    </button>
  </div>
</template>

<style scoped>
.chips {
  display: flex;
  gap: 12px;
  padding: 12px 0 24px;
  overflow-x: auto;
  scrollbar-width: none;
}

.chips::-webkit-scrollbar {
  display: none;
}

.chip {
  flex-shrink: 0;
  padding: 6px 12px;
  background: var(--bg-2);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--fg);
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
}

.chip:hover {
  background: var(--hover);
}

.chip.active {
  background: var(--fg);
  color: var(--bg);
  border-color: var(--fg);
}
</style>
