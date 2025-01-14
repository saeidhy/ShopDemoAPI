import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartComponent from '../../Components/Card/CartComponent';
import { ShoppingCartIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector(state => state.cart.cartItems);

  useEffect(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      const cartItems = JSON.parse(savedCartItems);
      dispatch({ type: 'LOAD_CART_FROM_LOCALSTORAGE', payload: cartItems });
    }
  }, [dispatch]);

  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem('cartItems', JSON.stringify(items));
    } else {
      localStorage.removeItem('cartItems');
    }
  }, [items]);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-semibold mb-4 text-center">Your Cart</h1>
      {items.length > 0 ? (
        <CartComponent /> 
      ) : (
        <div className="flex flex-wrap max-w-7xl mx-auto my-4">
          <div className="w-full sm:w-2/2 md:w-2/2 xl:w-5/5 p-4 h-[500px] my-auto">
            <div className={styles.cardBg}>
              <ShoppingCartIcon className={styles.shoppingCartIcon} />
              <p className={styles.emptyCartText}>
                There are no products in your cart.
              </p>
              <p className={styles.addProductText}>
                Add the products you like to the cart and buy.
              </p>
              <Link to="/">
                <div className={styles.continueButton}>
                  <button className={styles.button}>
                    <div className="flex flex-col self-center">
                      <span className={styles.buttonText}>
                        Continue Shopping
                      </span>
                    </div>
                  </button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
