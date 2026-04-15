import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import MyButton from '../../components/UI/MyButton/MyButton';
import MyInput from '../../components/UI/MyInput/MyInput';
import { useAuth } from '../../context/AuthContext';

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
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
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    };

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

    if (!formData.password) {
      newErrors.password = 'Придумайте пароль';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен содержать минимум 6 символов';
      isValid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Повторите пароль';
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const newUserData = {
        name: formData.name.trim(),
        email: formData.email.toLowerCase().trim(),
        password: formData.password
      };

      register(newUserData);
      navigate('/profile');
    } catch (err) {
      setErrors(prev => ({ ...prev, email: err.message || 'Ошибка регистрации' }));
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Регистрация</h1>

        <form onSubmit={handleRegister} noValidate>
          <MyInput
            type="text"
            name="name"
            label="Имя"
            placeholder="Введите ваше имя"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error-message">{errors.name}</p>}

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
            placeholder="Придумайте пароль"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error-message">{errors.password}</p>}

          <MyInput
            type="password"
            name="confirmPassword"
            label="Повторите пароль"
            placeholder="Повторите пароль"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}

          <MyButton 
            type="submit" 
            variant="primary" 
            style={{ width: '100%', marginTop: '20px' }}
          >
            Зарегистрироваться
          </MyButton>
        </form>

        <p style={{ marginTop: '20px', textAlign: 'center' }}>
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </p>

        <p style={{ fontSize: '14px', color: '#666', marginTop: '15px', textAlign: 'center' }}>
          Для админа: admin@food.ru / любой пароль
        </p>
      </div>
    </div>
  );
}