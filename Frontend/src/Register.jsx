import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css'; 

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  async function RegisterUser(e) {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/register', {
        name,
        email,
        password,
        role, 
      });

      if (response.data) {
        alert('Registration successful!');
        navigate('/login'); 
      }
    } catch (error) {
      alert('Registration failed');
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={RegisterUser} className={styles.form}>
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
        />
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
        <select value={role} onChange={(e) => setRole(e.target.value)} className={styles.select}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className={styles.button}>Register</button>
      </form>
    </div>
  );
}
