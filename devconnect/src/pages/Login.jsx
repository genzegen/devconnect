import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await API.post('/login/', form);
      setMessage(res.data.message);
      setMessageType('success');
      setForm({ username: '', password: '' });

      setTimeout(() => {
        navigate('/'); // Change path if needed
      }, 1000);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Login failed');
      setMessageType('error');
    }
  };

  const styles = {
    container: {
      width: '100%',
      maxWidth: '400px',
      height: '260px',
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
      backgroundColor: isHovered ? '#45a049' : '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontSize: '16px',
      cursor: 'pointer',
      boxSizing: 'border-box',
      lineHeight: 'normal',
      transition: 'background-color 0.3s',
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
        <h2 style={styles.title}>Login</h2>
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

        <div
            style={styles.loginbutton}
            onClick={() => navigate('/register')}
          >
            Don't have an account? Register
          </div>

          <button
            type="submit"
            style={styles.button}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Login
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
