import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { CiCirclePlus } from "react-icons/ci";
import { MdOutlineChat } from "react-icons/md";

import RecipeLogo from "../assets/images/recipe-radar-new.png";
import NotificationModal from "./Modals/NotificationModal";
import ConfirmationModal from "./Modals/ConfirmationModal";
import "../assets/styles/NavBar.css";

const NavBar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [navbarOpen, setNavbarOpen] = useState(false); // Track navbar state

    // Check if the user is logged in
    useEffect(() => {
        const storedUser = localStorage.getItem("userData");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Toggle dropdown
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    // Close Navbar when clicking a link (Mobile View)
    const closeNavbar = () => {
        setNavbarOpen(false);
        setDropdownOpen(false)
        document.getElementById("navbarNav").classList.remove("show");
    };

    // Logout Function
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userData");
        setUser(null);
        setDropdownOpen(false);
        setShowNotification(true); 
        setTimeout(() => {
            closeNavbar(); // Close navbar
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
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded={navbarOpen}
                        aria-label="Toggle navigation"
                        onClick={() => setNavbarOpen(!navbarOpen)}
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
                                        <FaUserCircle size={30} />
                                    </div>

                                    {/* Dropdown Menu */}
                                    {dropdownOpen && (
                                        <div className="dropdown-menu show">
                                            <button 
                                                className="dropdown-item" 
                                                onClick={() => {
                                                    closeNavbar();
                                                    navigate('/recipes/addrecipe');
                                                }} 
                                            >
                                                <CiCirclePlus className="me-2 mb-1 fs-4" />
                                                Add Recipe
                                            </button>
                                            <button className="dropdown-item" onClick={closeNavbar}>
                                                <MdOutlineChat className="me-2 mb-1 fs-4" />
                                                Chat
                                            </button>
                                            <button
                                                className="dropdown-item text-danger"
                                                onClick={() => {
                                                    closeNavbar();
                                                    setShowLogoutModal(true);
                                                }}
                                            >
                                                <LuLogOut className="me-2 mb-1 fs-4" />
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

            {/* Logout Confirmation Modal */}
            <ConfirmationModal
                isOpen={showLogoutModal}
                onRequestClose={() => setShowLogoutModal(false)}
                onConfirm={handleLogout}
                message="Are you sure you want to log out?"
            />

            {/* Notification Modal for Logout */}
            <NotificationModal
                isOpen={showNotification}
                onRequestClose={() => setShowNotification(false)}
                message="Logged out successfully!"
            />
        </>
    );
};

export default NavBar;