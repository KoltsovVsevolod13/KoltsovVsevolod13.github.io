import { useNavigate } from 'react-router-dom';
import MyButton from '../components/UI/MyButton/MyButton';
import CartItem from '../components/CartItem';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const navigate = useNavigate();
  const { cart, totalItems, totalPrice, clearCart } = useCart();

  const handleOrder = () => {
    if (cart.length === 0) return;

    alert(`✅ Заказ оформлен! 
Сумма: ${totalPrice} ₽
Спасибо за заказ!`);

    clearCart();
    navigate('/');
  };

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <div className="cart-empty">
          <div className="cart-empty-icon">🛒</div>
          <h2>Ваша корзина пуста</h2>
          <p>Вы ещё ничего не добавили в корзину</p>
          
          <MyButton 
            variant="primary" 
            onClick={() => navigate('/')}
            className="cart-empty-button"
          >
            Выбрать блюда
          </MyButton>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Корзина ({totalItems})</h1>

      <div className="cart-items">
        {cart.map(item => <CartItem key={item.id} item={item} />)}
      </div>

      <div className="cart-summary">
        <div className="total">
          <strong>Итого:</strong>
          <strong>{totalPrice} ₽</strong>
        </div>
        <MyButton 
          variant="success" 
          onClick={handleOrder}
        >
          Оформить заказ
        </MyButton>
      </div>
    </div>
  );
}