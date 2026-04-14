export const initialRestaurants = {
  1: {
    id: 1,
    name: "Пицца Италия",
    image: "https://baking-academy.ru/upload/resize_cache/iblock/f9d/720_1060_1/f9df39e004c15247b2be6711bc3ec6dc.jpg",
    description: "Пицца • Итальянская кухня",
    time: "25–35 мин",
    price: "от 399 ₽",
    menu: [
      { id: 101, category: 'pizza', name: "Маргарита", desc: "Томатный соус, моцарелла, свежий базилик", price: 450, image: "https://the-cafe.ru/wp-content/uploads/2020/11/147c3814bbb34a77afdbc66e9ef20ed7_584x584.jpeg" },
      { id: 102, category: 'pizza', name: "Пепперони", desc: "Острая колбаса пепперони, моцарелла", price: 520, image: "https://tashirpizza.ru/images/products/334-1473.png" },
      { id: 103, category: 'pizza', name: "Четыре сыра", desc: "Моцарелла, пармезан, горгонзола, чеддер", price: 580, image: "https://roll-club.od.ua/wp-content/uploads/2023/12/5-900x600.jpg" },
      { id: 104, category: 'pizza', name: "Гавайская", desc: "Курица, ананас, моцарелла", price: 490, image: "https://europapizza.ru/image/cache/catalog/PIZZA/KARAMELNIJANANAS-840x840.webp" },
      { id: 105, category: 'pizza', name: "Мясная", desc: "Говядина, бекон, колбаса, моцарелла", price: 620, image: "https://lavera-pizza.ru/wp-content/uploads/2019/09/vid-sverhu1.jpg" },
      { id: 201, category: 'snacks', name: "Куриные крылышки", desc: "8 шт с соусом барбекю", price: 390, image: "https://www.rp.ru/img/eq/iterma/koptilni/krylo.jpg" },
      { id: 202, category: 'snacks', name: "Сырные палочки", desc: "6 шт с соусом ранч", price: 320, image: "https://sushimania-tomsk.ru/__/images/menuProduct/6549edfc9fbe2_w900_jpg.webp" },
      { id: 301, category: 'drinks', name: "Кока-Кола 0.5л", desc: "", price: 120, image: "https://www.waterbaikal.ru/image/cache/catalog/soki-napitki/limonad/coca-cola/coca-cola-033-poland-768x576.jpeg" },
      { id: 302, category: 'drinks', name: "Спрайт 0.5л", desc: "", price: 120, image: "https://reddragon-spb.ru/wa-data/public/shop/products/55/98/9855/images/23754/23754.970.jpg" }
    ]
  },

  2: {
    id: 2,
    name: "Burger King",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Burger_King_2020.svg",
    description: "Бургеры • Фастфуд",
    time: "20–30 мин",
    price: "от 299 ₽",
    menu: [
      { id: 401, category: 'burgers', name: "Воппер", desc: "Говядина, салат, томаты, соус", price: 320, image: "https://burgerkings.ru/image/cache/catalog/photo/685905510-vopper-600x600.jpg" },
      { id: 402, category: 'burgers', name: "Чизбургер", desc: "Говядина, сыр, огурцы, кетчуп", price: 280, image: "https://mcdonaldsmenu.ru/image/cache/catalog/photo/878730190-chizburger-600x600.jpg" },
      { id: 403, category: 'burgers', name: "Двойной Воппер", desc: "Две котлеты, сыр, бекон", price: 450, image: "https://burgerkings.ru/image/cache/catalog/photo/823075508-dvojnoj-vopper-600x600.jpg" },
      { id: 404, category: 'burgers', name: "Куриный Бургер", desc: "Куриная котлета, салат", price: 290, image: "https://main-cdn.sbermegamarket.ru/big1/hlr-system/922/378/572/610/7/100053550056b0.jpg" },
      { id: 501, category: 'sides', name: "Картофель фри", desc: "Средняя порция", price: 150, image: "https://kraftandpaper.ru/wp-content/uploads/2020/upakovka-dlya-kartofelya-fri/upakovka-dlya-kartofelya-fri-main.jpg" },
      { id: 502, category: 'sides', name: "Кольца лука", desc: "8 шт", price: 180, image: "https://burgerkings.ru/image/cache/catalog/photo/245170840-lukovye-kolechki-600x600.jpg" },
      { id: 601, category: 'drinks', name: "Кока-Кола 0.5л", desc: "", price: 120, image: "https://www.coca-cola.com/content/dam/onexp/by/be/brands/coca-cola/by-coca-cola-classic-2025.jpg" }
    ]
  },

  3: {
    id: 3,
    name: "Суши Весла",
    image: "https://oblaka-tc.ru/assets/cache_image/template/img/shops/sushivyosla-logo-na-sajt_528x434_8ea.jpg",
    description: "Суши • Роллы • Японская кухня",
    time: "30–40 мин",
    price: "от 450 ₽",
    menu: [
      { id: 701, category: 'rolls', name: "Филадельфия", desc: "Лосось, сливочный сыр, огурец", price: 590, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf95_1u6GJVV5li20jBPlUqrfUDpthENjm8A&s" },
      { id: 702, category: 'rolls', name: "Калифорния", desc: "Краб, авокадо, огурец", price: 520, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBjDvWiJz4mLF-Pdne0qbzSl9xFhCCgYLNEg&s" },
      { id: 703, category: 'rolls', name: "Темпура с креветкой", desc: "Креветка в темпуре", price: 650, image: "https://www.yaponamatrena.ru/upload/iblock/f98/f98e98c932f22c92686e2e444fe417f8.jpg" },
      { id: 704, category: 'rolls', name: "Спайси тунец", desc: "Тунец, острый соус", price: 570, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpOUuI5h9qqpPUUriAA0qsLYzFQ_lKyKc9xA&s" },
      { id: 801, category: 'sushi', name: "Нигири с лососем", desc: "1 шт", price: 180, image: "https://katanasushi.md/public/products/thumbs/version_0x0x0/4d9d817e306ab330e9a357717cf9ca7d.jpg" },
      { id: 802, category: 'sushi', name: "Нигири с угрём", desc: "1 шт", price: 210, image: "https://sushitime.club/image/sushitime/cache/catalog/n-ugor-1000x700.png?v=1744696787" },
      { id: 901, category: 'drinks', name: "Зелёный чай", desc: "", price: 90, image: "https://www.potrebitel66.ru/upload/novosti/1200-ed4-wide.jpg" },
      { id: 902, category: 'drinks', name: "Кока-Кола 0.5л", desc: "", price: 120, image: "https://main-cdn.sbermegamarket.ru/big1/hlr-system/100/739/941/611/251/86/100045462769b0.jpg" }
    ]
  }
};