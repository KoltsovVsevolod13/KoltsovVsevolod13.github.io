import { NavLink } from 'react-router-dom';
import MyButton from './UI/MyButton/MyButton';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();

  const handleLogout = () => {
    if (window.confirm('Выйти из аккаунта?')) {
      logout();
      window.location.href = '/';
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="logo">
          FoodDelivery
        </NavLink>

        <div className="nav-links">
          {user ? (
            <>
              <NavLink 
                to="/cart"
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              >
                🛒 Корзина {totalItems > 0 && `(${totalItems})`}
              </NavLink>

              <NavLink 
                to="/profile"
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              >
                👤 Профиль
              </NavLink>

              {user.role === 'admin' && (
                <NavLink 
                  to="/admin"
                  className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                >
                  ⚙️ Админка
                </NavLink>
              )}

              <MyButton variant="danger" onClick={handleLogout}>
                Выйти
              </MyButton>
            </>
          ) : (
            <>
              <NavLink to="/login" className="nav-link">Войти</NavLink>
              <NavLink to="/register" className="nav-link">Регистрация</NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}