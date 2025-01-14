import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart } from '../../redux/actions/cartActions';
import styles from './CartComponent.module.css'; // Ensure this path is correct

const CartComponent = () => {
  const cartItems = useSelector(state => state.cart.cartItems) || []; // Added fallback to ensure no errors
  const dispatch = useDispatch();

  return (
    <div className={styles.cartContainer}>
      {cartItems.length > 0 ? (
        cartItems.map(item => (
          <div key={item.id} className={styles.cartItem}>
            <img 
              src={item.imageUrl || "/placeholder.png"} // Fallback image
              alt={item.title} 
              className={styles.cartImage} 
            />
            <div className={styles.cartDetails}>
              <Link to={`/product/${item.id}`} className={styles.cartTitle}>
                {item.title}
              </Link>
              <p className={styles.cartPrice}>${item.price ? item.price.toFixed(2) : '0.00'}</p> {/* Safe check for price */}
              <button 
                onClick={() => dispatch(removeFromCart(item.id))} 
                className={styles.removeButton}>
                Remove
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className={styles.emptyCartContainer}>
          <p className="text-xl font-extralight tracking-widest text-center pt-6">
            There are no products in your cart.
          </p>
          <p className="text-center mt-2 font-bold tracking-wide">
            Add the products you like to the cart and buy.
          </p>
          <Link to="/">
            <div className={styles.continueButton}>
              <button className={styles.button}>
                <span className={styles.buttonText}>Continue Shopping</span>
              </button>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};


export default CartComponent;
