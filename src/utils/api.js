// Fetch all products or by category (if category_id is provided)
export const fetchProducts = async (category_id) => {
  const url = category_id
    ? `${process.env.REACT_APP_API_BASE_URL}/products?category=${encodeURIComponent(category_id)}`
    : `${process.env.REACT_APP_API_BASE_URL}/products`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return await response.json();
};

// Fetch a product by ID
export const fetchProductById = async (product_id) => {
  const url = `${process.env.REACT_APP_API_BASE_URL}/products/${product_id}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  return await response.json();
};

// API functions for the cart
export const addCartItemAPI = async (cartItem) => {
  const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/cart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cartItem),
  });

  if (!response.ok) {
    throw new Error('Failed to add item to cart');
  }

  return await response.json();
};

export const fetchCartItemsAPI = async (userId) => {
  const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/${userId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch cart items');
  }
  return await response.json();
};

export const removeCartItemAPI = async (cartItemId) => {
  const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/${cartItemId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to remove item from cart');
  }
  return await response.json();
};
