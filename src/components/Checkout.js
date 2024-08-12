import React from 'react';
import './Checkout.css';

const Checkout = ({ cartItems }) => {
  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      {cartItems.length > 0 ? (
        <div>
          <h2>Order Summary</h2>
          <ul className="checkout-list">
            {cartItems.map((item) => (
              <li key={item.id} className="checkout-item">
                <img src={item.img} alt={item.service} className="checkout-image" />
                <div>
                  <h3>{item.service}</h3>
                  <p>{item.serviceInfo}</p>
                  <p>Quantity: {item.amount}</p>
                  <p>Price: ${(item.price * item.amount).toFixed(2)}</p>
                </div>
              </li>
            ))}
          </ul>
          <h2>
            Total: $
            {cartItems.reduce((acc, item) => acc + item.price * item.amount, 0).toFixed(2)}
          </h2>
          <button className="checkout-button" onClick={() => alert('Order confirmed!')}>
            Confirm Order
          </button>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Checkout;
