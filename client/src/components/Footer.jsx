import React from 'react';
import { NavLink } from 'react-router-dom';
import RecipeLogo from '../assets/images/recipe-radar-new.png';


const Footer = () => {
  return (
    <footer className="pb-3">
      <div className="row text-center mx-0 d-flex">
        <div className='col mb-3'>
          <NavLink className="navbar-brand" to="/">
            <img src={RecipeLogo} alt="RC" className='mb-3 me-2' />
            <span className="custom-heading fs-3">Recipe Radar</span>
          </NavLink>
        </div>
        <div className="col mb-3">
          <ul className="list-unstyled">
            <li>
              <NavLink className="text-decoration-none text-muted" to="/about">
                About Us
              </NavLink>
            </li>

            <li>
              <NavLink className="text-decoration-none text-muted" to="/contact">
                Contact Us
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="col mb-3 fs-4">
              <a href="#" className="text-decoration-none text-muted">
                <i class="fa-brands fa-github me-4"></i>
              </a>
              <a href="#" className="text-decoration-none text-muted">
                <i className="fab fa-x-twitter me-4"></i>
              </a>
              <a href="#" className="text-decoration-none text-muted">
                <i className="fab fa-instagram me-4"></i>
              </a>
        </div>
        <div className="col mb-3">
          <ul className="list-unstyled text-muted">
            <li>
              <a href="#" className="text-decoration-none text-muted">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="text-decoration-none text-muted">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p className="text-center custom-text">&copy; 2025 Recipe Radar. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
