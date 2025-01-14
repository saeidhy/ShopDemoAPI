// src/redux/sagas/__tests__/productSaga.test.js
import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';
import axios from 'axios';
import { fetchProductsSaga } from '../productSaga';
import { FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_FAILURE } from '../../actions/productActions';

it('fetches products successfully', () => {
  const mockProducts = [{ id: 1, name: 'Product 1' }];
  
  return expectSaga(fetchProductsSaga)
    .provide([[call(axios.get, 'https://fakestoreapi.com/products'), { data: mockProducts }]])
    .put({ type: FETCH_PRODUCTS_SUCCESS, payload: mockProducts })
    .run();
});

it('handles errors when fetching products', () => {
  const error = new Error('Network Error');

  return expectSaga(fetchProductsSaga)
    .provide([[call(axios.get, 'https://fakestoreapi.com/products'), Promise.reject(error)]])
    .put({ type: FETCH_PRODUCTS_FAILURE, payload: error.message })
    .run();
});
