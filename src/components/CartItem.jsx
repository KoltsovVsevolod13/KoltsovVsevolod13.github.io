import { useCart } from "../context/CartContext";

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="cart-item">
      <img 
        src={item.image} 
        alt={item.name} 
        className="cart-item-image" 
      />
      
      <div className="cart-item-info">
        <h3>{item.name}</h3>
        <p>{item.desc || ''}</p>
        <div className="cart-item-price">{item.price} ₽ за шт</div>
      </div>

      <div className="cart-item-controls">
        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
      </div>

      <div className="cart-item-total">
        {item.price * item.quantity} ₽
      </div>

      <button 
        className="remove-btn" 
        onClick={() => removeFromCart(item.id)}
      >
        ✕
      </button>
    </div>
  );
}