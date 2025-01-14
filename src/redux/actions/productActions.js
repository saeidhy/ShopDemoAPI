// src/redux/actions/productActions.js

// Action Types
export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';
export const FETCH_PRODUCT_REQUEST = 'FETCH_PRODUCT_REQUEST';
export const FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS';
export const FETCH_PRODUCT_FAILURE = 'FETCH_PRODUCT_FAILURE';
export const SET_CATEGORY = 'SET_CATEGORY';

// Action Creators

// Fetch products request with optional category_id
export const fetchProductsRequest = (category_id = '') => ({
    type: FETCH_PRODUCTS_REQUEST,
    payload: { category_id },
});

// Fetch products success
export const fetchProductsSuccess = (products) => ({
    type: FETCH_PRODUCTS_SUCCESS,
    payload: products,
});

// Fetch products failure
export const fetchProductsFailure = (error) => ({
    type: FETCH_PRODUCTS_FAILURE,
    payload: error,
});

// Fetch a single product request by product_id
export const fetchProductRequest = (product_id) => ({
    type: FETCH_PRODUCT_REQUEST,
    payload: { product_id },
});

// Fetch single product success
export const fetchProductSuccess = (product) => ({
    type: FETCH_PRODUCT_SUCCESS,
    payload: product,
});

// Fetch single product failure
export const fetchProductFailure = (error) => ({
    type: FETCH_PRODUCT_FAILURE,
    payload: error,
});

// Set selected category
export const setCategory = (category) => ({
    type: SET_CATEGORY,
    payload: category,
});

// Thunk function to fetch products (optionally filtered by category_id)
export const fetchProducts = (category_id = '') => async (dispatch) => {
    dispatch(fetchProductsRequest(category_id)); // Dispatch request action

    try {
        let url = `${process.env.REACT_APP_API_BASE_URL}/products`;
        if (category_id) {
            url += `?category=${encodeURIComponent(category_id.trim())}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        
        if (response.ok) {
            // Dispatch success action if response is successful
            dispatch(fetchProductsSuccess(data));
        } else {
            // Dispatch failure if response status isn't OK
            throw new Error(data.message || 'Failed to fetch products');
        }
    } catch (error) {
        console.error('Error fetching products:', error);
        // Dispatch failure action if there’s an error
        dispatch(fetchProductsFailure(error.toString()));
    }
};

// Thunk function to fetch a single product by its ID
export const fetchProduct = (product_id) => async (dispatch) => {
    dispatch(fetchProductRequest(product_id)); // Dispatch request action for single product

    try {
        const url = `${process.env.REACT_APP_API_BASE_URL}/products/${product_id}`;
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            // Dispatch success action with fetched product data
            dispatch(fetchProductSuccess(data));
        } else {
            // Handle failure case with error message
            throw new Error(data.message || 'Failed to fetch product details');
        }
    } catch (error) {
        console.error('Error fetching product:', error);
        // Dispatch failure action if there’s an error
        dispatch(fetchProductFailure(error.toString()));
    }
};

// Action to create a new product
export const createProduct = (product) => ({
    type: 'CREATE_PRODUCT',
    payload: product,
});
