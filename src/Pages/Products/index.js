import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsRequest } from '../../redux/actions/productActions';
import styles from './styles.module.css';
import Spinner from '../../Components/Spinner';
import { useParams } from 'react-router-dom';
import { useCart } from '../../Context/CartContext';
import { useFavorite } from '../../Context/FavoriteContext';
import Card from '../../Components/Card';

const Products = () => {
  const dispatch = useDispatch();
  const { addToCart, items } = useCart();
  const { addToFavorite, favoriteItems } = useFavorite();

  const productList = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.loading);

  const { category_id } = useParams();

  useEffect(() => {
    dispatch(fetchProductsRequest(category_id));
  }, [dispatch, category_id]);

  const filteredProducts = category_id
    ? productList.filter(product => product.category.toLowerCase() === category_id.toLowerCase())
    : productList;

  return (
    <div className={styles.cardGroup}> {/* Grid container for product cards */}
      {!loading ? (
        filteredProducts?.length > 0 ? (
          filteredProducts.map((item, index) => {
            const findCartItem = items.find((cart_item) => cart_item.id === item.id);
            const findFavoriteItem = favoriteItems.find((favorite_item) => favorite_item.id === item.id);

            return (
              <Card
                key={`product-${index}`}
                item={item}
                findCartItem={findCartItem}
                findFavoriteItem={findFavoriteItem}
                addToCart={addToCart}
                addToFavorite={addToFavorite}
              />
            );
          })
        ) : (
          <div>No products found in this category.</div>
        )
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Products;
