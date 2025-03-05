import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config";
import NotificationModal from "./Modals/NotificationModal";

const EditRecipe = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [ingredients, setIngredients] = useState([{ name: "", quantity: "" }]);
    const [steps, setSteps] = useState([""]);
    const [cookingTime, setCookingTime] = useState("");
    const [servings, setServings] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [tags, setTags] = useState([]);
    const [videoLink, setVideoLink] = useState("");
    const [image, setImage] = useState(null);
    const [oldImage, setOldImage] = useState("");
    const [notification, setNotification] = useState({ isOpen: false, message: "" });

    const predefinedTags = [
        "Breakfast", "Lunch", "Dinner", "Snacks", "Desserts", "Drinks",
        "Vegan", "Vegetarian", "Dairy-Free", "Gluten-Free", "Keto", "Low-Carb",
        "High-Protein", "Low-Calorie", "Balanced", "Fiber-Rich", "Indian",
        "Mexican", "Italian", "Chinese", "Spicy", "Sweet", "Savory", "Fast Food"
    ];

    useEffect(() => {
        axios.get(`${config.BASE_URL}/recipes/view/${id}`)
            .then(response => {
                const recipe = response.data;
                setTitle(recipe.title);
                setDescription(recipe.description);
                setIngredients(recipe.ingredients);
                setSteps(recipe.steps);
                setCookingTime(recipe.cookingTime);
                setServings(recipe.servings);
                setDifficulty(recipe.difficulty);
                setTags(recipe.tags);
                setVideoLink(recipe.videoLink || "");
                setOldImage(recipe.image);
            })
            .catch(error => {
                console.error("Error fetching recipe:", error);
            });
    }, [id]);

    const toggleTag = (tag) => {
        setTags(prevTags =>
            prevTags.includes(tag) ? prevTags.filter(t => t !== tag) : [...prevTags, tag]
        );
    };

    const calculateDifficulty = (time) => {
        if (time <= 15) return 'Easy';
        if (time <= 45) return 'Medium';
        return 'Hard';
    };

    const handleIngredientChange = (index, field, value) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients[index][field] = value;
        setIngredients(updatedIngredients);
    };

    const handleStepChange = (index, value) => {
        const updatedSteps = [...steps];
        updatedSteps[index] = value;
        setSteps(updatedSteps);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("cookingTime", cookingTime);
        formData.append("servings", servings);
        formData.append("difficulty", calculateDifficulty(cookingTime));
        formData.append("videoLink", videoLink);

        if (image) {
            formData.append("image", image);
        } else {
            formData.append("image", oldImage); // Keep old image if not updated
        }

        ingredients.forEach((ingredient, index) => {
            formData.append(`ingredients[${index}][name]`, ingredient.name);
            formData.append(`ingredients[${index}][quantity]`, ingredient.quantity);
        });

        steps.forEach((step, index) => {
            formData.append(`steps[${index}]`, step);
        });

        tags.forEach((tag, index) => {
            formData.append(`tags[${index}]`, tag);
        });

        try {
            await axios.put(`${config.BASE_URL}/recipes/edit/${id}`, formData, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
                    "Content-Type": "multipart/form-data"
                }
            });

            setNotification({ isOpen: true, message: "Recipe updated successfully!" });
            navigate(`/recipes/view/${id}`);

        } catch (error) {
            console.error("Error updating recipe:", error);
            setNotification({ isOpen: true, message: "Failed to update recipe. Try again!" });
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center text-custom fs-2 pb-3">Edit Recipe</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input type="text" className="form-control text-start" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>

                {/* Steps Editing */}
                <div className="mb-3">
                    <label className="form-label">Steps</label>
                    {steps.map((step, index) => (
                        <input
                            key={index}
                            type="text"
                            className="form-control  text-start mb-2"
                            value={step}
                            onChange={(e) => handleStepChange(index, e.target.value)}
                        />
                    ))}
                </div>

                {/* Cooking Time & Servings */}
                <div className="row">
                    <div className="col-sm-4">
                        <label className="form-label">Cooking Time (min)</label>
                        <input type="number" className="form-control" value={cookingTime}
                            onChange={(e) => {
                                const time = Math.max(1, parseInt(e.target.value) || 1);
                                setCookingTime(time);
                                setDifficulty(calculateDifficulty(time));
                            }} required />
                    </div>
                    <div className="col-sm-4">
                        <label className="form-label">Servings</label>
                        <input type="number" className="form-control" value={servings} onChange={(e) => setServings(Math.max(1, parseInt(e.target.value) || 1))} required />
                    </div>
                    <div className="col-sm-4">
                        <label className="form-label">Difficulty</label>
                        <input type="text" className="form-control" value={difficulty} disabled />
                    </div>
                </div>

                {/* Tags */}
                <div className="mb-3">
                    <label className="form-label">Select Tags</label>
                    <div className="d-flex flex-wrap gap-2">
                        {predefinedTags.map(tag => (
                            <button key={tag} type="button"
                                className={`btn btn-sm ${tags.includes(tag) ? 'btn-primary' : 'btn-outline-secondary'}`}
                                onClick={() => toggleTag(tag)}>
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>


                {/* Image Preview */}
                <div className="mb-3">
                    <label className="form-label">Current Image</label>
                    {oldImage && <img src={`${config.BASE_URL}${oldImage}`} alt="Recipe" className="img-thumbnail d-block mb-2" width="200" />}
                    <input type="file" className="form-control" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
                </div>

                {/* Video Link */}
                <div className="mb-3">
                    <label className="form-label">YouTube Video Link</label>
                    <input type="url" className="form-control" value={videoLink} onChange={(e) => setVideoLink(e.target.value)} placeholder="Enter YouTube video URL" />
                </div>

                <button type="submit" className="btn btn-success w-100 mb-3">Update Recipe</button>
            </form>

            {/* Notification Modal */}
            <NotificationModal
                isOpen={notification.isOpen}
                onRequestClose={() => setNotification({ isOpen: false, message: "" })}
                message={notification.message}
            />
        </div>
    );
};

export default EditRecipe;