import React, { useState } from 'react';
import axios from 'axios';
import ContactImg from '../assets/images/contactus.png';
import NotificationModal from './Modals/NotificationModal';
import config from '../config';

const ContactUs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    message: ''
  });
  const [statusMessage, setStatusMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.first_name || !formData.last_name || !formData.email || !formData.message) {
      setStatusMessage("Please fill in all the fields.");
      setIsModalOpen(true);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatusMessage("Please enter a valid email address.");
      setIsModalOpen(true);
      return;
    }

    try {
      const response = await axios.post(`${config.BASE_URL}/contact`, formData);
      setStatusMessage(response.data.message || 'Thanks for reaching out! Your feedback is valuable to us.');
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        message: ''
      });
    } catch (error) {
      setStatusMessage(error.response?.data?.message || 'Something went wrong. Please try again later.');
    } finally {
      setIsModalOpen(true);
    }
  };

  return (
    <div>
      <div className="row mb-2 p-4 mx-2">
        <h1 className="custom-heading fs-2 text-center pb-2">We Value Your Feedback</h1>
        <p className="text-center mb-3">Have a question, feedback, or suggestion? Let us know below!</p>
        
        <img src={ContactImg} alt="Contact Us" className="col-md-5 max-w-lg" />

        <div className="col-md-7 d-flex flex-column justify-content-center align-items-center">
          <form className="d-flex flex-column align-items-center w-100" onSubmit={handleSubmit}>
            <div className="d-flex align-items-center justify-content-between mb-2 w-100">
              <div className="w-50 me-4">
                <label htmlFor="first_name"><i className="bi bi-person-fill me-1"></i> First Name</label>
                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  placeholder="First Name"
                  className="form-control mt-1"
                  value={formData.first_name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-50">
                <label htmlFor="last_name"><i className="bi bi-person-fill"></i> Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  id="last_name"
                  placeholder="Last Name"
                  className="form-control mt-1"
                  value={formData.last_name}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="mb-2 w-100">
              <label htmlFor="email"><i className="bi bi-envelope-fill"></i> Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="form-control mt-1"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-4 w-100">
              <label htmlFor="message"><i className="bi bi-pencil-fill"></i> Message</label>
              <textarea
                name="message"
                id="message"
                rows="5"
                placeholder="Your Message"
                className="form-control mt-1"
                value={formData.message}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <button className="btn btn-success w-100" type="submit">Submit</button>
          </form>
        </div>
      </div>

      <div className="row d-flex align-items-center text-center mx-2">
        <div className="col-md-6">
          <h3 className='custom-heading fs-4 pb-2'>Find Us</h3>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3437.2896846530243!2d77.00194521145968!3d11.02466986516487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8582f1435fa59%3A0x137d95bfd8909293!2sPSG%20College%20Of%20Technology!5e1!3m2!1sen!2sin!4v1736500869872!5m2!1sen!2sin"
            width="90%" height="300" style={{ border: 0 }} allowFullScreen=""
            loading="lazy"
            className='rounded'
          ></iframe>
        </div>

        <div className="col-md-6">
          <h3 className='custom-heading fs-4 pb-1 mt-2'>Contact Information</h3>
          <p>Email: <a className='text-muted' href="mailto:reciperadar@gmail.com">reciperadar@gmail.com</a></p>
          <p>Phone: +91 9876543210</p>
        </div>
      </div>

      <NotificationModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        message={statusMessage}
      />
    </div>
  );
};

export default ContactUs;