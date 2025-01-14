import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Signin from './Pages/Auth/Signin';
import Signup from './Pages/Auth/Signup';
import Products from './Pages/Products';
import Error404 from './Pages/Error404';
import Container from './Components/Container';
import ProductDetail from './Pages/ProductDetail/index.js';
import Cart from './Pages/Cart';
import Favorites from './Pages/Favorites';
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary'; 

function App() {
  return (
    <div className="container mx-auto">
      <Navbar />
      <Container>
        <Routes>
          {/* Wrap ProductDetail with ErrorBoundary for error handling */}
          <Route 
            path="/product/:product_id" 
            element={
              <ErrorBoundary>
                <ProductDetail />
              </ErrorBoundary>
            } 
          />
          <Route path="/" element={<Products />} />
          <Route path="/category/:category_id" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
