import { useNavigate } from 'react-router-dom';
import MyButton from '../components/UI/MyButton/MyButton';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '80px', textAlign: 'center' }}>
      <h1>404 — Страница не найдена</h1>
      <p>К сожалению, такой страницы не существует.</p>
      <MyButton variant="outline" onClick={() => navigate('/')}>Назад</MyButton>
    </div>
  );
}