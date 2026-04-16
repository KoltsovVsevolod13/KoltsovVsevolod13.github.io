import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import MyButton from '../../components/UI/MyButton/MyButton';
import MyInput from '../../components/UI/MyInput/MyInput';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: '',
      password: ''
    };

    if (!formData.email.trim()) {
      newErrors.email = 'Введите email';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Введите пароль';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');

      const foundUser = users.find(user => 
        user.email.toLowerCase() === formData.email.toLowerCase().trim() && 
        user.password === formData.password
      );

      if (foundUser) {
        login(foundUser);
        navigate('/profile');
      } else {
        setErrors(prev => ({ ...prev, password: 'Неверный email или пароль' }));
      }
    } catch (err) {
      setErrors(prev => ({ ...prev, email: 'Произошла ошибка при входе' }));
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Вход в аккаунт</h1>

        <form onSubmit={handleLogin} noValidate>
          <MyInput
            type="email"
            name="email"
            label="Email"
            placeholder="Введите ваш email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}

          <MyInput
            type="password"
            name="password"
            label="Пароль"
            placeholder="Введите пароль"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error-message">{errors.password}</p>}

          <MyButton 
            type="submit" 
            variant="primary" 
            style={{ width: '100%', marginTop: '20px' }}
          >
            Войти
          </MyButton>
        </form>

        <p style={{ marginTop: '20px', textAlign: 'center' }}>
          Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
        </p>
      </div>
    </div>
  );
}