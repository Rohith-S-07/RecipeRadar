import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./AdminSidebar.css";
import RRlogo from "../../assets/images/recipe-radar-new.png";
import ConfirmationModal from "../Modals/ConfirmationModal";
import NotificationModal from "../Modals/NotificationModal";

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();

  // Logout Function
  const handleLogout = () => {
    localStorage.clear();
    setShowNotification(true);
    setTimeout(() => {
      navigate("/signin");
    }, 1000);
  };

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      {/* Toggle Button */}
      <button className="btn-toggle" onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? <i className="bi bi-chevron-double-right"></i> : <i className="bi bi-chevron-double-left"></i>}
      </button>

      <NavLink to="/admin/dashboard" className="d-flex align-items-center mb-3 text-decoration-none custom-heading">
        {collapsed ? (
          <img src={RRlogo} alt="Logo" className="sidebar-logo ms-2" height={33} />
        ) : (
          <>
            <img src={RRlogo} alt="Logo" className="sidebar-logo" height={33} />
            <span className="fs-4 ms-2">Admin</span>
          </>
        )}
      </NavLink>

      <hr />

      {/* Sidebar Menu with Routing */}
      <ul className="nav nav-pills flex-column mb-auto">
        <li>
          <NavLink to="/admin/dashboard" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
            📈 {!collapsed && "Dashboard"}
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/manageusers" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
            🧑‍🍳 {!collapsed && "Manage Users"}
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/managerecipes" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
            🥘 {!collapsed && "Manage Recipes"}
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/managetags" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
            🏷️ {!collapsed && "Manage Tags"}
          </NavLink>
        </li>
      </ul>
      <div>
        <button className="btn btn-danger logout-btn"
          onClick={() => {
            setShowLogoutModal(true);
          }}
        >
          <i className="bi bi-box-arrow-right"></i>
          {collapsed ? ('') : (<span className="ms-2">Logout</span>)}
        </button>
      </div>
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
    </div>
  );
};

export default AdminSidebar;