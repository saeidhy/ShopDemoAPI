import { IdentificationIcon } from '@heroicons/react/outline';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../Context/AuthContext';
import styles from './styles.module.css';
import validations from './validations';

const Signup = () => {
  const {
    currentUser,
    setCurrentUser,
    users,
    loggedIn,
    errors,
    setErrors,
    setIsSubmitting,
  } = useAuth();

  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loggedIn && navigate('/');
  }, [loggedIn, navigate]);

  const handleSignUpFormChange = (e) => {
    setCurrentUser({ ...currentUser, [e.target.name]: e.target.value });
  };

  // Function to handle API call for signup
  const handleSignup = async (userData) => {
    try {
      // Prepare the user data to match the backend model
      const userPayload = {
        username: userData.firstName + ' ' + userData.lastName, // Combine first and last names if required
        email: userData.email,
        passwordHash: userData.password, // Assuming password is handled as hash server-side
      };

      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/Users/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to signup');
      }

      const result = await response.json();
      console.log('Signup successful:', result);
      navigate('/signin');
    } catch (error) {
      console.error('Error during signup:', error.message);
      setServerError(error.message);
    }
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    setErrors(validations(currentUser, users));
    setIsSubmitting(true);

    // Call the handleSignup function to make the API call
    handleSignup(currentUser);
  };

  return (
    <div className={styles.formGroupContainer}>
      <div className={styles.formGroup}>
        <div>
          <h2 className={styles.title}>Sign Up</h2>
        </div>
        <form
          autoComplete="off"
          onSubmit={handleSignUpSubmit}
          className={styles.signUpForm}
        >
          <div className={styles.inputGroup}>
            <div>
              {errors.firstName && <span className={styles.error}>{errors.firstName}</span>}
              <label className="sr-only">First Name</label>
              <input
                type="text"
                className={styles.input}
                onChange={handleSignUpFormChange}
                value={currentUser.firstName}
                name="firstName"
                placeholder="First Name"
              />
            </div>

            <div>
              {errors.lastName && <span className={styles.error}>{errors.lastName}</span>}
              <label className="sr-only">Last Name</label>
              <input
                type="text"
                className={styles.input}
                onChange={handleSignUpFormChange}
                value={currentUser.lastName}
                name="lastName"
                placeholder="Last Name"
              />
            </div>
            <div>
              {errors.email && <span className={styles.error}>{errors.email}</span>}
              <label className="sr-only">Email</label>
              <input
                type="email"
                className={styles.input}
                onChange={handleSignUpFormChange}
                value={currentUser.email}
                name="email"
                placeholder="Email Address"
              />
            </div>
            <div>
              {errors.password && <span className={styles.error}>{errors.password}</span>}
              <label className="sr-only">Password</label>
              <input
                type="password"
                className={styles.input}
                onChange={handleSignUpFormChange}
                value={currentUser.password}
                name="password"
                placeholder="Password"
              />
            </div>
            <div>
              {errors.passwordConfirm && <span className={styles.error}>{errors.passwordConfirm}</span>}
              <label className="sr-only">Password Confirm</label>
              <input
                type="password"
                className={styles.input}
                onChange={handleSignUpFormChange}
                value={currentUser.passwordConfirm}
                name="passwordConfirm"
                placeholder="Password Confirm"
              />
            </div>
            {serverError && <div className={styles.error}>{serverError}</div>}
            <div className={styles.linkBox}>
              <div className={styles.linkDiv}>
                <span>
                  Already have an account? Login{' '}
                  <Link to="/signin" className="text-blue-600 hover:underline">
                    {' '}
                    here.
                  </Link>
                </span>
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className={styles.button}>
                <IdentificationIcon
                  className="my-auto h-5 w-6"
                  aria-hidden="true"
                />
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
