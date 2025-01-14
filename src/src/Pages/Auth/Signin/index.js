import { IdentificationIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../Context/AuthContext';
import styles from './styles.module.css';

const Signin = () => {
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [serverError, setServerError] = useState('');
    const navigate = useNavigate();
    const { setCurrentUser, setLoggedIn } = useAuth();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            console.log("Attempting login with data: ", loginData);
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/Users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            if (!response.ok) {
                const contentType = response.headers.get('Content-Type');
                if (contentType && contentType.includes('application/json')) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to login');
                } else {
                    const errorText = await response.text();
                    throw new Error(errorText || 'Failed to login with non-JSON error');
                }
            }

            const result = await response.json();
            console.log('Login successful:', result);
            
            setCurrentUser(result);
            setLoggedIn(true);

            navigate('/');
        } catch (error) {
            console.error('Error during login:', error.message);
            setServerError(error.message);
        }
    };

    return (
        <div className={styles.formGroupContainer}>
            <div className={styles.formGroup}>
                <div>
                    <h2 className={styles.title}>Login</h2>
                </div>
                <form autoComplete="off" onSubmit={handleLogin} className={styles.signInForm}>
                    <div className={styles.inputGroup}>
                        <div>
                            <label className="sr-only">Email</label>
                            <input
                                type="email"
                                className={styles.input}
                                onChange={handleInputChange}
                                value={loginData.email}
                                name="email"
                                placeholder="Email Address"
                            />
                        </div>
                        <div>
                            <label className="sr-only">Password</label>
                            <input
                                type="password"
                                className={styles.input}
                                onChange={handleInputChange}
                                value={loginData.password}
                                name="password"
                                placeholder="Password"
                            />
                        </div>
                        {serverError && <div className={styles.error}>{serverError}</div>}
                        <div className="text-center">
                            <button type="submit" className={styles.button}>
                                <IdentificationIcon className="my-auto h-5 w-6" aria-hidden="true" />
                                Login
                            </button>
                        </div>
                    </div>
                </form>
                <div className={styles.linkBox}>
                    <span>
                        Don't have an account? Sign up{' '}
                        <Link to="/signup" className="text-blue-600 hover:underline">
                            here.
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Signin;
