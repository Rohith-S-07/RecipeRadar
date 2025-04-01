import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config";
import ConfirmationModal from "../Modals/ConfirmationModal";
import NotificationModal from "../Modals/NotificationModal";
import LottiePlayer from "../LottiePlayer";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");
    const [userToDelete, setUserToDelete] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${config.BASE_URL}/admin/getUsers`);
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users", error);
        } finally {
            setLoading(false)
        }
    };

    const handleDeleteUser = async () => {
        if (!userToDelete) return;

        try {

            await axios.delete(`${config.BASE_URL}/admin/deleteUser/${userToDelete}`);
            setUsers(users.filter(user => user._id !== userToDelete));
            setNotificationMessage("User deleted successfully!");
        } catch (error) {
            setNotificationMessage("Error deleting user");
        }

        setIsNotificationOpen(true);
        setIsConfirmOpen(false);
        setUserToDelete(null);
    };

    return (
        <div className="p-3">
            <h2 className="custom-heading pb-3">Manage Users</h2>
            {loading ? (
                <div className="text-muted text-center">
                    <LottiePlayer src="https://lottie.host/10236891-3b0a-4744-be9f-74e8fd54026d/in2dZGOmWu.lottie" />
                    <br />
                    Loading users data....
                </div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-striped rounded-3 overflow-hidden shadow">
                        <thead className="table-dark">
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.description || "No description"}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            disabled={user.email === 'rradmin@gmail.com' ? true : false}
                                            onClick={() => {
                                                setUserToDelete(user._id);
                                                setIsConfirmOpen(true);
                                            }}
                                        >
                                            Delete
                                            <i className="bi bi-trash ms-1"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {/* Confirmation Modal for Delete */}
            <ConfirmationModal
                isOpen={isConfirmOpen}
                onRequestClose={() => setIsConfirmOpen(false)}
                onConfirm={handleDeleteUser}
                message="Are you sure you want to delete this user?"
            />

            {/* Notification Modal */}
            <NotificationModal
                isOpen={isNotificationOpen}
                onRequestClose={() => setIsNotificationOpen(false)}
                message={notificationMessage}
            />
        </div>
    );
};

export default ManageUsers;