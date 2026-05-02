import { ref } from 'vue'

const videos = ref([
  { id: 1, title: 'Урок 1. Подготовка к работе с HTML, CSS и JavaScript' },
  { id: 2, title: 'Vue 3 с нуля - установка и запуск через Vite' },
  { id: 3, title: 'Переменные ref и reactive - реактивность во Vue' },
  { id: 4, title: 'Обработчик событий @click - все приёмы' },
  { id: 5, title: 'v-if vs v-show - что выбрать и когда' },
  { id: 6, title: 'v-model на полях ввода - чекбоксы, радио, select' },
  { id: 7, title: 'v-for - отрисовка списков и объектов' },
  { id: 8, title: 'Компоненты во Vue - defineProps и defineEmits' },
  { id: 9, title: 'Vue Router - маршрутизация в SPA' },
  { id: 10, title: 'localStorage - сохраняем данные в браузере' },
  { id: 11, title: 'Регулярные выражения для проверки форм' },
  { id: 12, title: 'Формы во Vue - валидация и обработка submit' },
])

export function useVideos() {
  return {
    videos,
  }
}
