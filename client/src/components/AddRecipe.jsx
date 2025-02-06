import React, { useState } from 'react';
import axios from 'axios';
import config from '../config';

const AddRecipe = ({ handleAddRecipe }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState([{ name: '', quantity: '' }]);
    const [steps, setSteps] = useState(['']);
    const [image, setImage] = useState(null);
    const [cookingTime, setCookingTime] = useState('');
    const [servings, setServings] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [tags, setTags] = useState([]);

    const predefinedTags = [
        "Breakfast", "Lunch", "Dinner", "Snacks", "Desserts", "Drinks",
        "Vegan", "Vegetarian", "Dairy-Free", "Gluten-Free", "Keto", "Low-Carb",
        "High-Protein", "Low-Calorie", "Balanced", "Fiber-Rich", "Indian",
        "Mexican", "Italian", "Chinese", "Spicy", "Sweet", "Savory",
        "Fast Food", "Street Food"
    ];

    const userData = JSON.parse(localStorage.getItem('userData'));
    const userID = userData?.id || '';

    const toggleTag = (tag) => {
        setTags(prevTags =>
            prevTags.includes(tag)
                ? prevTags.filter(t => t !== tag)
                : [...prevTags, tag]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userID) {
            console.error("User ID not found!");
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('cookingTime', cookingTime);
        formData.append('servings', servings);
        formData.append('difficulty', difficulty);
        formData.append('image', image);
        formData.append('author', userID);

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
            console.log("Recipe added successfully:", response.data);
            handleAddRecipe(response.data.recipe);
        } catch (error) {
            console.error("Error adding recipe:", error);
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

                {/* Cooking Time, Servings, Difficulty - Inline */}
                <div className="row">
                    <div className="col-sm-4">
                        <label className="form-label">Cooking Time (min)</label>
                        <input type="number" className="form-control" value={cookingTime} onChange={(e) => setCookingTime(Math.max(1, parseInt(e.target.value) || 1))} required />
                    </div>
                    <div className="col-sm-4">
                        <label className="form-label">Servings</label>
                        <input type="number" className="form-control" value={servings} onChange={(e) => setServings(Math.max(1, parseInt(e.target.value) || 1))} required />
                    </div>
                    <div className="col-sm-4">
                        <label className="form-label">Difficulty</label>
                        <select className="form-select" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} required>
                            <option value="">Select</option>
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>
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

                <button type="submit" className="btn btn-primary w-100 mb-3">Submit Recipe</button>
            </form>
        </div>
    );
};

export default AddRecipe;