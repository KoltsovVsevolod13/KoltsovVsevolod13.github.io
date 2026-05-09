import { ref } from 'vue'

const videos = ref([
  {
    id: 1,
    title: '10 интересных фактов про слонов',
    url: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_2MB.mp4',
    poster: 'https://picsum.photos/id/1015/1280/720',
    author: 'Познавательный мир',
    views: 45200,
    description: 'Удивительные факты о самых больших наземных животных планеты.'
  },
  {
    id: 2,
    title: 'Как приготовить пиццу Маргариту дома',
    url: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_2MB.mp4',
    poster: 'https://picsum.photos/id/292/1280/720',
    author: 'Кухня с душой',
    views: 31800,
    description: 'Простой и вкусный рецепт итальянской классики.'
  },
  {
    id: 3,
    title: 'Как быстро выучить английский язык',
    url: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_2MB.mp4',
    poster: 'https://picsum.photos/id/201/1280/720',
    author: 'English Easy',
    views: 27400,
    description: 'Реальные советы, которые работают.'
  },
  {
    id: 4,
    title: 'Топ 15 красивых мест в мире',
    url: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_2MB.mp4',
    poster: 'https://picsum.photos/id/1016/1280/720',
    author: 'Путешествия',
    views: 18900,
    description: 'Места, от которых захватывает дух.'
  },
  {
    id: 5,
    title: 'Как сделать идеальный кофе дома',
    url: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_2MB.mp4',
    poster: 'https://picsum.photos/id/133/1280/720',
    author: 'Coffee Lab',
    views: 15600,
    description: 'Секреты приготовления кофе как в кофейне.'
  },
  {
    id: 6,
    title: '5 простых упражнений для осанки',
    url: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_2MB.mp4',
    poster: 'https://picsum.photos/id/180/1280/720',
    author: 'Здоровье каждый день',
    views: 22300,
    description: 'Улучши свою осанку за 10 минут в день.'
  },
  {
    id: 7,
    title: 'Как фотографировать на телефон красиво',
    url: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_2MB.mp4',
    poster: 'https://picsum.photos/id/251/1280/720',
    author: 'ФотоМастер',
    views: 9800,
    description: 'Простые лайфхаки мобильной фотографии.'
  },
  {
    id: 8,
    title: 'Почему коты так странно себя ведут',
    url: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_2MB.mp4',
    poster: 'https://picsum.photos/id/237/1280/720',
    author: 'Кошачий мир',
    views: 41200,
    description: 'Разбираем странное поведение домашних любимцев.'
  }
])

function getVideoById(id) {
  return videos.value.find(v => v.id === Number(id))
}

function incrementViews(id) {
  const video = getVideoById(id)
  if (video) {
    video.views += 1
  }
}

export function useVideos() {
  return {
    videos,
    getVideoById,
    incrementViews
  }
}