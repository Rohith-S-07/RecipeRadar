import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../config";

const ViewRecipe = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        fetchRecipe();
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
        <div className="m-3 p-2">
            {/* Recipe Title */}
            <h2 className="text-center fw-bold">{recipe.title}</h2>

            {/* Recipe Image */}
            <div className="text-center my-4">
                <img
                    src={`${config.BASE_URL}${recipe.image}`}
                    alt={recipe.title}
                    className="img-fluid rounded shadow"
                    style={{ maxWidth: "450px", height: "auto" }}
                />
            </div>

            {/* Recipe Description */}
            <p className="text-muted text-center">{recipe.description}</p>

            <div className="row mt-4">
                {/* Ingredients Section */}
                <div className="col-md-6">
                    <h4 className="fw-semibold">🛒 Ingredients</h4>
                    <div className="table-responsive">
                        <table className="table table-bordered text-center">
                            <thead className="table-dark">
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
                    <h4 className="fw-semibold">👨‍🍳 Steps to Cook</h4>
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
                    <h5 className="fw-semibold">⏳ Cooking Time</h5>
                    <p className="text-primary fw-bold">{recipe.cookingTime} min</p>
                </div>
                <div className="col-md-4 text-center">
                    <h5 className="fw-semibold">🍽 Servings</h5>
                    <p className="text-primary fw-bold">{recipe.servings}</p>
                </div>
                <div className="col-md-4 text-center">
                    <h5 className="fw-semibold">🔥 Difficulty</h5>
                    <p className={`fw-bold ${recipe.difficulty === "Easy" ? "text-success" : recipe.difficulty === "Medium" ? "text-warning" : "text-danger"}`}>
                        {recipe.difficulty}
                    </p>
                </div>
            </div>

            {/* Tags Section */}
            <div className="mt-4">
                <h5 className="fw-semibold">🏷 Tags</h5>
                <div className="d-flex flex-wrap gap-2">
                    {recipe.tags.map((tag, index) => (
                        <span key={index} className="badge bg-primary p-2">{tag}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ViewRecipe;