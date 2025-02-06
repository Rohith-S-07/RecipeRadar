import React from 'react';


const Recipes = () => {

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

      {/* Category-Based Filtering */}
      <section className='mt-3'>
        <div className="category-section">
          <div className="row me-0">
            <h3 className="text-custom2 mb-2 fs-3">Recipes By Meal Type</h3>
            <hr />
            <ul className="d-flex flex-wrap ms-3">
              <li className="col-4"><a href="/recipes/sample" className="text-decoration-none text-dark">Breakfast</a></li>
              <li className="col-4"><a href="/recipes/sample" className="text-decoration-none text-dark">Lunch</a></li>
              <li className="col-4"><a href="/recipes/sample" className="text-decoration-none text-dark">Dinner</a></li>
              <li className="col-4"><a href="/recipes/sample" className="text-decoration-none text-dark">Snacks</a></li>
              <li className="col-4"><a href="/recipes/sample" className="text-decoration-none text-dark">Desserts</a></li>
              <li className="col-4"><a href="/recipes/sample" className="text-decoration-none text-dark">Drinks</a></li>
            </ul>
          </div>

          <div className="row  me-0">
            <h3 className="text-custom2 mb-2 fs-3">Recipes By Dietary Preferences</h3>
            <hr />
            <ul className="d-flex flex-wrap ms-3">
              <li className="col-4"><a href="/recipes/sample" className="text-decoration-none text-dark">Vegan</a></li>
              <li className="col-4"><a href="/recipes/sample" className="text-decoration-none text-dark">Vegetarian</a></li>
              <li className="col-4"><a href="/recipes/sample" className="text-decoration-none text-dark">Dairy-Free</a></li>
              <li className="col-4"><a href="/recipes/sample" className="text-decoration-none text-dark">Gluten-Free</a></li>
              <li className="col-4"><a href="/recipes/sample" className="text-decoration-none text-dark">Keto</a></li>
              <li className="col-4"><a href="/recipes/sample" className="text-decoration-none text-dark">Low-Carb</a></li>
            </ul>
          </div>

          <div className="row me-0">
            <h3 className="text-custom2 mb-2 fs-3">Recipes By Nutrition</h3>
            <hr />
            <ul className="d-flex flex-wrap ms-3">
              <li className="col-4"><a href="/recipes/sample" className="text-decoration-none text-dark">High-Protein</a></li>
              <li className="col-4"><a href="/recipes/sample" className="text-decoration-none text-dark">Low-Calorie</a></li>
              <li className="col-4"><a href="/recipes/sample" className="text-decoration-none text-dark">Balanced</a></li>
              <li className="col-4"><a href="/recipes/sample" className="text-decoration-none text-dark">Fiber-Rich</a></li>
            </ul>
          </div>

          <div className="row me-0">
            <h3 className="text-custom2 mb-2 fs-3">Recipes By Cuisine</h3>
            <hr />
            <ul className="d-flex flex-wrap ms-3">
              <li className="col-4"><a href="/recipes/sample" className="text-decoration-none text-dark">Indian</a></li>
              <li className="col-4"><a href="/recipes/sample" className="text-decoration-none text-dark">Mexican</a></li>
              <li className="col-4"><a href="/recipes/sample" className="text-decoration-none text-dark">Italian</a></li>
              <li className="col-4"><a href="/recipes/sample" className="text-decoration-none text-dark">Chinese</a></li>
            </ul>
          </div>

          <div className="row me-0">
            <h3 className="text-custom2 mb-2 fs-3">Recipes By Food Type</h3>
            <hr />
            <ul className="d-flex flex-wrap ms-3">
              <li className="col-4"><a href="/recipes/sample" className="text-decoration-none text-dark">Spicy</a></li>
              <li className="col-4"><a href="/recipes/sample" className="text-decoration-none text-dark">Sweet</a></li>
              <li className="col-4"><a href="/recipes/sample" className="text-decoration-none text-dark">Savory</a></li>
              <li className="col-4"><a href="/recipes/sample" className="text-decoration-none text-dark">Fast Food</a></li>
              <li className="col-4"><a href="/recipes/sample" className="text-decoration-none text-dark">Street Food</a></li>
            </ul>
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

    </>
  );
};

export default Recipes;
