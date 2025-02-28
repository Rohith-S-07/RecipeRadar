import React, { useState } from 'react';
import API from '../axiosInstance';
import { useNavigate } from 'react-router-dom';
import RecipeLogo from '../assets/images/recipe-radar-new.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../assets/styles/SignIn_Up.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate('/');
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: '', password: '' };

    if (!email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(true);
    setTimeout(() => {
      setShowPassword(false);
    }, 500);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        const response = await API.post('/auth/login', { email, password });

        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('userData', JSON.stringify(response.data.user));

        setSuccess('Login successful!');
        setError('');
        navigate('/');
      } catch (error) {
        setError(error.response?.data.message || 'Invalid login credentials.');
        setSuccess('');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="wrapper d-flex justify-content-center align-items-center min-vh-100">
      <div className="w-100 form-container" style={{ maxWidth: '400px' }}>
        <div className="brand" onClick={handleNavigateHome}>
          <img src={RecipeLogo} alt="RC" height={50} />
          <span className="custom-heading fs-3 pb-1 ms-2">Recipe Radar</span>
        </div>
        <h2 className="heading">Sign In</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              id="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          <div className="form-group position-relative">
            <label htmlFor="password">Password</label>
            <div className="position-relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className={`form-control ${errors.password ? 'is-invalid' : ''} pe-5`}
                id="password"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="eye-icon"
                onClick={togglePasswordVisibility}
                style={{ cursor: 'pointer' }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>

          <br />
          <button className="btn custom-btn-primary text-light" type="submit" disabled={loading}>
            {loading ? (
              <>
                <div className="spinner-border spinner-border-sm text-light me-2" role="status"></div>
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </button>

        </form>

        {error && <div className="text-danger mt-3 text-center">{error}</div>}
        {success && <div className="text-success mt-3 text-center">{success}</div>}

        <p className="text-secondary">
          Haven't Registered yet? <a href="/signup" className="register-link">Register now!</a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;