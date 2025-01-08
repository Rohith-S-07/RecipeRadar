import React from 'react';
import CookImg from '../assets/images/cookImg.jpg';
import Salad from '../assets/images/salad.jpg';

const HomePage = () => {
  return (
    <div className="container-fluid">
      <div className="row m-2 mb-2 p-3 align-items-center">
        {/* Images Section */}
        <div className="col-md-6 position-relative d-flex justify-content-center">
          <img
            src={CookImg}
            alt="Vector Cook"
            className="img-fluid cook-img"
          />
          <img
            src={Salad}
            alt="Vector Food"
            className="img-fluid food-img"
          />
        </div>

        {/* Text and Button Section */}
        <div className="col-md-6 text-end">
          <h1 className='text-stroke pb-2'>The</h1>
          <h1 className='text-custom pb-3 pe-2'> Secret Ingredient </h1>
          <h1 className='text-stroke pb-2'>is Always Passion</h1>
          <p>Cooking is more than just sustenance; it's an act of self-care.
            A thoughtfully prepared meal nourishes the body, but it also comforts the soul.
            Step into the kitchen, and let every recipe become a moment of mindfulness and joy.</p>
          <a className="explore-btn mt-3 py-1 px-3 z-20" href="/recipes"> Explore </a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
