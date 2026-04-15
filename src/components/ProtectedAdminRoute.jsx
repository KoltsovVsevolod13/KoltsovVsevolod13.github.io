import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedAdminRoute({ children }) {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (!isAdmin) {
      navigate('/profile');
    }
  }, [user, isAdmin, navigate]);

  if (!user) return <div style={{ padding: '100px', textAlign: 'center' }}>Загрузка...</div>;

  if (!isAdmin) return null;

  return children;
}