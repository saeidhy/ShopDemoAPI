import React from 'react';
import { ShoppingCartIcon } from '@heroicons/react/solid'; // Ensure this is the right icon library
import { useSelector } from 'react-redux'; // Import useSelector to get cart data from Redux
import styles from './styles.module.css';

const CartButton = () => {
  const cartItems = useSelector((state) => state.cart.cartItems); // Get cart items from Redux
  const cartItemCount = cartItems.length; // Calculate the total number of items in the cart

  return (
    <div className={styles.cartButton}>
      <ShoppingCartIcon className={styles.shoppingCartIcon} />
      {cartItemCount > 0 && (
        <div className={styles.cartCount}>{cartItemCount}</div>
      )}
    </div>
  );
};

export default CartButton;
