// src/redux/store.js
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import cartReducer from './reducers/cartReducer';
import favoriteReducer from './reducers/favoriteReducer';
import productReducer from './reducers/productReducer';
import rootSaga from './sagas';

const rootReducer = combineReducers({
  cart: cartReducer,
  favorite: favoriteReducer,
  products: productReducer,
});

const sagaMiddleware = createSagaMiddleware();

// Enable Redux DevTools Extension if available
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;
