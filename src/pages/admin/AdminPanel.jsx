import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getRestaurants, saveRestaurants } from '../../utils/storage';
import AdminDishCard from '../../components/admin/AdminDishCard';
import DishForm from '../../components/admin/DishForm';
import MySelect from '../../components/UI/MySelect/MySelect';

export default function AdminPanel() {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [restaurants, setRestaurants] = useState({});
  const [selectedRestaurantId, setSelectedRestaurantId] = useState('');
  const [newDish, setNewDish] = useState({
    name: '',
    desc: '',
    price: '',
    category: 'pizza',
    image: ''
  });
  const [editingDish, setEditingDish] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user || !isAdmin) navigate('/login');
  }, [user, isAdmin, navigate]);

  useEffect(() => {
    setRestaurants(getRestaurants());
  }, []);

  const handleSave = (updated) => {
    setRestaurants(updated);
    saveRestaurants(updated);
    setError('');
  };

  const addDish = (dishToSave) => {
    if (!selectedRestaurantId) {
      setError('Выберите ресторан');
      return;
    }

    if (!dishToSave.name.trim()) {
      setError('Введите название блюда');
      return;
    }

    if (!dishToSave.price || Number(dishToSave.price) <= 0) {
      setError('Введите корректную цену');
      return;
    }

    const dishToAdd = {
      id: Date.now(),
      name: dishToSave.name.trim(),
      desc: dishToSave.desc.trim(),
      price: Number(dishToSave.price),
      category: dishToSave.category,
      image: dishToSave.image.trim() || "https://upload.wikimedia.org/wikipedia/commons/3/3d/%D0%9D%D0%B5%D1%82_%D0%B8%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F.jpg"
    };

    const updated = { ...restaurants };
    if (!updated[selectedRestaurantId]) {
      updated[selectedRestaurantId] = {
        id: Number(selectedRestaurantId),
        name: "Ресторан",
        menu: []
      };
    }

    updated[selectedRestaurantId].menu.push(dishToAdd);
    handleSave(updated);

    setNewDish({
      name: '',
      desc: '',
      price: '',
      category: 'pizza',
      image: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/%D0%9D%D0%B5%D1%82_%D0%B8%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F.jpg'
    });
    setError('');
  };

  const startEdit = (dish) => {
    setEditingDish(dish);
    setNewDish({
      name: dish.name,
      desc: dish.desc || '',
      price: dish.price.toString(),
      category: dish.category,
      image: dish.image
    });
    setError('');
  };

  const saveEdit = (dishToSave) => {
    if (!editingDish || !selectedRestaurantId) return;

    if (!dishToSave.name.trim()) {
      setError('Введите название блюда');
      return;
    }

    if (!dishToSave.price || Number(dishToSave.price) <= 0) {
      setError('Введите корректную цену');
      return;
    }

    const updated = { ...restaurants };
    const menu = updated[selectedRestaurantId].menu;
    const index = menu.findIndex(d => d.id === editingDish.id);

    if (index !== -1) {
      menu[index] = {
        ...menu[index],
        name: dishToSave.name.trim(),
        desc: dishToSave.desc.trim(),
        price: Number(dishToSave.price),
        category: dishToSave.category,
        image: dishToSave.image || menu[index].image
      };
    }

    handleSave(updated);
    setEditingDish(null);
    setNewDish({
      name: '',
      desc: '',
      price: '',
      category: 'pizza',
      image: ''
    });
    setError('');
  };

  const deleteDish = (dishId) => {
    if (!window.confirm("Удалить это блюдо навсегда?")) return;

    const updated = { ...restaurants };
    updated[selectedRestaurantId].menu =
      updated[selectedRestaurantId].menu.filter(d => d.id !== dishId);

    handleSave(updated);
  };

  const currentRestaurant = selectedRestaurantId
    ? restaurants[selectedRestaurantId]
    : null;

  return (
    <div className="admin-container">
      <h1>⚙️ Админ-панель</h1>
      <p>Вы вошли как: <strong>{user.name}</strong></p>

      <div className="admin-select">
        <MySelect
          label="Ресторан"
          value={selectedRestaurantId}
          onChange={(e) => {
            setSelectedRestaurantId(e.target.value);
            setError('');
          }}
          options={[
            { value: '', label: '— Выберите ресторан —' },
            ...Object.values(restaurants).map((r) => ({
              value: r.id,
              label: r.name
            }))
          ]}
        />
      </div>

      {error && <p className="error-message">{error}</p>}

      {currentRestaurant && (
        <>
          <h2>Меню: {currentRestaurant.name}</h2>

          <div style={{ marginBottom: '40px' }}>
            {currentRestaurant.menu.map(dish => (
              <AdminDishCard
                key={dish.id}
                dish={dish}
                onEdit={startEdit}
                onDelete={deleteDish}
              />
            ))}
          </div>

          <h3>
            {editingDish ? 'Редактировать блюдо' : 'Добавить новое блюдо'}
          </h3>

          <DishForm
            dishData={newDish}
            onChange={setNewDish}
            onSave={editingDish ? saveEdit : addDish}
            onCancel={() => {
              setEditingDish(null);
              setNewDish({
                name: '',
                desc: '',
                price: '',
                category: 'pizza',
                image: ''
              });
              setError('');
            }}
            isEditing={!!editingDish}
          />
        </>
      )}
    </div>
  );
}