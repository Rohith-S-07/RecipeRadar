import React from 'react'
import { NavLink } from 'react-router-dom';

const NavBar = () => {

    const handleNavLinkClick = () => {
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarToggler && navbarCollapse.classList.contains('show')) {
            navbarToggler.click();
        }
    };

    return (
        <nav className="navbar navbar-expand-lg custom-navbar fixed-top mx-1">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">
                    <img src='' alt="RC" height={50} />
                    <span className="custom-heading fs-4">Recipe Radar</span>
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
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link mt-1" to="/" activeClassName="active" exact onClick={handleNavLinkClick}>
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link mt-1" to="/aboutus" activeClassName="active" onClick={handleNavLinkClick}>
                                About Us
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link mt-1" to="/contactus" activeClassName="active" onClick={handleNavLinkClick}>
                                Contact Us
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar
