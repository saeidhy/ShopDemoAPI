import React, { useContext, createContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      setItems(JSON.parse(savedCartItems));  // Load cart items from localStorage
    }
  }, []);  // Empty dependency array ensures this runs only once when the component mounts

  // Save cart items to localStorage when items change
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem('cartItems', JSON.stringify(items)); // Persist cart items to localStorage
    }
  }, [items]);  // This useEffect runs whenever the 'items' state changes

  const addToCart = (product) => {
    setItems([...items, product]); // Add product to cart
  };

  const removeFromCart = (id) => {
    setItems(items.filter(item => item.id !== id)); // Remove product from cart
  };

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
