import { createContext, useContext, useState, useEffect } from 'react';
import { 
  getCart, 
  saveCart, 
  addToCart as addToCartUtil,
  updateCartItemQuantity as updateQuantityUtil,
  removeFromCart as removeFromCartUtil 
} from '../utils/storage';

const CartContext = createContext(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('Ошибка в контексте');
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(getCart());
  }, []);

  useEffect(() => {
    const handleStorageChange = () => setCart(getCart());
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const addToCart = (dish, quantity = 1) => {
    const updatedCart = addToCartUtil(dish, quantity);
    setCart(updatedCart);
  };

  const updateQuantity = (id, newQuantity) => {
    const updatedCart = updateQuantityUtil(id, newQuantity);
    setCart(updatedCart);
  };

  const removeFromCart = (id) => {
    const updatedCart = removeFromCartUtil(id);
    setCart(updatedCart);
  };

  const clearCart = () => {
    saveCart([]);
    setCart([]);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const value = {
    cart,
    totalItems,
    totalPrice,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};