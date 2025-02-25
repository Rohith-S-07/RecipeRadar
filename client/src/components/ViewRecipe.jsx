import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../config";

import { FaHeart } from "react-icons/fa";

const ViewRecipe = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        fetchRecipe();
        setTimeout(() => {
            document.documentElement.style.overflowY = "auto";
        }, 100);
    }, []);

    const fetchRecipe = async () => {
        try {
            const response = await axios.get(`${config.BASE_URL}/recipes/${id}`);
            setRecipe(response.data);
        } catch (error) {
            console.error("Error fetching recipe:", error);
        }
    };

    if (!recipe) {
        return <p className="text-center mt-5">Loading...</p>;
    }


    return (
        <div className="recipe-page m-3 p-3">
            <span className="wishlist-btn">
                <FaHeart className="text-danger fs-2" />
            </span>
            <section className="row mb-2 align-items-center justify-content-between">
                <div className="col-md-5 d-flex flex-column">
                    <img
                        src={`${config.BASE_URL}${recipe.image}`}
                        alt={recipe.title}
                        className="img-fluid rounded shadow recipe-page-img"
                    />
                </div>

                <div className="col-md-7 mt-3 text-center">
                    <h1 className='text-custom pb-3'>{recipe.title}</h1>
                    <h3 className='fw-light ps-3 fs-5'>{recipe.authorName || 'Anonymous'}</h3>
                    <p className="text-secondary fs-6">{new Date(recipe.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric', month: 'long', day: 'numeric'
                    })}</p>
                    <div className='text-warning ratings'>
                        <b className='text-dark me-2'> 4.2</b>
                        <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                        <span className="text-secondary ms-2">(12)</span>
                    </div>
                </div>

            </section>

            <div className="row mt-4">

                <hr />
                <p className='text-dark p-2 text-center'>
                    {recipe.description}
                </p>

                {/* Ingredients Section */}
                <div className="col-md-6">
                    <h4 className="fw-semibold">Ingredients 🛒</h4>
                    <div className="table-responsive rounded">
                        <table className="table table-bordered text-center">
                            <thead className="table-primary">
                                <tr>
                                    <th>Ingredient</th>
                                    <th>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recipe.ingredients.map((ingredient, index) => (
                                    <tr key={index}>
                                        <td>{ingredient.name}</td>
                                        <td>{ingredient.quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Steps Section */}
                <div className="col-md-6">
                    <h4 className="fw-semibold">Steps to Cook 👨‍🍳</h4>
                    <ul className="list-group list-group-flush">
                        {recipe.steps.map((step, index) => (
                            <li key={index} className="list-group-item">
                                <strong>Step {index + 1}: </strong> {step}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Additional Recipe Details */}
            <div className="row mt-4">
                <div className="col-md-4 text-center">
                    <h5 className="fw-semibold">Cooking Time ⏳</h5>
                    <p className="text-primary fw-bold">{recipe.cookingTime} min</p>
                </div>
                <div className="col-md-4 text-center">
                    <h5 className="fw-semibold">Servings 🍽</h5>
                    <p className="text-primary fw-bold">{recipe.servings}</p>
                </div>
                <div className="col-md-4 text-center">
                    <h5 className="fw-semibold">Difficulty 🔥</h5>
                    <p className={`fw-bold ${recipe.difficulty === "Easy" ? "text-success" : recipe.difficulty === "Medium" ? "text-warning" : "text-danger"}`}>
                        {recipe.difficulty}
                    </p>
                </div>
            </div>

            {/* Tags Section */}
            <div className="mt-4">
                <div className="d-flex flex-wrap gap-2">
                    <h5 className="fw-semibold text-dark">🏷 Tags</h5>
                    {recipe.tags.map((tag, index) => (
                        <span key={index} className="badge bg-primary px-3 fs-6">{tag}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ViewRecipe;