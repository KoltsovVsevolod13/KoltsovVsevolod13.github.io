import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import { useAuth } from '../../../context/AuthContext';
import MyCard from '../MyCard/MyCard';
import MyButton from '../MyButton/MyButton';

export default function MyDishCard({ dish }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(dish);
  };

  return (
    <MyCard 
      className="dish-card"
      onClick={() => navigate(`/restaurant/${dish.restaurantId}/dish/${dish.id}`)}
    >
      <img 
        src={dish.image} 
        alt={dish.name}
        className="dishImage"
      />
      <div className="dishInfo">
        <h3 className="dishTitle">{dish.name}</h3>
        {dish.restaurantName && (
          <p className="dishRestaurant">{dish.restaurantName}</p>
        )}
        <p className="dishPrice">{dish.price} ₽</p>

        <div className="dishButtons">
          {user && (
            <MyButton 
              variant="success" 
              onClick={handleAddToCart}
            >
              + В корзину
            </MyButton>
          )}

          <MyButton 
            variant="secondary" 
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/restaurant/${dish.restaurantId}/dish/${dish.id}`);
            }}
          >
            Подробнее
          </MyButton>
        </div>
      </div>
    </MyCard>
  );
}