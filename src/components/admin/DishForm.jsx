import MyInput from "../UI/MyInput/MyInput";
import MyButton from "../UI/MyButton/MyButton";
import { allCategories, addNewCategory} from "../../utils/categories";
import { useState, useEffect } from "react";

export default function DishForm({ 
  dishData, 
  onChange, 
  onSave, 
  onCancel, 
  isEditing 
}) {
  const [errors, setErrors] = useState({
    name: '',
    price: ''
  });

  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategoryValue, setNewCategoryValue] = useState('');
  const [newCategoryLabel, setNewCategoryLabel] = useState('');
  const [categories, setCategories] = useState(allCategories);

  useEffect(() => {
    setCategories([...allCategories]);
  }, []);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: '',
      price: ''
    };

    if (!dishData.name.trim()) {
      newErrors.name = 'Введите название блюда';
      isValid = false;
    }

    if (!dishData.price || Number(dishData.price) <= 0) {
      newErrors.price = 'Введите корректную цену';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }

    let finalDishData = { ...dishData };

    if (showNewCategory && newCategoryValue.trim()) {
      const newCatValue = newCategoryValue.trim().toLowerCase().replace(/\s+/g, '');
      const newCatLabel = newCategoryLabel.trim() || newCatValue;

      finalDishData.category = newCatValue;
      finalDishData.categoryLabel = newCatLabel;
      addNewCategory(newCatValue, newCatLabel);
      setCategories([...allCategories]);
    }

    onSave(finalDishData);
    setErrors({ name: '', price: '' });
    setShowNewCategory(false);
    setNewCategoryValue('');
    setNewCategoryLabel('');
  };

  const handleChange = (newData) => {
    onChange(newData);

    const field = Object.keys(newData).find(key => newData[key] !== dishData[key]);
    if (field && errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="admin-form">
      <MyInput
        label="Название блюда *"
        type="text"
        placeholder="Название блюда"
        value={dishData.name}
        onChange={e => handleChange({ ...dishData, name: e.target.value })}
      />
      {errors.name && <p className="error-message">{errors.name}</p>}

      <MyInput
        label="Описание"
        type="text"
        placeholder="Краткое описание"
        value={dishData.desc}
        onChange={e => handleChange({ ...dishData, desc: e.target.value })}
      />

      <MyInput
        label="Цена *"
        type="number"
        placeholder="Цена в рублях"
        value={dishData.price}
        onChange={e => handleChange({ ...dishData, price: e.target.value })}
      />
      {errors.price && <p className="error-message">{errors.price}</p>}

      <div style={{ marginBottom: '14px' }}>
        <label>Категория</label>
        
        {!showNewCategory ? (
          <select 
            value={dishData.category} 
            onChange={e => handleChange({ ...dishData, category: e.target.value })}
            style={{ width: '100%', padding: '13px 15px', borderRadius: '8px', border: '1px solid #ddd' }}
          >
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        ) : (
          <>
            <MyInput
              label="Название категории (на английском, для кода)"
              type="text"
              placeholder="Например: pasta"
              value={newCategoryValue}
              onChange={e => setNewCategoryValue(e.target.value)}
            />
            <MyInput
              label="Название категории на русском (для отображения)"
              type="text"
              placeholder="Например: Паста"
              value={newCategoryLabel}
              onChange={e => setNewCategoryLabel(e.target.value)}
            />
          </>
        )}

        {showNewCategory && (
          <MyButton 
            variant="outline" 
            onClick={() => setShowNewCategory(false)}
            style={{ marginTop: '10px' }}
          >
            Отмена
          </MyButton>
        )}
      </div>

      <MyInput
        label="Ссылка на изображение"
        type="text"
        placeholder="https://..."
        value={dishData.image}
        onChange={e => handleChange({ ...dishData, image: e.target.value })}
      />

      <div className="form-buttons">
        <MyButton variant="success" onClick={handleSave}>
          {isEditing ? '💾 Сохранить изменения' : '➕ Добавить блюдо'}
        </MyButton>
        
        {isEditing && (
          <MyButton variant="outline" onClick={onCancel}>
            Отмена
          </MyButton>
        )}

        {!showNewCategory && (
          <MyButton 
            variant="secondary" 
            onClick={() => setShowNewCategory(true)}
          >
            + Новая категория
          </MyButton>
        )}
      </div>
    </div>
  );
}