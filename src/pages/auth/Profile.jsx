import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MyButton from '../../components/UI/MyButton/MyButton';
import MyInput from '../../components/UI/MyInput/MyInput';
import { useAuth } from '../../context/AuthContext';

export default function Profile() {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [errors, setErrors] = useState({ name: '', email: '' });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || ''
      });
    }
  }, [user]);

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: '', email: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Введите ваше имя';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Введите email';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Введите корректный email';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      updateUser({
        name: formData.name.trim(),
        email: formData.email.toLowerCase().trim()
      });
      setIsEditing(false);
    } catch (err) {
      setErrors(prev => ({ ...prev, email: err.message || 'Ошибка сохранения' }));
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    if (user) {
      setFormData({ name: user.name || '', email: user.email || '' });
    }
  };

  const handleLogout = () => {
    if (window.confirm("Выйти из аккаунта?")) {
      logout();
      navigate('/');
    }
  };

  if (!user) return <div style={{ padding: '100px', textAlign: 'center' }}>Загрузка...</div>;

  return (
    <div className="profile-container">
      <h1>Личный кабинет</h1>

      <div className="profile-content">
        <div className="profile-card">
          <h2>Мои данные</h2>

          {isEditing ? (
            <form onSubmit={handleSave} noValidate>
              <MyInput
                label="Имя"
                name="name"
                placeholder="Введите ваше имя"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <p className="error-message">{errors.name}</p>}

              <MyInput
                label="Email"
                type="email"
                name="email"
                placeholder="Введите ваш email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="error-message">{errors.email}</p>}

              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <MyButton type="submit" variant="success" style={{ flex: 1 }}>
                  💾 Сохранить
                </MyButton>
                <MyButton type="button" variant="outline" onClick={cancelEdit} style={{ flex: 1 }}>
                  Отмена
                </MyButton>
              </div>
            </form>
          ) : (
            <div className="profile-info">
              <p><strong>Имя:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Роль:</strong> {user.role === 'admin' ? 'Администратор' : 'Пользователь'}</p>

              <MyButton
                variant="secondary"
                onClick={() => setIsEditing(true)}
                style={{ marginTop: '20px', width: '100%' }}
              >
                ✏️ Редактировать данные
              </MyButton>
            </div>
          )}
        </div>

        <div className="profile-card">
          <h2>История заказов</h2>
          <p>Пока заказов нет.</p>
        </div>
      </div>

      <MyButton
        variant="danger"
        onClick={handleLogout}
        style={{ margin: '50px auto 0', display: 'block', padding: '14px 40px', fontSize: '17px' }}
      >
        Выйти из аккаунта
      </MyButton>
    </div>
  );
}