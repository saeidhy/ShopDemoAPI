import { createContext, useState, useEffect, useContext, useCallback } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [categories, setCategories] = useState([]); // Stores categories
  const [products, setProducts] = useState([]); // Stores all products
  const [product, setProduct] = useState(null); // Stores a single product
  const [loading, setLoading] = useState(false); // Loading state for API requests
  const [error, setError] = useState(null); // Error state for API errors

  // Fetch categories from the API when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/Products/categories`);
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Error loading categories.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories(); // Trigger the fetch on mount
  }, []); // Empty array ensures the effect only runs once on mount

  // Fetch product by ID from API
  const fetchProductByID = useCallback(async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
  
      const data = await response.json();
      setProduct(data);
      
      if (!data || Object.keys(data).length === 0) {
        throw new Error('Product not found');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      setProduct(null); // Set to null if product is not found or error occurs
    } finally {
      setLoading(false);
    }
  }, []);
  
  // Fetch all products from the API
  const fetchProducts = useCallback(async (category = '') => {
    setLoading(true);
    setError(null); // Clear any previous error

    try {
      let url = `${process.env.REACT_APP_API_BASE_URL}/Products`;
      if (category) {
        url += `?category=${encodeURIComponent(category.trim())}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Error loading products. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <ProductContext.Provider value={{ 
      categories, 
      products, 
      product, 
      loading, 
      error, 
      fetchProductByID, 
      fetchProducts // Include fetchProducts for fetching based on categories
    }}>
      {children}
    </ProductContext.Provider>
  );
};

// Export the custom hook to access ProductContext
export const useProduct = () => {
  return useContext(ProductContext);
};
