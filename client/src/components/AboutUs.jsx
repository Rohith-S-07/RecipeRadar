import React from 'react';
import ChefAbout from '../assets/images/chefAbout.jpg'

const AboutUs = () => {
  return (
    <div>
      <div className="row m-2 mb-2 p-4 align-items-center justify-content-center">
        <div className="col-md-6 d-flex ">
          <div>
            <img src={ChefAbout} alt="Recipe" className="card-img-top" />
          </div>
        </div>
        <div className="col-md-6 text-center">
          <h2 className="text-3xl text-center fs-1 text-stroke">Key Ingredients to Our Success</h2>
          <h4 className="font-bold custom-heading pb-2">Celebrating Culinary Creativity</h4>
          <p className="text-sm mb-4">
            At Recipe Radar, we believe in empowering food enthusiasts to share their culinary masterpieces with the world. By
            fostering a platform for creativity and exploration, we aim to bring unique and diverse recipes to everyone’s kitchen.
          </p>
          <h4 className="font-bold custom-heading pb-2">Building a Foodie Community</h4>
          <p className="text-sm">
            Our mission is to connect food lovers from all walks of life. Recipe Radar serves as a vibrant community where users
            can engage through recipe sharing, interactive features, and collaboration, making cooking an experience to cherish.
          </p>
        </div>

      </div>

      <h2 className="text-center text-2xl font-bold my-4 pb-3 custom-heading">Frequently Asked Questions</h2>
      <div className="d-flex justify-content-center mb-5 mx-4">
        <div className="flex-1 max-w-5xl space-y-4 w-100">
          <div className="accordion" id="accordionExample">
            <div className="accordion-item accordion-bg">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  How do I share a recipe on Recipe Radar?
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  Sharing a recipe is easy! Simply sign in to your account, click on Profile icon → Add Recipe in the menu, and fill in the details like the recipe name, ingredients, preparation steps, cooking time, and upload an image. Once submitted, your recipe will be visible to the entire Recipe Radar community.
                </div>
              </div>
            </div>

            <div className="accordion-item accordion-bg">
              <h2 className="accordion-header" id="headingTwo">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  Can I interact with other users on Recipe Radar?
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  Absolutely! Recipe Radar offers interactive features like liking and commenting on recipes
                  to share your thoughts. You can also use the 1-to-1 chat feature to connect directly with
                  other users and discuss your culinary interests
                </div>
              </div>
            </div>

            <div className="accordion-item accordion-bg">
              <h2 className="accordion-header" id="headingThree">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  Is Recipe Radar free to use?
                </button>
              </h2>
              <div
                id="collapseThree"
                className="accordion-collapse collapse"
                aria-labelledby="headingThree"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  Yes, Recipe Radar is completely free to use! You can browse recipes, share your own creations,
                  interact with the community, and access most features without any cost. Some advanced features
                  may require a free account to save your favorites or wishlists.
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default AboutUs;
