import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MyButton from '../components/UI/MyButton/MyButton';
import { getRestaurants } from '../utils/storage';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function DishDetail() {
  const { restaurantId, dishId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const [dish, setDish] = useState(null);
  const [restaurant, setRestaurant] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const restaurants = getRestaurants();
    const foundRestaurant = restaurants[restaurantId];

    if (foundRestaurant) {
      setRestaurant(foundRestaurant);
      const foundDish = foundRestaurant.menu.find(item => item.id === parseInt(dishId));
      if (foundDish) setDish(foundDish);
    }
  }, [restaurantId, dishId]);

  const handleAddToCart = () => {
    if (!dish) return;
    addToCart(dish, quantity);
  };

  if (!dish || !restaurant) {
    return (
      <div className="not-found">
        <h2>Блюдо не найдено</h2>
        <MyButton variant="outline" onClick={() => navigate('/')}>Назад</MyButton>
      </div>
    );
  }

  return (
    <div className="dish-detail-container">
      <MyButton variant="outline" onClick={() => navigate('/')}>Назад</MyButton>

      <div className="dish-detail-content">
        <div className="dish-detail-image">
          <img 
            src={dish.image} 
            alt={dish.name}
          />
        </div>

        <div className="dish-detail-info">
          <h1>{dish.name}</h1>
          <p className="dish-detail-price">{dish.price} ₽</p>

          <p className="dish-detail-desc">
            {dish.desc || 'Подробное описание блюда появится позже.'}
          </p>

          <div className="quantity-section">
            <strong>Количество:</strong>
            <div className="quantity-controls">
              <MyButton 
                variant="outline" 
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
              >
                −
              </MyButton>
              <span className="quantity-value">{quantity}</span>
              <MyButton 
                variant="outline" 
                onClick={() => setQuantity(q => q + 1)}
              >
                +
              </MyButton>
            </div>
          </div>

          {user ? (
            <MyButton 
              variant="success" 
              onClick={handleAddToCart}
              className="add-to-cart-btn"
            >
              Добавить в корзину — {dish.price * quantity} ₽
            </MyButton>
          ) : (
            <p className="login-required">
              Чтобы добавить блюдо в корзину — войдите в аккаунт
            </p>
          )}
        </div>
      </div>
    </div>
  );
}