import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css'; // Import styles

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  async function LoginUser(e) {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });

      if (response.data.login) {
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard');  
      } else {
        setErrorMessage(response.data.message || 'Login failed');
      }
    } catch (error) {
      setErrorMessage('An error occurred during login');
    }
  }

  const handleSignUp = () => {
    navigate('/Register');
  };

  return (
    <div className={styles.container}>
      <form onSubmit={LoginUser} className={styles.form}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Login</button>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      </form>
      <button onClick={handleSignUp} className={styles.button}>Sign Up</button>
    </div>
  );
}
