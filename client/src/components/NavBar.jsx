import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import config from "../config";

import NotificationModal from "./Modals/NotificationModal";
import ConfirmationModal from "./Modals/ConfirmationModal";

import RecipeLogo from "../assets/images/recipe-radar-new.png";
import { Collapse } from "bootstrap";

const NavBar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [navbarOpen, setNavbarOpen] = useState(false);

    // Check if the user is logged in
    useEffect(() => {
        const storedUser = localStorage.getItem("userData");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Toggle dropdown
    const toggleDropdown = () => {
        if (dropdownOpen) {
            document.querySelector(".dropdown-menu").classList.add("hide");
            setTimeout(() => {
                setDropdownOpen(false);
            }, 400);
        } else {
            setDropdownOpen(true);
        }
    };

    // Close Navbar when clicking a link (Mobile View)
    const closeNavbar = () => {
        setNavbarOpen(false);
        setDropdownOpen(false);

        const navbarElement = document.getElementById("navbarNav");
        if (navbarElement) {
            const bsCollapse = new Collapse(navbarElement, { toggle: false });
            bsCollapse.hide();
        }
    };

    // Logout Function
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userData");
        setUser(null);
        setDropdownOpen(false);
        setShowNotification(true);
        setTimeout(() => {
            closeNavbar();
            navigate("/signin");
        }, 1000);
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg custom-navbar fixed-top">
                <div className="container-fluid">
                    <NavLink
                        className="navbar-brand d-flex align-items-center"
                        to="/"
                        onClick={closeNavbar}
                    >
                        <img src={RecipeLogo} alt="RR" />
                        <span className="custom-heading fs-2 pb-1 ms-2">Recipe Radar</span>
                    </NavLink>

                    {/* Navbar Toggler for Mobile View */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        aria-expanded={navbarOpen}
                        aria-label="Toggle navigation"
                        onClick={() => {
                            setNavbarOpen(!navbarOpen);
                            const navbarElement = document.getElementById("navbarNav");
                            if (navbarElement) {
                                const bsCollapse = new Collapse(navbarElement);
                                navbarOpen ? bsCollapse.hide() : bsCollapse.show();
                            }
                        }}
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Navbar Links */}
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav mx-auto justify-content-center">
                            <li className="nav-item">
                                <NavLink className="nav-link mt-1" to="/" onClick={closeNavbar}>Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link mt-1" to="/recipes" onClick={closeNavbar}>Recipes</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link mt-1" to="/about" onClick={closeNavbar}>About</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link mt-1" to="/contact" onClick={closeNavbar}>Contact</NavLink>
                            </li>
                        </ul>

                        {/* Sign In / Profile Dropdown */}
                        <div className="d-flex justify-content-center">
                            {!user ? (
                                <a href="/signin" onClick={closeNavbar}>
                                    <button className="login-btn mx-auto">Sign In</button>
                                </a>
                            ) : (
                                <div className="profile-dropdown">
                                    <div className="profile-button" onClick={toggleDropdown}>
                                        <span className="me-2">Hi, {user.name}</span>
                                        <img
                                            src={`${config.BASE_URL}/${user.profilePicture}`}
                                            alt="Profile"
                                            className="profile-image"
                                        />
                                    </div>

                                    {/* Dropdown Menu */}
                                    {dropdownOpen && (
                                        <div className="dropdown-menu show">
                                            <button
                                                className="dropdown-item"
                                                onClick={() => {
                                                    closeNavbar();
                                                    navigate('/profile');
                                                }}
                                            >
                                                <i className="bi bi-person-lines-fill me-2 mb-2 fs-5"></i>
                                                Profile
                                            </button>
                                            <button
                                                className="dropdown-item"
                                                onClick={() => {
                                                    closeNavbar();
                                                    navigate('/recipes/addrecipe');
                                                }}
                                            >
                                                <i className="bi bi-plus-circle me-2 mb-1 fs-5"></i>
                                                Add Recipe
                                            </button>
                                            <button
                                                className="dropdown-item"
                                                onClick={() => {
                                                    closeNavbar();
                                                    navigate('/recipes/myrecipes');
                                                }}
                                            >
                                                <i className="bi bi-folder2-open me-2 fs-5"></i>
                                                My Recipes
                                            </button>
                                            <button className="dropdown-item"
                                                onClick={() => {
                                                    closeNavbar();
                                                    navigate('/chat');
                                                }}
                                            >
                                                <i className="bi bi-chat-dots me-2 fs-5"></i>
                                                Chat
                                            </button>
                                            <button
                                                className="btn btn-danger w-75 ms-3 mt-2"
                                                onClick={() => {
                                                    closeNavbar();
                                                    setShowLogoutModal(true);
                                                }}
                                            >
                                                <i className="bi bi-box-arrow-right me-2 fs-6"></i>
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <ConfirmationModal
                isOpen={showLogoutModal}
                onRequestClose={() => setShowLogoutModal(false)}
                onConfirm={handleLogout}
                message="Are you sure you want to log out?"
            />

            <NotificationModal
                isOpen={showNotification}
                onRequestClose={() => setShowNotification(false)}
                message="Logged out successfully!"
            />
        </>
    );
};

export default NavBar;