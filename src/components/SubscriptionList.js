import React, { useState, useEffect } from 'react';
import './SubscriptionList.css';

const SubscriptionList = () => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [showModal, setShowModal] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardNumber: '',
    expiration: '',
    cvv: ''
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const subscriptions = [
    {
      id: 1,
      service: "Basic Subscription",
      serviceInfo: "For one User",
      price: 4.99,
      img: "https://creazilla-store.fra1.digitaloceanspaces.com/icons/3231802/ticket-icon-md.png",
      amount: 1,
    },
    {
      id: 2,
      service: "Gold Subscription",
      serviceInfo: "Share with Family",
      price: 9.99,
      img: "https://creazilla-store.fra1.digitaloceanspaces.com/icons/3237088/ticket-icon-md.png",
      amount: 1,
    },
    {
      id: 3,
      service: "Premium Subscription",
      serviceInfo: "Share with the World",
      price: 12.99,
      img: "https://creazilla-store.fra1.digitaloceanspaces.com/icons/3258730/ticket-icon-md.png",
      amount: 1,
    },
    {
      id: 4,
      service: "Social Media Sharing Subscription",
      serviceInfo: "Share your list",
      price: 2.99,
      img: "https://cdn.creazilla.com/photos/3730387/social-media-1908766_1280-photo-md.jpeg",
      amount: 1,
    },
  ];

  const addToCart = (subscription) => {
    const existingItem = cart.find(item => item.id === subscription.id);

    if (existingItem) {
      setCart(cart.map(item =>
        item.id === subscription.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...subscription, quantity: 1 }]);
    }
  };

  const removeFromCart = (subscriptionId) => {
    setCart(cart.filter(item => item.id !== subscriptionId));
  };

  const updateQuantity = (subscriptionId, quantity) => {
    if (quantity === 0) {
      removeFromCart(subscriptionId);
    } else {
      setCart(cart.map(item =>
        item.id === subscriptionId
          ? { ...item, quantity: quantity }
          : item
      ));
    }
  };

  const handleCheckout = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmOrder = (e) => {
    e.preventDefault();
    alert('Order confirmed!');
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  return (
    <div className="subscription-container">
      <h1 className="subscription-header">Available Subscriptions</h1>
      <div className="subscription-list">
        {subscriptions.map((subscription) => (
          <div className="subscription-item" key={subscription.id}>
            <img src={subscription.img} alt={subscription.service} className="subscription-image" />
            <h3>{subscription.service}</h3>
            <p>{subscription.serviceInfo}</p>
            <p>${subscription.price.toFixed(2)}</p>
            {cart.find(item => item.id === subscription.id) ? (
              <div>
                <button className="subscription-button remove-button" onClick={() => updateQuantity(subscription.id, cart.find(item => item.id === subscription.id).quantity - 1)}>
                  -
                </button>
                <span>{cart.find(item => item.id === subscription.id).quantity}</span>
                <button className="subscription-button add-button" onClick={() => updateQuantity(subscription.id, cart.find(item => item.id === subscription.id).quantity + 1)}>
                  +
                </button>
              </div>
            ) : (
              <button className="subscription-button add-button" onClick={() => addToCart(subscription)}>
                Add to Cart
              </button>
            )}
          </div>
        ))}
      </div>
      {cart.length > 0 && (
        <div className="checkout-bar">
          <span>Total: ${totalAmount}</span>
          <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
        </div>
      )}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Checkout</h2>
              <button className="close-modal" onClick={handleCloseModal}>×</button>
            </div>
            <p>Order Summary:</p>
            <ul>
              {cart.map(item => (
                <li key={item.id}>
                  {item.service} - ${item.price.toFixed(2)} x {item.quantity}
                  <div className="quantity-adjust">
                    <button className="subscription-button remove-button" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button className="subscription-button add-button" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <h3>Total: ${totalAmount}</h3>

            <form onSubmit={handleConfirmOrder}>
              <div className="form-group wide">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={userInfo.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group wide">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={userInfo.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={userInfo.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={userInfo.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>State</label>
                <input
                  type="text"
                  name="state"
                  value={userInfo.state}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>ZIP Code</label>
                <input
                  type="text"
                  name="zip"
                  value={userInfo.zip}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group wide">
                <label>Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={userInfo.cardNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group half">
                <label>Expiration Date</label>
                <input
                  type="text"
                  name="expiration"
                  value={userInfo.expiration}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group half">
                <label>CVV</label>
                <input
                  type="text"
                  name="cvv"
                  value={userInfo.cvv}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="submit">Confirm Order</button>
                <button type="button" onClick={handleCloseModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionList;
