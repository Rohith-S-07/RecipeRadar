import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../config";
import ConfirmationModal from "../Modals/ConfirmationModal";
import NotificationModal from "../Modals/NotificationModal";
import LottiePlayer from "../LottiePlayer";

const ManageRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");
    const [recipeToDelete, setRecipeToDelete] = useState(null);

    useEffect(() => {
        fetchRecipes();
    }, []);

    const fetchRecipes = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${config.BASE_URL}/admin/getRecipes`);
            setRecipes(response.data);
        } catch (error) {
            console.error("Error fetching recipes", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteRecipe = async () => {
        if (!recipeToDelete) return;

        try {
            await axios.delete(`${config.BASE_URL}/admin/deleteRecipe/${recipeToDelete}`);
            setRecipes(recipes.filter(recipe => recipe._id !== recipeToDelete));
            setNotificationMessage("Recipe deleted successfully!");
        } catch (error) {
            setNotificationMessage("Error deleting recipe");
        }

        setIsNotificationOpen(true);
        setIsConfirmOpen(false);
        setRecipeToDelete(null);
    };

    return (
        <div className="p-3">
            <h2 className="custom-heading pb-3">Manage Recipes</h2>

            {loading ? (
                <div className="text-muted text-center">
                    <LottiePlayer src="https://lottie.host/10236891-3b0a-4744-be9f-74e8fd54026d/in2dZGOmWu.lottie" />
                    <br />
                    Loading recipes data....
                </div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-striped rounded-3 overflow-hidden table-bordered">
                        <thead className="table-dark">
                            <tr>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Posted Date</th>
                                <th>Tags</th>
                                <th>Comments</th>
                                <th>Avg Rating</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recipes.map(recipe => (
                                <tr key={recipe._id}>
                                    {/* Recipe Image */}
                                    <td>
                                        <img
                                            src={`${config.BASE_URL}${recipe.image}`}
                                            alt={recipe.title}
                                            style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "5px" }}
                                        />
                                    </td>

                                    {/* Recipe Title */}
                                    <td>{recipe.title}</td>

                                    {/* Author Name */}
                                    <td>{recipe.authorName}</td>

                                    {/* Posted Date */}
                                    <td>{new Date(recipe.createdAt).toLocaleDateString()}</td>
                                    {/* Tags */}
                                    <td>
                                        {recipe.tags?.length > 0
                                            ? recipe.tags.slice(0, 3).join(", ") + (recipe.tags.length > 3 ? "..." : "")
                                            : "No Tags"}
                                    </td>

                                    {/* Total Comments */}
                                    <td>{recipe.comments?.length || 0}</td>

                                    {/* Average Rating */}
                                    <td>
                                        {recipe.ratings?.length > 0
                                            ? (recipe.ratings.reduce((sum, r) => sum + r.rating, 0) / recipe.ratings.length).toFixed(1) + ' ⭐'
                                            : "N/A"}
                                    </td>

                                    {/* Actions */}
                                    <td>
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => {
                                                navigate(`view/${recipe._id}`)
                                            }}
                                        >
                                            view
                                            <i className="bi bi-eye ms-1"></i>
                                        </button>

                                        <button
                                            className="ms-2 btn btn-danger btn-sm"
                                            onClick={() => {
                                                setRecipeToDelete(recipe._id);
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
                onConfirm={handleDeleteRecipe}
                message="Are you sure you want to delete this recipe?"
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

export default ManageRecipes;