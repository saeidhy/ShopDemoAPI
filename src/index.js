// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './Context/AuthContext';
import { ProductProvider } from './Context/ProductContext';
import { CartProvider } from './Context/CartContext';
import { FavoriteProvider } from './Context/FavoriteContext';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <ProductProvider>
          <CartProvider> {/* Wrap the app with CartProvider */}
            <FavoriteProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </FavoriteProvider>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);