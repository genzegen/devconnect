import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

export default function Register() {
  const [form, setForm] = useState({ username: '', password: '', confirm_password: '' });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const payload = {
        username: form.username,
        password: form.password,
        confirm_password: form.confirm_password
      };

      const res = await API.post('/register/', payload);

      setForm({ username: '', password: '', confirm_password: '' });
      navigate('/login', { state: { message: res.data.message || 'Account created successfully!' } });

    } catch (err) {
      setMessage(err.response?.data?.error || 'Registration failed');
      setMessageType('error');
    }
  };

  const styles = {
    container: {
      width: '100%',
      maxWidth: '400px',
      height: '330px',
      margin: '20px auto',
      padding: '30px',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#f9f9f9',
      fontFamily: 'Arial, sans-serif',
    },
    title: {
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      marginBottom: '20px',
      color: '#333'
    },
    input: {
      display: 'block',
      width: '100%',
      padding: '10px',
      marginBottom: '15px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '16px',
      boxSizing: 'border-box',
      lineHeight: 'normal',
    },
    button: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontSize: '16px',
      cursor: 'pointer',
      boxSizing: 'border-box',
      lineHeight: 'normal',
    },
    loginbutton: {
      all: 'unset',
      fontSize: '0.9rem',
      marginBottom: '15px',
      display: 'block',
      textAlign: 'center',
      color: '#007bff',
      cursor: 'pointer',
      textDecoration: 'underline',
    },
    messageSuccess: {
      marginTop: '15px',
      color: 'green',
      textAlign: 'center'
    },
    messageError: {
      marginTop: '15px',
      color: 'red',
      textAlign: 'center'
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0f0f0'
    }}>
      <h2 style={styles.title}><b>DevConnect</b></h2>
      <div style={styles.container}>
        <h2 style={styles.title}>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            name="confirm_password"
            type="password"
            placeholder="Confirm Password"
            value={form.confirm_password}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <div
            style={styles.loginbutton}
            onClick={() => navigate('/login')}
          >
            Already have an account? Login
          </div>

          <button type="submit" style={styles.button}>
            Register
          </button>
        </form>

        {message && (
          <p style={messageType === 'success' ? styles.messageSuccess : styles.messageError}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
