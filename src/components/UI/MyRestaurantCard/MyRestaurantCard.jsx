import { useNavigate } from 'react-router-dom';
import MyCard from '../MyCard/MyCard';
import MyButton from '../MyButton/MyButton';
import styles from './MyRestaurantCard.module.css';

export default function MyRestaurantCard({ restaurant }) {
  const navigate = useNavigate();

  const navigateToRestaurant = () => {
    navigate(`/restaurant/${restaurant.id}`);
  };

  return (
      <MyCard onClick={navigateToRestaurant}>
        <img 
          src={restaurant.image} 
          alt={restaurant.name}
          className={styles.restaurantImage}
        />
        <div className={styles.restaurantInfo}>
          <h3 className={styles.restaurantTitle}>{restaurant.name}</h3>
          <p className={styles.restaurantDescription}>{restaurant.description}</p>
          <p className={styles.deliveryInfo}>
            {restaurant.time} • {restaurant.price}
          </p>
          
          <MyButton 
            variant="primary" 
            onClick={(e) => { 
              e.stopPropagation(); 
              navigateToRestaurant(); 
            }}
            style={{ width: '100%', marginTop: '12px' }}
          >
            Смотреть меню
          </MyButton>
        </div>
      </MyCard>
  );
}