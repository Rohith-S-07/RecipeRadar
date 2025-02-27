import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import categoriesData from '../data/categoriesData';
import config from '../config'
import LottiePlayer from './LottiePlayer';

const ViewCategory = () => {
    const { category } = useParams();
    const navigate = useNavigate();
    const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);


    const [recipes, setRecipes] = useState([]);

    // Find the category data from the imported file
    const categoryData = categoriesData.find(cat => cat.name.toLowerCase() === category.toLowerCase());

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get(`${config.BASE_URL}/recipes/category/${category}`);
                const filteredRecipes = response.data.filter(recipe => recipe.tags.includes(category));
                setRecipes(filteredRecipes);
            } catch (error) {
                console.error("Error fetching recipes:", error);
            }
        };

        fetchRecipes();
    }, [category]);

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
                    <h1 className='text-custom ps-2 pb-3'>{formattedCategory} Recipes</h1>
                    <p className='pe-3 text-dark'>
                        {categoryData ? categoryData.description : "No description available for this category."}
                    </p>
                </div>
            </section>

            <section>
                <p className='text-custom2 text-center mt-4'>
                    <img src="https://cdn-icons-png.flaticon.com/128/2617/2617955.png" alt="trophy" className='me-3 pb-1' height={40} />
                    TOP RATED {formattedCategory.toUpperCase()} RECIPES
                </p>
                <div className='recipe-container mb-2 mx-5'>
                    {recipes.length > 0 ? (
                        recipes.slice(0, 3).map(recipe => (
                            <div key={recipe._id} className='recipe-card text-center'
                                onClick={() => navigate(`/recipes/view/${recipe._id}`)}
                                style={{ cursor: "pointer" }}
                            >
                                <img src={`${config.BASE_URL}${recipe.image}`} alt={recipe.title} className='img-fluid' />
                                <div className='text-warning ratings'>
                                    <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
                                    <i className="fa-regular fa-star"></i>
                                    <span className='text-dark'> 4.2</span>
                                </div>
                                <div className='recipe-title'>{recipe.title}</div>
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

            {/* <section className='all-recipe-section'>
                <p className='text-stroke2 fs-1 text-center'> ALL {formattedCategory.toUpperCase()} RECIPES</p>
                <div className='recipe-container mx-5'>
                    {recipes.length > 0 ? (
                        recipes.map(recipe => (
                            <div key={recipe._id} className='recipe-card text-center'>
                                <img src={recipe.image} alt={recipe.title} className='img-fluid' />
                                <div className='text-warning ratings'>
                                    <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
                                    <i className="fa-regular fa-star"></i>
                                    <span className='text-dark'> 4.2</span>
                                </div>
                                <div className='recipe-title'>{recipe.title}</div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center">No recipes found in this category.</p>
                    )}
                </div>
            </section> */}
        </>
    );
};

export default ViewCategory;