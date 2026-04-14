import { initialRestaurants } from '../data/initialData';

// Пользователь
export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const setCurrentUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const removeCurrentUser = () => {
  localStorage.removeItem('user');
};

// Корзина
export const getCart = () => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

export const saveCart = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

export const addToCart = (dish, quantity = 1) => {
  const cart = getCart();
  const existingIndex = cart.findIndex(item => item.id === dish.id);

  if (existingIndex !== -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({ ...dish, quantity });
  }

  saveCart(cart);
  return cart;
};

export const updateCartItemQuantity = (id, newQuantity) => {
  if (newQuantity < 1) return getCart();
  
  const cart = getCart();
  const updatedCart = cart.map(item =>
    item.id === id ? { ...item, quantity: newQuantity } : item
  );
  
  saveCart(updatedCart);
  return updatedCart;
};

export const removeFromCart = (id) => {
  const cart = getCart();
  const updatedCart = cart.filter(item => item.id !== id);
  saveCart(updatedCart);
  return updatedCart;
};

// Рестораны
export const getRestaurants = () => {
  let saved = localStorage.getItem('restaurants');
  
  if (!saved) {
    localStorage.setItem('restaurants', JSON.stringify(initialRestaurants));
    return initialRestaurants;
  }
  
  return JSON.parse(saved);
};

export const saveRestaurants = (restaurants) => {
  localStorage.setItem('restaurants', JSON.stringify(restaurants));
};

// Пользователи
export const getUsers = () => {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
};

export const saveUsers = (users) => {
  localStorage.setItem('users', JSON.stringify(users));
};