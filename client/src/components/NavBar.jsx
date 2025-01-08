import React from 'react'
import { NavLink } from 'react-router-dom';
import '../assets/styles/NavBar.css'
import RecipeLogo from '../assets/images/recipe-radar-logo.png'

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
                <NavLink className="navbar-brand" to="/">
                    <img src={RecipeLogo} alt="RR" height={40} />
                    <span className="custom-heading fs-3 pb-1 ms-2">Recipe Radar</span>
                </NavLink>
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
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link mt-1" to="/" activeClassName="active" exact onClick={handleNavLinkClick}>
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link mt-1" to="/recipes" activeClassName="active" exact onClick={handleNavLinkClick}>
                                Recipes
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link mt-1" to="/about" activeClassName="active" onClick={handleNavLinkClick}>
                                About
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link mt-1" to="/contact" activeClassName="active" onClick={handleNavLinkClick}>
                                Contact
                            </NavLink>
                        </li>
                    </ul>
                    
                    <div className="">
                        <button className="login-btn">Log in</button>
                    </div>
                    
                </div>
            </div>
        </nav>
    )
}

export default NavBar