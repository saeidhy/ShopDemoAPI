import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MenuButton from './MenuButton';
import CartButton from './CartButton';
import styles from './styles.module.css';
import { useProduct } from '../../Context/ProductContext';
import { useAuth } from '../../Context/AuthContext';

const Navbar = () => {
  const { categories, setCategory } = useProduct();
  const { currentUser, loggedIn, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className={`${styles.categoryNav} ${styles.navbar}`}>
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 py-2">
        {/* Logo */}
        <Link className={styles.logo} to="/">
          <div className={styles.logoBox}>
            <h1 className={styles.logoText}>LOGO</h1>
          </div>
        </Link>

        {/* Horizontal Category Links */}
        <div className="flex flex-1 justify-center items-center space-x-4">
          {/* All Category */}
          <Link
            className={`${styles.categoryLink} relative group text-lg px-4 py-2`}
            to="/"
            onClick={() => setCategory('')}
          >
            <h1 className="truncate">All</h1>
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-yellow-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-left"></span>
          </Link>
          {/* Other Categories */}
          {categories && categories.map((item, index) => (
            <Link
              key={index}
              className={`${styles.categoryLink} relative group text-lg px-4 py-2`}
              to={`/category/${item.toLowerCase()}`}
              onClick={() => setCategory(item.toLowerCase())}
            >
              <h1 className="truncate">{item}</h1>
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-yellow-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-left"></span>
            </Link>
          ))}
        </div>

        {/* User Info and Cart Button */}
        <div className="flex items-center space-x-4 relative">
          {loggedIn ? (
            <div className="flex items-center space-x-2">
              <span>Welcome, {currentUser.username}</span>
              <button onClick={handleLogout} className="text-blue-600 hover:underline">Logout</button>
            </div>
          ) : (
            <MenuButton />
          )}
          <div onClick={handleCartClick} className="cursor-pointer relative">
            <CartButton />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
