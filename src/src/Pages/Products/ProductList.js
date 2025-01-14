import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsRequest } from '../../redux/actions/productActions';

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.products); // Access products from Redux state
  const loading = useSelector(state => state.products.loading);
  const error = useSelector(state => state.products.error);

  useEffect(() => {
    // Fetch all products
    dispatch(fetchProductsRequest());

    // To fetch products by a specific category, use:
    // dispatch(fetchProductsRequest('electronics'));
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          {/* Render more product details as needed */}
        </div>
      ))}
    </div>
  );
};

export default ProductList;
