import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import StreamList from './components/StreamList';
import SubscriptionList from './components/SubscriptionList';
import Checkout from './components/Checkout';
import Movies from './components/Movies';
import About from './components/About';
import MovieSearch from './components/MovieSearch'; // Importing the MovieSearch component

const App = () => {
  const [cartItems, setCartItems] = useState(() => {
    // Retrieve cart items from localStorage on initial load
    const savedCartItems = localStorage.getItem('cartItems');
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  useEffect(() => {
    // Save cart items to localStorage whenever it changes
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((cartItem) => cartItem.id === item.id);
      if (itemExists) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, amount: cartItem.amount + 1 } : cartItem
        );
      } else {
        return [...prevItems, { ...item, amount: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<StreamList />} />
        <Route
          path="/cart"
          element={
            <SubscriptionList
              cartItems={cartItems}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
          }
        />
        <Route path="/checkout" element={<Checkout cartItems={cartItems} />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<MovieSearch />} /> {/* New route for MovieSearch */}
      </Routes>
    </Router>
  );
};

export default App;
