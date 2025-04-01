import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config";
import ConfirmationModal from "../Modals/ConfirmationModal"; // Import Confirmation Modal
import NotificationModal from "../Modals/NotificationModal"; // Import Notification Modal

const TagsManager = () => {
    const [tags, setTags] = useState([]);
    const [name, setName] = useState("");
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    // Modal states
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");
    const [tagToDelete, setTagToDelete] = useState(null);

    useEffect(() => {
        fetchTags();
    }, []);

    const fetchTags = async () => {
        try {
            const response = await axios.get(`${config.BASE_URL}/tags`);
            setTags(response.data);
        } catch (error) {
            console.error("Error fetching tags", error);
        }
    };

    const handleAddTag = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("name", name);
        formData.append("image", image);
        formData.append("description", description);

        try {
            const response = await axios.post(`${config.BASE_URL}/tags`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            setTags([...tags, response.data.tag]);
            setName("");
            setImage(null);
            setDescription("");
            setNotificationMessage("Tag added successfully!");
        } catch (error) {
            setNotificationMessage(error.response?.data?.message || "Error adding tag");
        }

        setIsNotificationOpen(true);
        setLoading(false);
    };

    const handleDeleteTag = async () => {
        if (!tagToDelete) return;

        try {
            await axios.delete(`${config.BASE_URL}/tags/${tagToDelete}`);
            setTags(tags.filter(tag => tag._id !== tagToDelete));
            setNotificationMessage("Tag deleted successfully!");
        } catch (error) {
            setNotificationMessage("Error deleting tag");
        }

        setIsNotificationOpen(true);
        setIsConfirmOpen(false);
        setTagToDelete(null);
    };

    return (
        <div className="p-3">
            <h2 className="custom-heading pb-3">Manage Tags</h2>

            <form onSubmit={handleAddTag} className="mb-4 p-3 border rounded bg-light">
                <div className="row">
                    <div className="col-6">
                        <label className="form-label">Tag Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="col-6">
                        <label className="form-label">Upload Image</label>
                        <input
                            type="file"
                            className="form-control"
                            onChange={(e) => setImage(e.target.files[0])}
                            required
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Adding..." : "Add Tag"}
                </button>
            </form>
            <div className="table-responsive">
                <table className="table table-striped rounded overflow-hidden shadow">
                    <thead className="table-dark">
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tags.map(tag => (
                            <tr key={tag._id}>
                                <td>
                                    <img src={`${config.BASE_URL}${tag.image}`} alt={tag.name} className="img-thumbnail" width="60" />
                                </td>
                                <td>{tag.name}</td>
                                <td>{tag.description}</td>
                                <td>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => {
                                            setTagToDelete(tag._id);
                                            setIsConfirmOpen(true);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Confirmation Modal for Delete */}
            <ConfirmationModal
                isOpen={isConfirmOpen}
                onRequestClose={() => setIsConfirmOpen(false)}
                onConfirm={handleDeleteTag}
                message="Are you sure you want to delete this tag?"
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

export default TagsManager;