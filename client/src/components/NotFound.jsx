import { Link } from 'react-router-dom';
import RecipeLogo from "../assets/images/recipe-radar-new.png";

// import '../assets/styles/NotFound.css';

const NotFound = () => {
    return (
        <div className="text-center mt-5">
            <h1 className="display-3 custom-primary-text">404</h1>
            <h2 cl>Oops! Page Not Found</h2>
            <p>The page you're looking for doesn't exist.</p>
            <div className='pb-2'>
                <img src={RecipeLogo} alt="RR" height={'50px'} className='mb-3'/>
                <span className="custom-heading fs-2 ms-2">Recipe Radar</span>
            </div>
            <Link to="/" className="btn custom-btn-primary text-light">
                Go Back Home
            </Link>
        </div>
    );
};

export default NotFound;