import { useState, useEffect } from 'react';
import RestaurantGrid from '../components/RestaurantGrid';
import DishList from '../components/DishList';
import { getRestaurants } from '../utils/storage';

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [popularDishes, setPopularDishes] = useState([]);

  useEffect(() => {
    const data = getRestaurants();

    const restaurantList = Object.values(data).map(r => ({
      id: r.id,
      name: r.name,
      description: r.description,
      time: r.time,
      price: r.price,
      image: r.image
    }));

    let allDishes = [];
    Object.values(data).forEach(rest => {
      if (rest.menu) {
        const withRest = rest.menu.map(dish => ({
          ...dish,
          restaurantId: rest.id,
          restaurantName: rest.name
        }));
        allDishes = [...allDishes, ...withRest];
      }
    });

    setRestaurants(restaurantList);
    setPopularDishes(allDishes.slice(0, 8));
  }, []);

  return (
    <div>
      <section className="hero">
        <div className="hero-content">
          <h1>Доставка1 еды по Санкт-Петербургу</h1>
          <p>Заказывай любимую еду из лучших ресторанов города</p>
          <button 
            className="hero-button" 
            onClick={() => document.getElementById('restaurants-section')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Выбрать ресторан
          </button>
        </div>
      </section>

      <section id="restaurants-section" className="restaurants-section">
        <RestaurantGrid restaurants={restaurants} />
      </section>

      <section className="popular-dishes-section" style={{ padding: '60px 24px' }}>
        <DishList dishes={popularDishes} title="Популярные блюда" />
      </section>
    </div>
  );
}