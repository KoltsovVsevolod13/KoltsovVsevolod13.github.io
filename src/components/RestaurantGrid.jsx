import MyRestaurantCard from './UI/MyRestaurantCard/MyRestaurantCard';

export default function RestaurantGrid({ restaurants = [], title = "Рестораны" }) {
  if (restaurants.length === 0) {
    return <p style={{ textAlign: 'center', padding: '80px 20px', color: '#666' }}>Рестораны не найдены</p>;
  }

  return (
    <>
      <div className="section-header">
        <h2>{title}</h2>
      </div>
      <div className="restaurants-grid">
        {restaurants.map(restaurant => (
          <MyRestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </>
  );
}