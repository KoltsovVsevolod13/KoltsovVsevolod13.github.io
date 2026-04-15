import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div>
          <h3>FoodDelivery</h3>
          <p>Быстрая и вкусная доставка еды по Санкт-Петербургу.</p>
        </div>

        <div>
          <h4>Навигация</h4>
          <p><Link to="/">Главная</Link></p>
          <p><Link to="/cart">Корзина</Link></p>
          <p><Link to="/profile">Личный кабинет</Link></p>
        </div>

        <div>
          <h4>Контакты</h4>
          <p>☎ +7 (999) 123-45-67</p>
          <p>✉ info@fooddelivery.ru</p>
          <p>Санкт-Петербург, ул. Невский пр., 100</p>
        </div>

        <div>
          <h4>Мы в соцсетях</h4>
          <p>Max • VK • Telegram</p>
        </div>
      </div>

      <div className="footer-bottom">
        © 2026 FoodDelivery. Все права защищены.
      </div>
    </footer>
  );
}