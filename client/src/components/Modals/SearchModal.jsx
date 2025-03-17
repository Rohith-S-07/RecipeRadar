import React, { useEffect, useRef, useState } from "react";
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
    const searchRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (show) {
            setAnimationClass("show");
            document.body.style.overflow = "hidden";
            setTimeout(() => {
                searchRef.current.focus();
            }, 100);
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
            setLoading(false);
        }
    };

    useEffect(() => {
        if (searchQuery.length < 2) {
            fetchRecipes();
            return;
        }

        const delaySearch = setTimeout(async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${config.BASE_URL}/recipes/search?query=${searchQuery}`);
                setRecipes(response.data);
            } catch (error) {
                console.error("Error searching recipes:", error);
            } finally {
                setLoading(false);
            }
        }, 500);

        return () => clearTimeout(delaySearch);
    }, [searchQuery]);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className={`search-modal ${animationClass}`} onClick={onClose}>
            <div className="search-modal-content" style={{ height: modalHeight }} onClick={(e) => e.stopPropagation()}>
                <button className="btn close-btn" onClick={onClose}>
                    <i className="bi bi-chevron-double-down"></i>
                </button>
                <div className="d-flex justify-content-between align-items-center">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Start typing to Search"
                        value={searchQuery}
                        ref={searchRef}
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
                                <div key={recipe._id} className='search-recipe-card text-center'
                                    onClick={() => navigate(`/recipes/view/${recipe._id}`)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <img src={`${config.BASE_URL}${recipe.image}`} alt={recipe.title} className='img-fluid search-recipe-card-img' />
                                    <div className='search-recipe-title'>{recipe.title}</div>
                                    <div className='search-recipe-card-rating'>
                                        <b className='text-dark me-1'>
                                            {recipe.averageRating ? Number(recipe.averageRating).toFixed(1) : '0.0'}
                                        </b>
                                        <i className="fa-solid fa-star text-warning" />
                                    </div>

                                    <div className='search-recipe-bottom-container'>
                                        <div className='recipe-time'>⏳{recipe.cookingTime}mins</div>
                                        <div className='servings'>🍽{recipe.servings}</div>
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
