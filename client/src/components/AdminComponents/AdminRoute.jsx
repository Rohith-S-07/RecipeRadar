import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {

    const storedUser = localStorage.getItem("userData");

    if (!storedUser) {
        return <Navigate to="/signin" replace />;
    }

    try {
        const user = JSON.parse(storedUser);

        if (user.role !== "admin") {
            return <Navigate to="/forbidden" replace />;
        }

        return children;
    } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("userData");
        return <Navigate to="/signin" replace />;
    }
};

export default AdminRoute;