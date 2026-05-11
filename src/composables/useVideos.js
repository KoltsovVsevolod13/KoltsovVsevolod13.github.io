import { ref, onMounted } from 'vue'
import { useAuth } from './useAuth.js'

const videos = ref([])

const defaultVideos = [
  {
    id: 1,
    title: '10 интересных фактов про слонов',
    url: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_2MB.mp4',
    poster: 'https://picsum.photos/id/1015/1280/720',
    author: 'Познавательный мир',
    views: 45200,
    likes: 1240,
    category: 'Животные',
    description: 'Удивительные факты о самых больших наземных животных планеты.',
    comments: [
      { 
        id: 101, 
        user: 'Алексей', 
        userColor: '#ff0000',
        text: 'Очень интересное видео! Особенно про память слонов.', 
        time: '2 часа назад' 
      },
      { 
        id: 102, 
        user: 'Мария', 
        userColor: '#00bfff',
        text: 'Спасибо, теперь знаю, что слоны действительно умеют плавать 😮', 
        time: '1 день назад' 
      }
    ]
  },
  {
    id: 2,
    title: 'Как приготовить настоящую пиццу Маргариту дома',
    url: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_2MB.mp4',
    poster: 'https://picsum.photos/id/292/1280/720',
    author: 'Кухня с душой',
    views: 31800,
    likes: 875,
    category: 'Кулинария',
    description: 'Простой и вкусный рецепт итальянской классики.',
    comments: []
  },
  {
    id: 3,
    title: 'Как быстро выучить английский язык — реальные советы',
    url: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_2MB.mp4',
    poster: 'https://picsum.photos/id/201/1280/720',
    author: 'English Easy',
    views: 27400,
    likes: 2150,
    category: 'Образование',
    description: 'Методы, которые реально работают.',
    comments: [      
      { 
        id: 301, 
        user: 'Андрей', 
        userColor: '#ff0000',
        text: 'Я выучил.', 
        time: '2 часа назад' 
      },
    ]
  },
  {
    id: 4,
    title: 'Топ 10 самых красивых мест в мире 2025',
    url: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_2MB.mp4',
    poster: 'https://picsum.photos/id/1016/1280/720',
    author: 'Путешествия',
    views: 18900,
    likes: 980,
    category: 'Путешествия',
    description: 'Места, от которых захватывает дух.',
    comments: []
  },
  {
    id: 5,
    title: 'Идеальный кофе дома за 5 минут',
    url: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_2MB.mp4',
    poster: 'https://picsum.photos/id/133/1280/720',
    author: 'Coffee Lab',
    views: 15600,
    likes: 645,
    category: 'Кулинария',
    description: 'Секреты приготовления как в кофейне.',
    comments: [      
      { 
        id: 501, 
        user: 'Мама', 
        userColor: '#ff0000',
        text: 'Я обожаю кофе.', 
        time: '2 часа назад' 
      },      
      { 
        id: 601, 
        user: 'Папа', 
        userColor: '#008000',
        text: 'Кофееее.', 
        time: 'год назад' 
      },
    ]
  },
  {
    id: 6,
    title: '5 простых упражнений для исправления осанки',
    url: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_2MB.mp4',
    poster: 'https://picsum.photos/id/180/1280/720',
    author: 'Здоровье каждый день',
    views: 22300,
    likes: 1340,
    category: 'Здоровье',
    description: 'Простая тренировка на каждый день.',
    comments: []
  },
  {
    id: 7,
    title: 'Как снимать красивое видео на смартфон',
    url: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_2MB.mp4',
    poster: 'https://picsum.photos/id/251/1280/720',
    author: 'ФотоМастер',
    views: 9800,
    likes: 720,
    category: 'Фото и видео',
    description: 'Лайфхаки мобильной съёмки 2025.',
    comments: []
  },
  {
    id: 8,
    title: 'Почему коты ведут себя так странно',
    url: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_2MB.mp4',
    poster: 'https://picsum.photos/id/219/1280/720',
    author: 'Кошачий мир',
    views: 41200,
    likes: 2890,
    category: 'Животные',
    description: 'Разбираем странное поведение домашних любимцев.',
    comments: [      
      { 
        id: 501, 
        user: 'Кошка', 
        userColor: '#808080',
        text: 'Мяу.', 
        time: '1 минуту назад' 
      }
    ]
  },
  {
    id: 9,
    title: 'Лучшие инди-игры 2025 года',
    url: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_2MB.mp4',
    poster: 'https://picsum.photos/id/106/1280/720',
    author: 'GameZone',
    views: 15600,
    likes: 920,
    category: 'Игры',
    description: 'Обзор самых интересных инди-проектов.',
    comments: []
  },
  {
    id: 10,
    title: 'Как научиться играть на гитаре с нуля',
    url: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_2MB.mp4',
    poster: 'https://picsum.photos/id/145/1280/720',
    author: 'Музыка с душой',
    views: 28900,
    likes: 1650,
    category: 'Музыка',
    description: 'Первый урок для начинающих.',
    comments: []
  }
]

const scheduledVideos = ref([])

function loadScheduledFromStorage() {
  const saved = localStorage.getItem('scheduledVideos')
  if (saved) {
    scheduledVideos.value = JSON.parse(saved)
  }
}

function saveScheduledToStorage() {
  localStorage.setItem('scheduledVideos', JSON.stringify(scheduledVideos.value))
}

function publishDueScheduledVideos() {
  if (!scheduledVideos.value.length) return

  const now = new Date()

  const toPublish = scheduledVideos.value.filter(video => {
    const scheduledDate = new Date(video.scheduledFor)
    return scheduledDate <= now
  })

  if (toPublish.length === 0) return

  console.log(`📌 Публикуем ${toPublish.length} запланированных видео`)

  toPublish.forEach(video => {
    const { scheduledFor, status, ...publishedVideo } = video
    
    publishedVideo.views = 0
    publishedVideo.likes = 0
    publishedVideo.comments = []
    
    videos.value.unshift(publishedVideo)
  })

  scheduledVideos.value = scheduledVideos.value.filter(video => {
    const scheduledDate = new Date(video.scheduledFor)
    return scheduledDate > now
  })

  saveToStorage()
  saveScheduledToStorage()
}

function addScheduledVideo(newVideo) {
  scheduledVideos.value.unshift({
    ...newVideo,
    scheduledFor: newVideo.scheduledFor,
    status: 'scheduled'
  })
  saveScheduledToStorage()
  return true
}

function getScheduledVideos(userName) {
  return scheduledVideos.value.filter(v => v.author === userName)
}

function deleteScheduledVideo(id) {
  const index = scheduledVideos.value.findIndex(v => v.id === Number(id))
  if (index !== -1) {
    scheduledVideos.value.splice(index, 1)
    saveScheduledToStorage()
    return true
  }
  return false
}

function loadFromStorage() {
  const savedVideos = localStorage.getItem('videos')
  if (savedVideos) {
    videos.value = JSON.parse(savedVideos)
  } else {
    videos.value = [...defaultVideos]
    saveToStorage()
  }
}

function saveToStorage() {
  localStorage.setItem('videos', JSON.stringify(videos.value))
}

function getVideoById(id) {
  return videos.value.find(v => v.id === Number(id))
}

function incrementViews(id) {
  const video = getVideoById(id)
  if (video) {
    video.views += 1
    saveToStorage()
  }
}

function toggleLike(id) {
  const video = getVideoById(id)
  if (!video) return false

  const { hasLiked, toggleLike: toggleUserLike } = useAuth()

  const alreadyLiked = hasLiked(id)

  if (alreadyLiked) {
    video.likes = Math.max(0, video.likes - 1)
  } else {
    video.likes += 1
  }

  toggleUserLike(id)
  saveToStorage()
  return true
}

function addVideo(newVideo) {
  videos.value.unshift(newVideo)
  saveToStorage()
  return true
}

function addComment(videoId, text, userName, userColor) {
  const video = getVideoById(videoId)
  if (video && text.trim()) {
    const newComment = {
      id: Date.now(),
      user: userName,
      userColor: userColor || '#ff0000',
      text: text.trim(),
      time: 'только что'
    }
    video.comments.unshift(newComment)
    saveToStorage()
    return true
  }
  return false
}

function deleteComment(videoId, commentId) {
  const video = getVideoById(videoId)
  if (video) {
    video.comments = video.comments.filter(c => c.id !== commentId)
    saveToStorage()
  }
}

function deleteVideo(videoId) {
  const index = videos.value.findIndex(v => v.id === Number(videoId))
  if (index !== -1) {
    videos.value.splice(index, 1)
    saveToStorage()
    return true
  }
  return false
}

export function useVideos() {
  onMounted(() => {
    loadFromStorage()
    loadScheduledFromStorage()
    publishDueScheduledVideos()

    setInterval(() => {
      publishDueScheduledVideos()
    }, 30000)
  })

  return {
    videos,
    scheduledVideos,
    getVideoById,
    incrementViews,
    toggleLike,
    addVideo,
    addScheduledVideo,
    getScheduledVideos,
    deleteScheduledVideo,
    addComment,
    deleteComment,
    deleteVideo,
  }
}