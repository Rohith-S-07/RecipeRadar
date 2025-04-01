import React, { useState } from 'react';
import SearchModal from './Modals/SearchModal';
import hello from '../assets/images/salad.jpg'

const Recipes = () => {
  const [showSearchModal, setShowSearchModal] = useState(false);

  return (
    <>
      <div className="recipes-header text-center mt-2 mx-4">
        <p className="text-stroke2 text-light fw-light fs-1">Recipes</p>
        <p className="mx-auto text-light">
          We've curated recipes in every way possible, so finding your perfect dish is effortless!
          From dietary preferences to high-protein meals, quick bites to indulgent treats, and everything
          in between - RecipeRadar has it all. Whether you're craving something nutritious, spicy, or allergen-friendly,
          our collection is designed to match your taste and needs. Dive in and discover your next favorite recipe!
        </p>
      </div>

      {/* Search Bar */}
      <div
        className="search-bar-container text-center mt-3 mx-4"
        onClick={() => setShowSearchModal(true)}
        style={{
          cursor: "pointer",
          backgroundColor: "white",
          borderRadius: "5px",
          padding: "10px",
          border: "1px solid #ced4da",
        }}
      >
        <p className="text-muted mb-0">🔍 Search for recipes...</p>
      </div>

      {/* Category-Based Filtering */}
      <section className='mt-3 mx-4'>
        <div className="category-box me-0">
          <h3 className="text-custom2 ms-4 fs-3">Recipes By Meal Type</h3>
          <hr />

          <div className='tag-container mb-3'>
            <a href="/recipes/Breakfast" className="text-decoration-none text-dark">
              <div className='tag-card text-center'>
                <img src={`/src/assets/category-images/breakfast.jpg`} alt="" className='img-fluid' />
                <div className='tag-title'>Breakfast</div>
              </div>
            </a>
            <a href="/recipes/Lunch" className="text-decoration-none text-dark">
              <div className='tag-card text-center'>
                <img src={`/src/assets/category-images/lunch.jpg`} alt="" className='img-fluid' />
                <div className='tag-title'>Lunch</div>
              </div>
            </a>
            <a href="/recipes/Dinner" className="text-decoration-none text-dark">
              <div className='tag-card text-center'>
                <img src={`/src/assets/category-images/dinner.jpg`} alt="" className='img-fluid' />
                <div className='tag-title'>Dinner</div>
              </div>
            </a>
            <a href="/recipes/Snacks" className="text-decoration-none text-dark">
              <div className='tag-card text-center'>
                <img src={`/src/assets/category-images/snacks.jpg`} alt="" className='img-fluid' />
                <div className='tag-title'>Snacks</div>
              </div>
            </a>
            <a href="/recipes/Desserts" className="text-decoration-none text-dark">
              <div className='tag-card text-center'>
                <img src={`/src/assets/category-images/desserts.jpg`} alt="" className='img-fluid' />
                <div className='tag-title'>Desserts</div>
              </div>
            </a>
            <a href="/recipes/Drinks" className="text-decoration-none text-dark">
              <div className='tag-card text-center'>
                <img src={`/src/assets/category-images/drinks.jpg`} alt="" className='img-fluid' />
                <div className='tag-title'>Drinks</div>
              </div>
            </a>
          </div>
        </div>

        <div className="category-box me-0">
          <h3 className="text-custom2 ms-4 fs-3">Recipes By Dietary Preferences</h3>
          <hr />
          <div className='tag-container mb-3'>
            <a href="/recipes/Vegan" className="text-decoration-none text-dark">
              <div className='tag-card text-center'>
                <img src={`/src/assets/category-images/vegan.jpg`} alt="" className='img-fluid' />
                <div className='tag-title'>Vegan</div>
              </div>
            </a>
            <a href="/recipes/Vegetarian" className="text-decoration-none text-dark">
              <div className='tag-card text-center'>
                <img src={`/src/assets/category-images/vegetarian.jpg`} alt="" className='img-fluid' />
                <div className='tag-title'>Vegetarian</div>
              </div>
            </a>
            <a href="/recipes/Dairy-Free" className="text-decoration-none text-dark">
              <div className='tag-card text-center'>
                <img src={`/src/assets/category-images/dairy-free.jpg`} alt="" className='img-fluid' />
                <div className='tag-title'>Dairy-Free</div>
              </div>
            </a>
            <a href="/recipes/Gluten-Free" className="text-decoration-none text-dark">
              <div className='tag-card text-center'>
                <img src={`/src/assets/category-images/gluten-free.jpg`} alt="" className='img-fluid' />
                <div className='tag-title'>Gluten-Free</div>
              </div>
            </a>
            <a href="/recipes/Keto" className="text-decoration-none text-dark">
              <div className='tag-card text-center'>
                <img src={`/src/assets/category-images/keto.jpg`} alt="" className='img-fluid' />
                <div className='tag-title'>Keto</div>
              </div>
            </a>
            <a href="/recipes/Low-Carb" className="text-decoration-none text-dark">
              <div className='tag-card text-center'>
                <img src={`/src/assets/category-images/low-carb.jpg`} alt="" className='img-fluid' />
                <div className='tag-title'>Low-Carb</div>
              </div>
            </a>
          </div>
        </div>

        <div className="category-box me-0">
          <h3 className="text-custom2 ms-4 fs-3">Recipes By Nutrition</h3>
          <hr />
          <div className='tag-container mb-3'>
            <a href="/recipes/High-Protein" className="text-decoration-none text-dark">
              <div className='tag-card text-center'>
                <img src={`/src/assets/category-images/high-protein.jpg`} alt="" className='img-fluid' />
                <div className='tag-title'>High-Protein</div>
              </div>
            </a>
            <a href="/recipes/Low-Calorie" className="text-decoration-none text-dark">
              <div className='tag-card text-center'>
                <img src={`/src/assets/category-images/low-calorie.jpg`} alt="" className='img-fluid' />
                <div className='tag-title'>Low-Calorie</div>
              </div>
            </a>
            <a href="/recipes/Balanced" className="text-decoration-none text-dark">
              <div className='tag-card text-center'>
                <img src={`/src/assets/category-images/balanced.jpg`} alt="" className='img-fluid' />
                <div className='tag-title'>Balanced</div>
              </div>
            </a>
            <a href="/recipes/Fiber-Rich" className="text-decoration-none text-dark">
              <div className='tag-card text-center'>
                <img src={`/src/assets/category-images/fiber-rich.jpg`} alt="" className='img-fluid' />
                <div className='tag-title'>Fiber-Rich</div>
              </div>
            </a>
          </div>
        </div>

        <div className="category-box me-0">
          <h3 className="text-custom2 ms-4 fs-3">Recipes By Cuisine</h3>
          <hr />
          <div className='tag-container mb-3'>
            <a href="/recipes/Indian" className="text-decoration-none text-dark">
              <div className='tag-card text-center'>
                <img src={`/src/assets/category-images/indian.jpg`} alt="" className='img-fluid' />
                <div className='tag-title'>Indian</div>
              </div>
            </a>
            <a href="/recipes/Mexican" className="text-decoration-none text-dark">
              <div className='tag-card text-center'>
                <img src={`/src/assets/category-images/mexican.jpg`} alt="" className='img-fluid' />
                <div className='tag-title'>Mexican</div>
              </div>
            </a>
            <a href="/recipes/Italian" className="text-decoration-none text-dark">
              <div className='tag-card text-center'>
                <img src={`/src/assets/category-images/italian.jpg`} alt="" className='img-fluid' />
                <div className='tag-title'>Italian</div>
              </div>
            </a>
            <a href="/recipes/Chinese" className="text-decoration-none text-dark">
              <div className='tag-card text-center'>
                <img src={`/src/assets/category-images/chinese.jpg`} alt="" className='img-fluid' />
                <div className='tag-title'>Chinese</div>
              </div>
            </a>
          </div>
        </div>

        <div className="category-box me-0">
          <h3 className="text-custom2 ms-4 fs-3">Recipes By Food Taste</h3>
          <hr />
          <div className='tag-container mb-3'>
            <a href="/recipes/Spicy" className="text-decoration-none text-dark">
              <div className='tag-card text-center'>
                <img src={`/src/assets/category-images/spicy.jpg`} alt="" className='img-fluid' />
                <div className='tag-title'>Spicy</div>
              </div>
            </a>
            <a href="/recipes/Sweet" className="text-decoration-none text-dark">
              <div className='tag-card text-center'>
                <img src={`/src/assets/category-images/sweet.jpg`} alt="" className='img-fluid' />
                <div className='tag-title'>Sweet</div>
              </div>
            </a>
            <a href="/recipes/Savory" className="text-decoration-none text-dark">
              <div className='tag-card text-center'>
                <img src={`/src/assets/category-images/savory.jpg`} alt="" className='img-fluid' />
                <div className='tag-title'>Savory</div>
              </div>
            </a>
            <a href="/recipes/Fast-Food" className="text-decoration-none text-dark">
              <div className='tag-card text-center'>
                <img src={`/src/assets/category-images/fast-food.jpg`} alt="" className='img-fluid' />
                <div className='tag-title'>Fast Food</div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Tags */}
      {/* <section>
        <p className='text-center py-2 fs-4 lead'>
          <span className='custom-heading2 py-1'>Tag, Search, Savor </span> - Recipes Made Just for You!
        </p>
        <div className='tag-container mb-5 mx-3'>
          <div className='tag-card text-center'>
            <img src={hello} alt="" className='img-fluid' />
            <div className='tag-title'>Protein-Rich</div>
          </div>
        </div>
      </section> */}

      {/* Search Modal */}
      <SearchModal show={showSearchModal} onClose={() => setShowSearchModal(false)} />
    </>
  );
};

export default Recipes;