import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import config from '../../config';
import '../../assets/styles/DialogBoxes.css';

const AddRecipeModal = ({ showModal, setShowModal, handleAddRecipe }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState([{ name: '', quantity: '' }]);
    const [steps, setSteps] = useState(['']);
    const [image, setImage] = useState('');
    const [cookingTime, setCookingTime] = useState('');
    const [servings, setServings] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [tags, setTags] = useState([]);
    const userData = JSON.parse(localStorage.getItem('userData'));
    const userID = userData?.id || '';
    // console.log("Retrieved user data:", userData);

    const addRecipe = () => {
        if (!userID) {
            console.error("User ID not found!");
            return;
        }

        const newRecipe = {
            title,
            description,
            ingredients,
            steps,
            image,
            cookingTime,
            servings,
            difficulty,
            tags,
            author: userID,
        };

        console.log("Sending data:", newRecipe);

        axios.post(`${config.BASE_URL}/recipes/add`, newRecipe, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log("Recipe added successfully:", response.data);
                handleAddRecipe(response.data.recipe);
                setShowModal(false);
            })
            .catch(err => console.error("Error adding recipe:", err));
    };

    const addIngredient = () => {
        setIngredients([...ingredients, { name: '', quantity: '' }]);
    };

    const addStep = () => {
        setSteps([...steps, '']);
    };

    return (
        <Modal
            isOpen={showModal}
            onRequestClose={() => setShowModal(false)}
            ariaHideApp={false}
            className="custom-modal"
            overlayClassName="modal-overlay"
            style={{ content: { width: 'auto', maxWidth: '600px', margin: 'auto' } }}
        >
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Add Recipe</h5>
                    <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body">
                    <div className="mb-3">
                        <label>Title</label>
                        <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label>Description</label>
                        <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label>Ingredients</label>
                        {ingredients.map((ingredient, index) => (
                            <div key={index} className="d-flex mb-2">
                                <input type="text" className="form-control me-2" placeholder="Name" value={ingredient.name} onChange={(e) => {
                                    const newIngredients = [...ingredients];
                                    newIngredients[index].name = e.target.value;
                                    setIngredients(newIngredients);
                                }} />
                                <input type="text" className="form-control" placeholder="Quantity" value={ingredient.quantity} onChange={(e) => {
                                    const newIngredients = [...ingredients];
                                    newIngredients[index].quantity = e.target.value;
                                    setIngredients(newIngredients);
                                }} />
                            </div>
                        ))}
                        <button className="btn btn-secondary" onClick={addIngredient}>+ Add Ingredient</button>
                    </div>
                    <div className="mb-3">
                        <label>Cooking Time (minutes)</label>
                        <input type="number" className="form-control" value={cookingTime} onChange={(e) => setCookingTime(e.target.value)} />
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-danger" onClick={() => setShowModal(false)}>Cancel</button>
                    <button className="btn btn-success" onClick={addRecipe}>Add Recipe</button>
                </div>
            </div>
        </Modal>
    );
};

export default AddRecipeModal;
