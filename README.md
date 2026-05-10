# KoltsovVsevolod13.github.io

 Сайт видеохостинг

## Доп. библиотеки

### Plyr Video Player
Plyr — HTML5 видео-плеер с современным дизайном.

Функциональный плеер вместо стандартного <video>
Поддержка управления скоростью, качеством, полноэкранного режима
Улучшенный UI

Установка
```
npm install plyr
```
Подключение
В src/main.js:
```
import 'plyr/dist/plyr.css'
```
В компоненте Watch.vue:
```
import Plyr from 'plyr'
import { ref, onMounted, onUnmounted } from 'vue'

const videoElement = ref(null)
let player = null

onMounted(() => {
  player = new Plyr(videoElement.value, {
    controls: ['play-large', 'play', 'progress', 'current-time', 'duration', 'mute', 'volume', 'settings', 'fullscreen'],
    speed: { selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5, 2] }
  })
})

onUnmounted(() => {
  if (player) player.destroy()
})

<template>
  <video ref="videoElement" :poster="video?.poster">
    <source :src="video?.url" type="video/mp4" />
  </video>
</template>
```
Основные настройки, которые используем

controls — список отображаемых кнопок
speed — доступные скорости воспроизведения
Автоматическое определение poster

Plyr автоматически применяет свои стили и улучшает поведение видео.