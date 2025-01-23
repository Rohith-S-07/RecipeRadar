import React from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/styles/NavBar.css';
import RecipeLogo from '../assets/images/recipe-radar-new.png';

const NavBar = () => {
    const handleNavLinkClick = () => {
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarToggler && navbarCollapse.classList.contains('show')) {
            navbarToggler.click();
        }
    };

    return (
        <nav className="navbar navbar-expand-lg custom-navbar fixed-top">
            <div className="container-fluid">
                {/* Logo and Brand Name */}
                <NavLink className="navbar-brand d-flex align-items-center" to="/">
                    <img src={RecipeLogo} alt="RR" />
                    <span className="custom-heading fs-2 pb-1 ms-2">Recipe Radar</span>
                </NavLink>

                {/* Toggler for mobile view */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navigation Items and Login Button */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mx-auto  justify-content-center">
                        <li className="nav-item">
                            <NavLink
                                className={({ isActive }) =>
                                    `nav-link mt-1 ${isActive ? 'active' : ''}`
                                }
                                to="/"
                                exact="true"
                                onClick={handleNavLinkClick}
                            >
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className={({ isActive }) =>
                                    `nav-link mt-1 ${isActive ? 'active' : ''}`
                                }
                                to="/recipes"
                                onClick={handleNavLinkClick}
                            >
                                Recipes
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className={({ isActive }) =>
                                    `nav-link mt-1 ${isActive ? 'active' : ''}`
                                }
                                to="/about"
                                onClick={handleNavLinkClick}
                            >
                                About
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className={({ isActive }) =>
                                    `nav-link mt-1 ${isActive ? 'active' : ''}`
                                }
                                to="/contact"
                                onClick={handleNavLinkClick}
                            >
                                Contact
                            </NavLink>
                        </li>
                    </ul>

                    <div className="d-flex justify-content-center">
                        <a href="/signin">
                            <button className="login-btn mx-auto" >Sign In</button>
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
