import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MyButton from '../../components/UI/MyButton/MyButton';
import { useAuth } from '../../context/AuthContext';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

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
          <div className="profile-info">
            <p><strong>Имя:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Роль:</strong> {user.role === 'admin' ? 'Администратор' : 'Пользователь'}</p>
          </div>
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