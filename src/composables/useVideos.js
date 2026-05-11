import { ref } from 'vue'

const videos = ref([
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
      { id: 101, user: 'Алексей', text: 'Очень интересное видео! Особенно про память слонов.', time: '2 часа назад' },
      { id: 102, user: 'Мария', text: 'Спасибо, теперь знаю, что слоны действительно умеют плавать 😮', time: '1 день назад' }
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
    comments: []
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
    comments: []
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
    comments: []
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
  },
  {
    id: 11,
    title: 'Как сделать крутой монтаж видео на телефоне',
    url: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_2MB.mp4',
    poster: 'https://picsum.photos/id/160/1280/720',
    author: 'ВидеоМастер',
    views: 12400,
    likes: 780,
    category: 'Фото и видео',
    description: 'Бесплатные приложения и приёмы монтажа.',
    comments: []
  },
  {
    id: 12,
    title: 'Топ 8 самых умных пород собак',
    url: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_2MB.mp4',
    poster: 'https://picsum.photos/id/237/1280/720',
    author: 'Познавательный мир',
    views: 36700,
    likes: 1120,
    category: 'Животные',
    description: 'Какая порода самая умная?',
    comments: []
  },
  {
    id: 13,
    title: 'Простые рецепты завтраков на неделю',
    url: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_2MB.mp4',
    poster: 'https://picsum.photos/id/292/1280/720',
    author: 'Кухня с душой',
    views: 19800,
    likes: 650,
    category: 'Кулинария',
    description: 'Вкусные и полезные идеи на каждый день.',
    comments: []
  }
])

function getVideoById(id) {
  return videos.value.find(v => v.id === Number(id))
}

function incrementViews(id) {
  const video = getVideoById(id)
  if (video) video.views += 1
}

function toggleLike(id) {
  const video = getVideoById(id)
  if (video) video.likes += 1
}

function addComment(videoId, text, userName) {
  const video = getVideoById(videoId)
  if (video && text.trim()) {
    const newComment = {
      id: Date.now(),
      user: userName,
      text: text.trim(),
      time: 'только что'
    }
    video.comments.unshift(newComment)
    return true
  }
  return false
}

function deleteComment(videoId, commentId) {
  const video = getVideoById(videoId)
  if (video) {
    video.comments = video.comments.filter(c => c.id !== commentId)
  }
}

export function useVideos() {
  return {
    videos,
    getVideoById,
    incrementViews,
    toggleLike,
    addComment,
    deleteComment
  }
}