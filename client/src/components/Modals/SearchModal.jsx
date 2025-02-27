import React, { useEffect, useState } from "react";
import { BsChevronDoubleDown } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../config";
import LottiePlayer from "../LottiePlayer";

const SearchModal = ({ show, onClose }) => {
    const [modalHeight, setModalHeight] = useState("90dvh");
    const [recipes, setRecipes] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [animationClass, setAnimationClass] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (show) {
            setAnimationClass("show");
            document.body.style.overflow = "hidden";
            fetchRecipes();
        } else {
            setAnimationClass("hide");
            setTimeout(() => {
                if (!show) setAnimationClass("");
            }, 500);
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
        setLoading(true);
        try {
            const response = await axios.get(`${config.BASE_URL}/recipes`);
            setRecipes(response.data);
        } catch (error) {
            console.error("Error fetching recipes:", error);
        } finally {
            setLoading(false); // Stop loading
        }
    };
    
    const handleSearch = async (e) => {
        const query = e.target.value;
        setSearchQuery(query);
    
        if (query.length > 2) {
            setLoading(true);
            try {
                const response = await axios.get(`${config.BASE_URL}/recipes/search?query=${query}`);
                setRecipes(response.data);
            } catch (error) {
                console.error("Error searching recipes:", error);
            } finally {
                setLoading(false);
            }
        } else {
            fetchRecipes();
        }
    };
    return (
        <div className={`search-modal ${animationClass}`} onClick={onClose}>
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

                <div className="search-results mt-3">
                    {loading ? (
                        <div className="text-muted text-center">
                            <LottiePlayer src="https://lottie.host/10236891-3b0a-4744-be9f-74e8fd54026d/in2dZGOmWu.lottie" />
                            <br />
                            Loading recipes...
                        </div>
                    ) : recipes.length === 0 ? (
                        <div className="text-muted text-center">
                            <LottiePlayer src="https://lottie.host/e9ab5ffe-f970-4d48-a59d-82747af4c1e7/1DMwFNP5bB.lottie" />
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
