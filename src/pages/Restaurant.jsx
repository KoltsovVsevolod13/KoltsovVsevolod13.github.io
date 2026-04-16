import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MyButton from '../components/UI/MyButton/MyButton';
import CategoryFilter from '../components/CategoryFilter';
import DishList from '../components/DishList';
import { getRestaurants } from '../utils/storage';
import { getCategoryLabel } from '../utils/categories';
import NotFound from './NotFound';

export default function Restaurant() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [restaurant, setRestaurant] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    const restaurants = getRestaurants();
    const foundRestaurant = restaurants[id];

    if (foundRestaurant) {
      setRestaurant(foundRestaurant);
    } else {
      return;
    }
  }, [id, navigate]);

  if (!restaurant) {
    return <NotFound />;
  }

  const filteredMenu = activeCategory
    ? restaurant.menu.filter(item => item.category === activeCategory)
    : restaurant.menu || [];

  const dishes = filteredMenu.map(item => ({
    ...item,
    restaurantId: restaurant.id,
    restaurantName: restaurant.name
  }));

  let sectionTitle = "Меню";
  if (activeCategory) {
    const exampleDish = restaurant.menu.find(item => item.category === activeCategory);
    sectionTitle = getCategoryLabel(activeCategory, exampleDish?.categoryLabel);
  }

  return (
    <div>
      <div className="restaurant-hero">
        <img 
          src={restaurant.image}
          alt={restaurant.name}
          className="restaurant-hero-image"
        />
        <div className="restaurant-hero-overlay">
          <MyButton variant="outline" onClick={() => navigate('/')}>Назад</MyButton>
        </div>
      </div>

      <div className="restaurant-info">
        <div className="restaurant-header">
          <h1>{restaurant.name}</h1>
          <div className="restaurant-meta">
            <span>⭐ 4.7</span>
            <span>• {restaurant.time || '25–40 мин'}</span>
            <span>• {restaurant.price || 'от 300 ₽'}</span>
          </div>
          <p className="restaurant-description">
            {restaurant.description || 'Лучшие блюда по доступным ценам.'}
          </p>
        </div>
      </div>

      <div className="menu-container">
        <CategoryFilter 
          menu={restaurant.menu || []} 
          onCategoryChange={setActiveCategory} 
        />

        <DishList 
          dishes={dishes} 
          title={sectionTitle} 
        />
      </div>
    </div>
  );
}