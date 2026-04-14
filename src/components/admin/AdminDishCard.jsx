import MyCard from "../UI/MyCard/MyCard";
import MyButton from "../UI/MyButton/MyButton";
import { getCategoryLabel } from "../../utils/categories";

export default function AdminDishCard({ dish, onEdit, onDelete }) {
  return (
    <MyCard style={{ marginBottom: '14px' }}>
      <div className="admin-dish-card" style={{ boxShadow: 'none', padding: '20px' }}>
        <div className="admin-dish-info">
          <strong>{dish.name}</strong> — {dish.price} ₽
          <p>{dish.desc}</p>
          <small>
            Категория: <strong>
              {getCategoryLabel(dish.category, dish.categoryLabel)}
            </strong>
          </small>
        </div>
        <div className="admin-dish-actions">
          <MyButton variant="secondary" onClick={() => onEdit(dish)}>
            ✏️ Изменить
          </MyButton>
          <MyButton variant="danger" onClick={() => onDelete(dish.id)}>
            🗑️ Удалить
          </MyButton>
        </div>
      </div>
    </MyCard>
  );
}