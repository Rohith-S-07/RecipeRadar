import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import RecipeLogo from '../assets/images/recipe-radar-new.png';
import '../assets/styles/SignIn_Up.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    description: '',
    profilePicture: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate('/');
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      newErrors.name = 'Name should only contain letters and spaces';
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    if (formData.profilePicture) {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(formData.profilePicture.type)) {
        newErrors.profilePicture = 'Only JPG, JPEG, and PNG files are allowed';
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('description', formData.description);
    if (formData.profilePicture) {
      formDataToSend.append('profilePicture', formData.profilePicture);
    }

    try {
      const response = await axios.post(`${config.BASE_URL}/auth/register`, formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.success) {
        alert('Registration successful!');
        navigate('/signin');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert(error.response?.data?.message || 'Registration failed!');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    let updatedValue = name === 'profilePicture' ? files[0] : value;

    setFormData((prevState) => ({
      ...prevState,
      [name]: updatedValue,
    }));

    validateField(name, updatedValue);
  };

  const validateField = (fieldName, value) => {
    let fieldErrors = { ...errors };

    switch (fieldName) {
      case 'name':
        if (!value.trim()) {
          fieldErrors.name = 'Name is required';
        } else if (!/^[A-Za-z\s]+$/.test(value)) {
          fieldErrors.name = 'Name should only contain letters and spaces';
        } else {
          delete fieldErrors.name;
        }
        break;

      case 'email':
        if (!value.trim()) {
          fieldErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          fieldErrors.email = 'Invalid email format';
        } else {
          delete fieldErrors.email;
        }
        break;

      case 'password':
        if (!value.trim()) {
          fieldErrors.password = 'Password is required';
        } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)) {
          fieldErrors.password = 'Password must contain at least 8 characters, including 1 letter, 1 number, and 1 special character';
        } else {
          delete fieldErrors.password;
        }
        break;

      case 'confirmPassword':
        if (value !== formData.password) {
          fieldErrors.confirmPassword = 'Passwords do not match';
        } else {
          delete fieldErrors.confirmPassword;
        }
        break;


      case 'profilePicture':
        if (value) {
          const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
          if (!allowedTypes.includes(value.type)) {
            fieldErrors.profilePicture = 'Only JPG, JPEG, and PNG files are allowed';
          } else {
            delete fieldErrors.profilePicture;
          }
        }
        break;

      default:
        break;
    }

    setErrors(fieldErrors);
  };


  return (
    <div className="wrapper d-flex justify-content-center align-items-center min-vh-100">
      <div className="w-100 form-container m-2" style={{ maxWidth: '600px' }}>
        <div className="brand text-center mb-1" onClick={handleNavigateHome}>
          <img src={RecipeLogo} alt="Recipe Radar" height={60} className="mb-2" />
          <span className="custom-heading fs-3 pb-1 ms-2">Recipe Radar</span>
        </div>
        <h2 className="heading text-center mb-1">Register your Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="row mb-1">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>
            </div>
          </div>

          <div className="row mb-1">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
              </div>
            </div>
          </div>

          <div className="form-group mb-1">
            <label htmlFor="description">About</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="profilePicture">Profile Picture</label>
            <input
              type="file"
              className={`form-control ${errors.profilePicture ? 'is-invalid' : ''}`}
              id="profilePicture"
              name="profilePicture"
              onChange={handleChange}
            />
            {errors.profilePicture && <div className="invalid-feedback">{errors.profilePicture}</div>}
          </div>

          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
          <p className="text-secondary">Already Registered?<a href="/signin" className="register-link">Login now!</a></p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;