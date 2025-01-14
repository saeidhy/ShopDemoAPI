import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../redux/actions/cartActions';
import { addToFavorite, removeFromFavorite } from '../../redux/actions/favoriteActions';
import { StarIcon, ShoppingCartIcon, HeartIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';

const Card = ({ item }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cartItems);
  const favoriteItems = useSelector(state => state.favorite.favoriteItems);

  const [isInCart, setIsInCart] = useState(!!cartItems.find(cartItem => cartItem.id === item.id));
  const [isFavorite, setIsFavorite] = useState(!!favoriteItems.find(favItem => favItem.id === item.id));

  // When cartItems or favoriteItems change, update state
  useEffect(() => {
    setIsInCart(!!cartItems.find(cartItem => cartItem.id === item.id));
    setIsFavorite(!!favoriteItems.find(favItem => favItem.id === item.id));
  }, [cartItems, favoriteItems, item.id]);

  const handleAddToCart = () => {
    if (!isInCart) {
      dispatch(addToCart(item));
    } else {
      dispatch(removeFromCart(item.id));
    }
    setIsInCart(!isInCart);
  };

  const handleAddToFavorite = () => {
    if (!isFavorite) {
      dispatch(addToFavorite(item));
    } else {
      dispatch(removeFromFavorite(item.id));
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <div key={`${item.id}-item`} className={styles.card}>
      <div className={styles.cardLink}>
        <button onClick={handleAddToFavorite} className={styles.favButton}>
          <HeartIcon className={`${styles.heartIcon} ${isFavorite ? styles.isFavorite : ''}`} />
        </button>
        <Link to={`/product/${item.id}`}>
          <div className={styles.cardHeader}>
            <img className={styles.cardImg} src={item.imageUrl} alt={item.title} />
          </div>
        </Link>
        <div className={styles.cardBody}>
          <div>
            <p className={styles.cardTitle}>
              <span className={styles.brand}>Brand,</span> {item.title}
            </p>
          </div>
          <div className={styles.rating}>
            {[...Array(item.rating?.rate ? Math.round(item.rating.rate) : 0)].map((_, i) => (
              <StarIcon key={`star-${i}`} className={styles.starIcon} aria-hidden="true" />
            ))}
            {[...Array(5 - (item.rating?.rate ? Math.round(item.rating.rate) : 0))].map((_, i) => (
              <StarIcon key={`empty-star-${i}`} className={styles.emptyStarIcon} aria-hidden="true" />
            ))}
            <p className="text-xs ml-1 font-light mt-0.5">
              ({item.rating?.count || 'No ratings'})
            </p>
          </div>
          <div className={styles.price}>${item.price?.toFixed(2)}</div>
          <div className={styles.addToCart}>
            <button 
              className={isInCart ? `${styles.addToCartButton} ${styles.isInCart}` : styles.addToCartButton} 
              onClick={handleAddToCart}>
              <ShoppingCartIcon className={styles.shoppingCartIcon} aria-hidden="true" />
              <span className={styles.buttonText}>
                {isInCart ? 'Remove from cart' : 'Add to Cart'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
