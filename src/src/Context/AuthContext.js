import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

// Retrieve the user and users data from localStorage or set defaults
const defaultUser = JSON.parse(localStorage.getItem("user")) || {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  passwordConfirm: "",
  address: "",
};
const defaultUsers = JSON.parse(localStorage.getItem("users")) || [];

const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(defaultUsers);
  const [currentUser, setCurrentUser] = useState(defaultUser);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loggedIn, setLoggedIn] = useState(!!currentUser.email); // Check login status by email presence
  const [errors, setErrors] = useState({});

  // Persist users in localStorage whenever they are updated
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // Persist current user in localStorage whenever it's updated
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
    setLoggedIn(!!currentUser.email); // Update loggedIn state based on currentUser
  }, [currentUser]);

  const login = async (email, password) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/Users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid email or password');
      }

      const result = await response.json();
      setCurrentUser(result);
      setLoggedIn(true);
      setErrors({});
    } catch (error) {
      setErrors({ login: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const logout = () => {
    // Remove user from localStorage and reset state
    localStorage.removeItem("user");
    setCurrentUser({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      address: "",
    });
    setLoggedIn(false);
  };

  const handleSignup = async (userData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/Users/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to signup');
      }

      const result = await response.json();
      setCurrentUser(result);
      setLoggedIn(true);
      setUsers(prevUsers => [...prevUsers, result]);
      setErrors({});
    } catch (error) {
      setErrors({ signup: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const value = {
    currentUser,
    setCurrentUser,
    users,
    loggedIn,
    setLoggedIn,
    errors,
    setErrors,
    isSubmitting,
    setIsSubmitting,
    logout,
    login,
    handleSignup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
