import React, { useEffect, useState } from "react";
import { BsChevronDoubleDown } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from '../../config';
import LottiePlayer from "../LottiePlayer";

const SearchModal = ({ show, onClose }) => {
    const [modalHeight, setModalHeight] = useState("90dvh");
    const [recipes, setRecipes] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (show) {
            document.body.style.overflow = "hidden";
            fetchRecipes();
        } else {
            document.body.style.overflow = "";
        }

        const adjustModalHeight = () => {
            const viewportHeight = window.innerHeight;
            setModalHeight(`${viewportHeight * 0.9}px`);
        };

        adjustModalHeight();
        window.addEventListener("resize", adjustModalHeight);

        return () => {
            window.removeEventListener("resize", adjustModalHeight);
        };
    }, [show]);

    const fetchRecipes = async () => {
        try {
            const response = await axios.get(`${config.BASE_URL}/recipes`); // Adjust API endpoint as needed
            setRecipes(response.data);
        } catch (error) {
            console.error("Error fetching recipes:", error);
        }
    };

    const handleSearch = async (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.length > 2) {
            try {
                const response = await axios.get(`${config.BASE_URL}/recipes/search?query=${query}`);
                setRecipes(response.data);
            } catch (error) {
                console.error("Error searching recipes:", error);
            }
        } else {
            fetchRecipes();
        }
    };

    return (
        <div className={`search-modal ${show ? "show" : ""}`} onClick={onClose}>
            <div className="search-modal-content" style={{ height: modalHeight }} onClick={(e) => e.stopPropagation()}>
                <button className="btn close-btn" onClick={onClose}>
                    <BsChevronDoubleDown />
                </button>
                <div className="d-flex justify-content-between align-items-center">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Start typing to Search"
                        value={searchQuery}
                        onChange={handleSearch}
                        autoFocus
                    />
                </div>

                {/* Recipe Cards */}
                <div className="search-results mt-3">
                    {recipes.length === 0 ? (
                        <div className="text-muted text-center">
                            <LottiePlayer src="https://lottie.host/f287ac77-eba7-4bc3-b689-e36b89592fbe/xILdJ5522u.lottie" />
                            <br />
                            No recipes found.
                            </div>
                    ) : (
                        <div className="search-recipe-container">
                            {recipes.map((recipe) => (
                                <div key={recipe._id} className="mb-3">
                                    <div
                                        className="search-recipe-card text-center"
                                        onClick={() => navigate(`/recipes/view/${recipe._id}`)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <img src={`${config.BASE_URL}${recipe.image}`} alt={recipe.title} className="img-fluid" />
                                        <div className="search-recipe-title">{recipe.title}</div>
                                        <div className="text-warning search-rating">
                                            <i className="fa-solid fa-star"></i>
                                            <span className="text-dark"> {recipe.rating || "4.0"}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchModal;