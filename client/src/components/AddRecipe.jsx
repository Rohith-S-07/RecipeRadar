import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import config from '../config';
import NotificationModal from './Modals/NotificationModal';
import { useNavigate } from 'react-router-dom';

const AddRecipe = ({ handleAddRecipe }) => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState([{ name: '', quantity: '' }]);
    const [steps, setSteps] = useState(['']);
    const [image, setImage] = useState(null);
    const [cookingTime, setCookingTime] = useState('');
    const [servings, setServings] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [tags, setTags] = useState([]);
    const [videoLink, setVideoLink] = useState('');
    const [notification, setNotification] = useState({ isOpen: false, message: '' });
    const [nutrition, setNutrition] = useState({
        calories: 0,
        protein: 0,
        carbohydrates: 0,
        fat: 0,
        sugar: 0,
        fiber: 0,
        sodium: 0,
        calcium: 0,
        iron: 0
    });

    const titleRef = useRef(null);
    const descriptionRef = useRef(null);
    const cookingTimeRef = useRef(null);
    const servingsRef = useRef(null);
    const imageRef = useRef(null);

    const predefinedTags = [
        "Breakfast", "Lunch", "Dinner", "Snacks", "Desserts", "Drinks",
        "Vegan", "Vegetarian", "Dairy-Free", "Gluten-Free", "Keto", "Low-Carb",
        "High-Protein", "Low-Calorie", "Balanced", "Fiber-Rich", "Indian",
        "Mexican", "Italian", "Chinese", "Spicy", "Sweet", "Savory",
        "Fast Food"
    ];

    const userData = JSON.parse(localStorage.getItem('userData'));
    useEffect(()=>{
        if(!userData){
            navigate('/')
        }
    },[navigate]);

    const userID = userData?.id || '';
    const userName = userData?.name || 'Anonymous'

    const toggleTag = (tag) => {
        setTags(prevTags =>
            prevTags.includes(tag)
                ? prevTags.filter(t => t !== tag)
                : [...prevTags, tag]
        );
    };

    const calculateDifficulty = (time) => {
        if (time <= 15) return 'Easy';
        if (time <= 45) return 'Medium';
        return 'Hard';
    };

    const clearForm = () => {
        setTitle('');
        setDescription('');
        setIngredients([{ name: '', quantity: '' }]);
        setSteps(['']);
        setImage(null);
        setCookingTime('');
        setServings('');
        setDifficulty('');
        setTags([]);
        setVideoLink('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userID) {
            console.error("User ID not found!");
            return;
        }

        if (!title.trim()) {
            titleRef.current.focus();
            return;
        }
        if (!description.trim()) {
            descriptionRef.current.focus();
            return;
        }
        if (!cookingTime) {
            cookingTimeRef.current.focus();
            return;
        }
        if (!servings) {
            servingsRef.current.focus();
            return;
        }
        if (!image) {
            imageRef.current.focus();
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('cookingTime', cookingTime);
        formData.append('servings', servings);
        formData.append('difficulty', calculateDifficulty(cookingTime));
        formData.append('image', image);
        formData.append('authorID', userID);
        formData.append('authorName', userName);
        formData.append('videoLink', videoLink);

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
            const response = await axios.post(`${config.BASE_URL}/recipes/add`, formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            setNutrition(response.data.recipe.nutrition);
            setNotification({ isOpen: true, message: 'Recipe added successfully!' });
            clearForm();

        } catch (error) {
            console.error("Error adding recipe:", error);
            setNotification({ isOpen: true, message: 'Failed to add recipe. Try again!' });
        }
    };
    return (
        <div className="mx-3 mt-4">
            <h2 className="text-center text-custom fs-1 pb-4">Add Recipe</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>

                {/* Ingredients */}
                <div className="mb-3">
                    <label className="form-label">Ingredients</label>
                    {ingredients.map((ingredient, index) => (
                        <div key={index} className="row mb-2">
                            <div className="col-6 mb-1">
                                <input type="text" className="form-control" placeholder="Name" value={ingredient.name}
                                    onChange={(e) => {
                                        const newIngredients = [...ingredients];
                                        newIngredients[index].name = e.target.value;
                                        setIngredients(newIngredients);
                                    }} required />
                            </div>
                            <div className="col-6">
                                <input type="text" className="form-control" placeholder="Quantity" value={ingredient.quantity}
                                    onChange={(e) => {
                                        const newIngredients = [...ingredients];
                                        newIngredients[index].quantity = e.target.value;
                                        setIngredients(newIngredients);
                                    }} required />
                            </div>
                        </div>
                    ))}
                    <button type="button" className="btn btn-outline-primary btn-sm mt-2" onClick={() => setIngredients([...ingredients, { name: '', quantity: '' }])}>+ Add Ingredient</button>
                </div>

                {/* Steps */}
                <div className="mb-3">
                    <label className="form-label">Steps</label>
                    {steps.map((step, index) => (
                        <textarea key={index} className="form-control mb-2" placeholder={`Step ${index + 1}`} value={step}
                            onChange={(e) => {
                                const newSteps = [...steps];
                                newSteps[index] = e.target.value;
                                setSteps(newSteps);
                            }} required />
                    ))}
                    <button type="button" className="btn btn-outline-primary btn-sm mt-2" onClick={() => setSteps([...steps, ''])}>+ Add Step</button>
                </div>

                {/* Cooking Time, Servings, Difficulty */}
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

                {/* Selected Tags */}
                <div className="mb-3">
                    <label className="form-label">Selected Tags:</label>
                    <div className="border rounded p-2 bg-light">
                        {tags.length > 0 ? tags.join(', ') : "No tags selected"}
                    </div>
                </div>

                {/* Image Upload */}
                <div className="mb-3">
                    <label className="form-label">Upload Image</label>
                    <input type="file" className="form-control" accept="image/*" onChange={(e) => setImage(e.target.files[0])} required />
                </div>

                {/* YouTube Video Link */}
                <div className="mb-3">
                    <label className="form-label">YouTube Video Link (Optional)</label>
                    <input type="url" className="form-control" value={videoLink} onChange={(e) => setVideoLink(e.target.value)} placeholder="Enter YouTube video URL" />
                </div>

                <button type="submit" className="btn btn-primary w-100 mb-3">Submit Recipe</button>
            </form>

            {/* Notification Modal */}
            <NotificationModal
                isOpen={notification.isOpen}
                onRequestClose={() => setNotification({ isOpen: false, message: '' })}
                message={notification.message}
            />
        </div>

    );
};

export default AddRecipe;