import MyDishCard from "./UI/MyDishCard/MyDishcard";
import { getCategoryLabel } from "../utils/categories";

export default function DishList({ dishes = [], title }) {
  if (dishes.length === 0) {
    return <p style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '80px 20px', color: '#666' }}>Блюд не найдено</p>;
  }

  return (
    <>
      {title && (
        <div className="section-header">
          <h2>{title}</h2>
        </div>
      )}
      <div className="restaurants-grid">
        {dishes.map(dish => (
          <MyDishCard key={dish.id} dish={dish} />
        ))}
      </div>
    </>
  );
}