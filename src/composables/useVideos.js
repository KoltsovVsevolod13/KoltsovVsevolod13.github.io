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
    description: 'Простой и вкусный рецепт итальянской классики.',
    comments: [
      { id: 201, user: 'Дмитрий', text: 'Сделал по рецепту — получилось очень вкусно!', time: '5 часов назад' },
      { id: 202, user: 'Ольга', text: 'А можно вместо базилика использовать другую зелень?', time: '12 часов назад' }
    ]
  },
  {
    id: 3,
    title: 'Как быстро выучить английский язык — реальные советы',
    url: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_2MB.mp4',
    poster: 'https://picsum.photos/id/201/1280/720',
    author: 'English Easy',
    views: 27400,
    likes: 2150,
    description: 'Методы, которые реально работают.',
    comments: [
      { id: 301, user: 'Иван', text: 'Спасибо! Очень полезные советы', time: '1 день назад' },
      { id: 302, user: 'Кристина', text: 'Практикую каждый день, уже заметен прогресс', time: '18 часов назад' }
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
    description: 'Места, от которых захватывает дух.',
    comments: [
      { id: 401, user: 'Анна', text: 'Бали выглядит просто невероятно!', time: '3 дня назад' }
    ]
  },
  {
    id: 5,
    title: 'Идеальный кофе дома за 5 минут',
    url: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_2MB.mp4',
    poster: 'https://picsum.photos/id/133/1280/720',
    author: 'Coffee Lab',
    views: 15600,
    likes: 645,
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
    description: 'Простая тренировка на каждый день.',
    comments: [
      { id: 601, user: 'Екатерина', text: 'Уже второй день делаю — спина стала ровнее!', time: '7 часов назад' }
    ]
  },
  {
    id: 7,
    title: 'Как снимать красивое видео на смартфон',
    url: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_2MB.mp4',
    poster: 'https://picsum.photos/id/251/1280/720',
    author: 'ФотоМастер',
    views: 9800,
    likes: 720,
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
    description: 'Разбираем странное поведение домашних любимцев.',
    comments: [
      { id: 801, user: 'Виктор', text: 'Мой кот делает точно так же 😂', time: '4 часа назад' },
      { id: 802, user: 'Настя', text: 'Видео огонь! Сохранила', time: '1 день назад' },
      { id: 803, user: 'Артём', text: 'А у меня кот вообще по потолку бегает ночью', time: '14 часов назад' }
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
    description: 'Первый урок для начинающих.',
    comments: [
      { id: 1001, user: 'Саша', text: 'Начал заниматься, уже получается!', time: '6 часов назад' }
    ]
  },
  {
    id: 11,
    title: 'Как сделать крутой монтаж видео на телефоне',
    url: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_2MB.mp4',
    poster: 'https://picsum.photos/id/160/1280/720',
    author: 'ВидеоМастер',
    views: 12400,
    likes: 780,
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
    description: 'Вкусные и полезные идеи на каждый день.',
    comments: [
      { id: 1301, user: 'Юлия', text: 'Очень timely, спасибо!', time: '1 час назад' },
      { id: 1302, user: 'Максим', text: 'Попробовал овсянку по вашему рецепту — огонь!', time: '2 дня назад' }
    ]
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