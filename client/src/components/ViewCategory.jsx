import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import categoriesData from '../data/categoriesData';
import config from '../config';
import LottiePlayer from './LottiePlayer';

const ViewCategory = () => {
    const { category } = useParams();
    const navigate = useNavigate();
    const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);

    const [recipes, setRecipes] = useState([]);
    const [sortedRecipes, setSortedRecipes] = useState([]);
    const [sortOption, setSortOption] = useState("highest");  // Default sorting option

    const categoryData = categoriesData.find(cat => cat.name.toLowerCase() === category.toLowerCase());

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get(`${config.BASE_URL}/recipes/category/${category}`);
                const filteredRecipes = response.data.filter(recipe => recipe.tags.includes(category));
                setRecipes(filteredRecipes);
                sortRecipes(filteredRecipes, sortOption); // Sort immediately after fetching
            } catch (error) {
                console.error("Error fetching recipes:", error);
            }
        };

        fetchRecipes();
    }, [category]);

    // Sorting Logic
    const sortRecipes = (recipesToSort, option) => {
        let sorted = [...recipesToSort];

        switch (option) {
            case "highest":
                sorted.sort((a, b) => Number(b.averageRating) - Number(a.averageRating));
                break;
            case "lowest":
                sorted.sort((a, b) => Number(a.averageRating) - Number(b.averageRating));
                break;
            case "newest":
                sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case "oldest":
                sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                break;
            default:
                sorted = recipesToSort;
        }

        setSortedRecipes(sorted);
    };

    // Handle Sorting Option Change
    const handleSortChange = (e) => {
        const selectedOption = e.target.value;
        setSortOption(selectedOption);
        sortRecipes(recipes, selectedOption);
    };

    return (
        <>
            <section className="row m-0 mb-2 align-items-center type-header">
                <div className="col-md-4 d-flex align-items-center flex-column">
                    {categoryData ? (
                        <img
                            src={`/src/assets${categoryData.image}`}
                            alt={categoryData.name}
                            className="img-fluid type-img"
                        />
                    ) : (
                        <p>Image not found</p>
                    )}
                </div>

                <div className="col-md-8 mt-3">
                    <nav style={{ "--bs-breadcrumb-divider": '"👉"' }} aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <a href="/recipes">Recipes</a>
                            </li>
                            <li className="breadcrumb-item" aria-current="page">
                                {formattedCategory}
                            </li>
                        </ol>
                    </nav>
                    <h1 className='text-custom ps-2 pb-4'>{formattedCategory} Recipes</h1>
                    <p className='pe-3 text-dark'>
                        {categoryData ? categoryData.description : "No description available for this category."}
                    </p>
                </div>
            </section>

            {/* Sorting Options */}
            <div className="sorting-option">
                <select
                    className="form-select d-inline-block"
                    value={sortOption}
                    onChange={handleSortChange}
                >
                    <option value="highest">Highest Rated</option>
                    <option value="lowest">Lowest Rated</option>
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                </select>
            </div>

            {/* Display Recipes */}
            <section className=''>
                {/* <p className='text-custom2 text-center mt-4'>
                    <img src="https://cdn-icons-png.flaticon.com/128/2617/2617955.png" alt="trophy" className='me-3 pb-1' height={40} />
                    TOP RATED {formattedCategory.toUpperCase()} RECIPES
                </p> */}
                <div className='recipe-container mb-2'>
                    {sortedRecipes.length > 0 ? (
                        sortedRecipes.map(recipe => (
                            <div key={recipe._id} className='recipe-card text-center'
                                onClick={() => navigate(`/recipes/view/${recipe._id}`)}
                                style={{ cursor: "pointer" }}
                            >
                                <img src={`${config.BASE_URL}${recipe.image}`} alt={recipe.title} className='img-fluid recipe-card-img' />
                                <div className='recipe-title'>{recipe.title}</div>
                                <div className='recipe-card-rating'>
                                    <b className='text-dark me-1'>
                                        {recipe.averageRating ? Number(recipe.averageRating).toFixed(1) : '0.0'}
                                    </b>
                                    <i className="fa-solid fa-star text-warning" />
                                </div>

                                <div className='recipe-bottom-container'>
                                    <div className='recipe-time'>⏳{recipe.cookingTime} mins</div>
                                    <div className='servings'>🍽{recipe.servings}</div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center">
                            <LottiePlayer src="https://lottie.host/e9ab5ffe-f970-4d48-a59d-82747af4c1e7/1DMwFNP5bB.lottie" />
                            No recipes available for this category
                            <br />
                            <Link to={'/recipes'} className='btn custom-primary-text mt-2'> Explore other categories</Link>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default ViewCategory;





{/* <section className='all-recipe-section'>
    <p className='text-stroke2 fs-1 text-center'> ALL {formattedCategory.toUpperCase()} RECIPES</p>
    <div className='recipe-container mb-2 mx-5'>
        {
            recipes.map(recipe => (
                <div key={recipe._id} className='recipe-card text-center'
                    onClick={() => navigate(`/recipes/view/${recipe._id}`)}
                    style={{ cursor: "pointer" }}
                >
                    <img src={`${config.BASE_URL}${recipe.image}`} alt={recipe.title} className='img-fluid' />
                    <div className='text-warning ratings'>
                        <b className='text-dark me-2'>
                            {recipe.averageRating ? Number(recipe.averageRating).toFixed(1) : '0.0'}
                        </b>

                        {[1, 2, 3, 4, 5].map((value) => (
                            <i
                                key={value}
                                className={
                                    value <= Math.floor(Number(recipe.averageRating))
                                        ? "fa-solid fa-star"
                                        : value === Math.ceil(Number(recipe.averageRating)) &&
                                            !Number.isInteger(Number(recipe.averageRating))
                                            ? "fa-solid fa-star-half-stroke"
                                            : "fa-regular fa-star"
                                }
                            />
                        ))}
                    </div>
                    <div className='recipe-title'>{recipe.title}</div>
                </div>
            ))
        }
    </div>
</section> */}