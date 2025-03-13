import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../config';
import LottiePlayer from './LottiePlayer';
import ConfirmationModal from './Modals/ConfirmationModal';
import NotificationModal from './Modals/NotificationModal';

const MyRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [menuOpen, setMenuOpen] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");
    const [selectedRecipeId, setSelectedRecipeId] = useState(null);
    const [showWishlist, setShowWishlist] = useState(false);  // Toggle state
    const navigate = useNavigate();

    useEffect(() => {
        fetchRecipes();
    }, [navigate, showWishlist]);

    const fetchRecipes = async () => {
        try {
            const token = localStorage.getItem("authToken");
            if (!token) {
                navigate('/');
                return;
            }

            const endpoint = showWishlist
                ? `${config.BASE_URL}/wishlist/recipes`
                : `${config.BASE_URL}/recipes/my-recipes`;

            const response = await axios.get(endpoint, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setRecipes(response.data);
        } catch (error) {
            console.error(`Error fetching ${showWishlist ? "wishlist" : "user"} recipes:`, error);
        } finally {
            setLoading(false);
        }
    };

    const confirmDelete = (recipeId) => {
        setSelectedRecipeId(recipeId);
        setShowConfirmModal(true);
    };

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem("authToken");
            await axios.delete(`${config.BASE_URL}/recipes/delete/${selectedRecipeId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setRecipes(recipes.filter(recipe => recipe._id !== selectedRecipeId));
            setNotificationMessage("Recipe deleted successfully!");
            setShowNotification(true);
        } catch (error) {
            console.error("Error deleting recipe:", error);
            setNotificationMessage("Failed to delete recipe.");
            setShowNotification(true);
        } finally {
            setShowConfirmModal(false);
        }
    };

    return (
        <div className="p-3">
            <div className="d-flex justify-content-between align-items-center">
                <h2 className="text-stroke2 fs-2">
                    {showWishlist ? 'Saved Recipes' : 'My Creations'}
                </h2>

                {/* Toggle Button */}
                <button
                    className={`btn ${showWishlist ? 'custom-btn-primary text-white' : 'custom-btn-outline-primary'}`}
                    onClick={() => setShowWishlist(!showWishlist)}
                >
                    {showWishlist ? 'Show My Creations' : 'Show Saved Recipes'}
                </button>
            </div>

            {loading ? (
                <div className="text-muted text-center">
                    <LottiePlayer src="https://lottie.host/10236891-3b0a-4744-be9f-74e8fd54026d/in2dZGOmWu.lottie" />
                    <br />
                    Loading recipes...
                </div>
            ) : recipes.length > 0 ? (
                <div className="my-recipe-container mt-3">
                    {recipes.map(recipe => (
                        <div key={recipe._id} className="my-recipe-card text-center position-relative">
                            {!showWishlist && (
                                <div className="my-recipes-menu">
                                    <i className="bi bi-list"
                                        style={{ cursor: "pointer" }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setMenuOpen(menuOpen === recipe._id ? null : recipe._id);
                                        }}
                                    ></i>
                                    {menuOpen === recipe._id && (
                                        <div className="menu-dropdown">
                                            <div
                                                className="my-recipes-menu-item"
                                                onClick={() => navigate(`/recipes/edit/${recipe._id}`)}
                                            >
                                                <i className="bi bi-pencil-fill menu-icon"></i>
                                            </div>
                                            <div
                                                className="my-recipes-menu-item text-danger"
                                                onClick={() => confirmDelete(recipe._id)}
                                            >
                                                <i className="bi bi-trash3-fill menu-icon"></i>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            <div onClick={() => navigate(`/recipes/view/${recipe._id}`)} style={{ cursor: "pointer" }}>
                                <img src={`${config.BASE_URL}${recipe.image}`} alt={recipe.title} className="img-fluid" />
                                <div className="my-recipe-title mt-0">{recipe.title}</div>
                                <p className="text-secondary my-recipe-date mb-0">{new Date(recipe.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric', month: 'long', day: 'numeric'
                                })}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-muted text-center">
                    <LottiePlayer src="https://lottie.host/e9ab5ffe-f970-4d48-a59d-82747af4c1e7/1DMwFNP5bB.lottie" />
                    <br />
                    {showWishlist &&
                        "You haven't saved any recipes yet."}
                    <br />
                    {!showWishlist && (
                        <button
                            onClick={() => navigate('/recipes/addrecipe')}
                            className='btn custom-btn-primary text-light mt-2'
                        >
                            <i className="bi bi-plus-circle me-2 mb-1 fs-3"></i>
                            Add Now
                        </button>
                    )}
                </div>
            )}

            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={showConfirmModal}
                onRequestClose={() => setShowConfirmModal(false)}
                onConfirm={handleDelete}
                message="Are you sure you want to delete this recipe?"
            />

            {/* Notification Modal */}
            <NotificationModal
                isOpen={showNotification}
                onRequestClose={() => setShowNotification(false)}
                message={notificationMessage}
            />
        </div>
    );
};

export default MyRecipes;