import { createContext, useContext, useState, useEffect } from 'react';
import { 
  getCurrentUser, 
  setCurrentUser, 
  removeCurrentUser, 
  getUsers, 
  saveUsers 
} from '../utils/storage';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('Ошибка контекста');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const login = (userData) => {
    setCurrentUser(userData);
    setUser(userData);
  };

  const logout = () => {
    removeCurrentUser();
    setUser(null);
  };

  const register = (newUser) => {
    const existingUsers = getUsers();
    
    const userExists = existingUsers.some(u => 
      u.email.toLowerCase() === newUser.email.toLowerCase()
    );

    if (userExists) throw new Error("Пользователь с таким email уже существует");

    const isAdmin = newUser.email.toLowerCase() === 'admin@food.ru';
    
    const userToSave = {
      ...newUser,
      id: Date.now(),
      role: isAdmin ? 'admin' : 'user'
    };

    existingUsers.push(userToSave);
    saveUsers(existingUsers);
    
    setCurrentUser(userToSave);
    setUser(userToSave);

    return userToSave;
  };

  const updateUser = (newData) => {
    if (!user) return;

    const updatedUser = { ...user, ...newData };

    if (newData.email && newData.email.toLowerCase() !== user.email.toLowerCase()) {
      const users = getUsers();
      const emailExists = users.some(u => 
        u.id !== user.id && u.email.toLowerCase() === newData.email.toLowerCase()
      );
      if (emailExists) throw new Error('Пользователь с таким email уже существует');
    }

    const users = getUsers();
    const index = users.findIndex(u => u.id === user.id);
    if (index !== -1) {
      users[index] = updatedUser;
      saveUsers(users);
    }

    setCurrentUser(updatedUser);
    setUser(updatedUser);
  };

  const value = {
    user,
    login,
    logout,
    register,
    updateUser,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
  };

  if (loading) {
    return <div style={{ padding: '100px', textAlign: 'center' }}>Загрузка...</div>;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};