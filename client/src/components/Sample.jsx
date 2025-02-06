import React from 'react'
import hello from '../assets/images/breakfast-img.jpg'


const Sample = () => {
    return (
        <>
            <section className="row m-0 mb-2 align-items-center type-header">
                <div className="col-md-4 d-flex align-items-center flex-column">
                    <img
                        src={hello}
                        alt="Vector Cook"
                        className="img-fluid type-img"
                    />
                </div>

                <div className="col-md-8 mt-3">
                    <nav style={{ "--bs-breadcrumb-divider": '"👉"' }} aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <a href="/recipes" >Recipes</a>
                            </li>
                            <li className="breadcrumb-item" aria-current="page">
                                Sample
                            </li>
                        </ol>
                    </nav>
                    <h1 className='text-custom ps-2 pb-3'> Sample Recipes</h1>
                    <p className='pe-3 text-dark'>&nbsp;   Cooking is more than just sustenance; it's an act of self-care.
                        A thoughtfully prepared meal nourishes the body, but it also comforts the soul.
                        Step into the kitchen, and let every recipe become a moment of mindfulness and joy.
                    </p>
                </div>
            </section>

            <section>
                <p className='text-custom2 text-center mt-4'> <img src="https://cdn-icons-png.flaticon.com/128/2617/2617955.png" alt="trophy" className='me-3 pb-1' height={40} />TOP RATED SAMPLE RECIPES</p>
                <div className='recipe-container mb-2 mx-5'>
                    <div className='recipe-card text-center'>
                        <img src={hello} alt="" className='img-fluid' />
                        <div className='text-warning ratings'>
                            <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-regular fa-star"></i>
                            <span className='text-dark'> 4.2</span>
                        </div>
                        <div className='recipe-title'>Chocolate Pancake</div>
                    </div>
                    <div className='recipe-card text-center'>
                        <img src={hello} alt="" className='img-fluid' />
                        <div className='text-warning ratings'>
                            <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-regular fa-star"></i>
                            <span className='text-dark'> 4.2</span>
                        </div>
                        <div className='recipe-title'>Chocolate Pancake</div>
                    </div>
                    <div className='recipe-card text-center'>
                        <img src={hello} alt="" className='img-fluid' />
                        <div className='text-warning ratings'>
                            <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-regular fa-star"></i>
                            <span className='text-dark'> 4.2</span>
                        </div>
                        <div className='recipe-title'>Chocolate Pancake</div>
                    </div>
                    <div className='recipe-card text-center'>
                        <img src={hello} alt="" className='img-fluid' />
                        <div className='text-warning ratings'>
                            <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-regular fa-star"></i>
                            <span className='text-dark'> 4.2</span>
                        </div>
                        <div className='recipe-title'>Chocolate Pancake</div>
                    </div>
                </div>
            </section>

            <section className='all-recipe-section'>
                <p className='text-stroke2 fs-1 text-center'> ALL SAMPLE RECIPES</p>
                <div className='recipe-container mx-5'>
                <div className='recipe-card text-center'>
                        <img src={hello} alt="" className='img-fluid' />
                        <div className='text-warning ratings'>
                            <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-regular fa-star"></i>
                            <span className='text-dark'> 4.2</span>
                        </div>
                        <div className='recipe-title'>Chocolate Pancake</div>
                    </div>
                    <div className='recipe-card text-center'>
                        <img src={hello} alt="" className='img-fluid' />
                        <div className='text-warning ratings'>
                            <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-regular fa-star"></i>
                            <span className='text-dark'> 4.2</span>
                        </div>
                        <div className='recipe-title'>Chocolate Pancake</div>
                    </div>
                    <div className='recipe-card text-center'>
                        <img src={hello} alt="" className='img-fluid' />
                        <div className='text-warning ratings'>
                            <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-regular fa-star"></i>
                            <span className='text-dark'> 4.2</span>
                        </div>
                        <div className='recipe-title'>Chocolate Pancake</div>
                    </div>
                    <div className='recipe-card text-center'>
                        <img src={hello} alt="" className='img-fluid' />
                        <div className='text-warning ratings'>
                            <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-regular fa-star"></i>
                            <span className='text-dark'> 4.2</span>
                        </div>
                        <div className='recipe-title'>Chocolate Pancake</div>
                    </div>
                    <div className='recipe-card text-center'>
                        <img src={hello} alt="" className='img-fluid' />
                        <div className='text-warning ratings'>
                            <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-regular fa-star"></i>
                            <span className='text-dark'> 4.2</span>
                        </div>
                        <div className='recipe-title'>Chocolate Pancake</div>
                    </div>
                    <div className='recipe-card text-center'>
                        <img src={hello} alt="" className='img-fluid' />
                        <div className='text-warning ratings'>
                            <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-regular fa-star"></i>
                            <span className='text-dark'> 4.2</span>
                        </div>
                        <div className='recipe-title'>Chocolate Pancake</div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Sample