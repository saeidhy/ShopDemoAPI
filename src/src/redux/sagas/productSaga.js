// src/redux/sagas/productSaga.js

import { call, put, takeEvery } from 'redux-saga/effects';
import { FETCH_PRODUCTS_REQUEST, fetchProductsSuccess, fetchProductsFailure } from '../actions/productActions';
import { fetchProducts, fetchProductById } from '../../utils/api'; // Import the utility functions

// Fetch multiple products saga
function* fetchProductsSaga(action) {
  try {
    const category_id = action.payload.category_id;
    const data = yield call(fetchProducts, category_id); // Fetch products by category
    yield put(fetchProductsSuccess(data)); // Dispatch success action
  } catch (error) {
    yield put(fetchProductsFailure(error.toString())); // Dispatch failure action
  }
}

// Fetch single product saga
function* fetchProductSaga(action) {
  try {
    const product_id = action.payload.product_id; // Access product ID from action payload
    const product = yield call(fetchProductById, product_id); // Fetch single product by ID
    yield put(fetchProductsSuccess(product)); // Dispatch success action with product data
  } catch (error) {
    yield put(fetchProductsFailure(error.toString())); // Dispatch failure action with error
  }
}

// Watcher for product sagas
export function* watchFetchProducts() {
  yield takeEvery(FETCH_PRODUCTS_REQUEST, fetchProductsSaga);
  yield takeEvery('FETCH_PRODUCT_REQUEST', fetchProductSaga); // Watch for product detail requests
}
