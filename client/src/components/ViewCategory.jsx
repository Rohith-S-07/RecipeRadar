import React from 'react';
import { useParams } from 'react-router-dom';
import categoriesData from '../data/categoriesData'; // Import category data
import hello from '../assets/images/salad.jpg'


const ViewCategory = () => {
    const { category } = useParams(); // Get category from URL
    const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1); // Capitalize first letter

    // Find the category data from the imported file
    const categoryData = categoriesData.find(cat => cat.name.toLowerCase() === category.toLowerCase());

    return (
        <>
            <section className="row m-0 mb-2 align-items-center type-header">
                <div className="col-md-4 d-flex align-items-center flex-column">
                    {categoryData ? (
                        <img
                            src={categoryData.image}
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
                    <div className='recipe-card text-center'>
                        {categoryData && <img src={categoryData.image} alt={categoryData.name} className='img-fluid' />}
                        <div className='text-warning ratings'>
                            <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
                            <i className="fa-regular fa-star"></i>
                            <span className='text-dark'> 4.2</span>
                        </div>
                        <div className='recipe-title'>Chocolate Pancake</div>
                    </div>
                </div>
            </section>

            <section className='all-recipe-section'>
                <p className='text-stroke2 fs-1 text-center'> ALL {formattedCategory.toUpperCase()} RECIPES</p>
                <div className='recipe-container mx-5'>
                    <div className='recipe-card text-center'>
                        <img src={hello} alt="" className='img-fluid' />
                        <div className='text-warning ratings'>
                            <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-regular fa-star"></i>
                            <span className='text-dark'> 4.2</span>
                        </div>
                        <div className='recipe-title'>Chocolate Pancake</div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ViewCategory;