import { Link } from 'react-router-dom';
import LottiePlayer from './LottiePlayer'
import RecipeLogo from "../assets/images/recipe-radar-new.png";

// import '../assets/styles/NotFound.css';

const NotFound = () => {
    return (
        <div className="text-center mt-5">
            <LottiePlayer src="https://lottie.host/e9ab5ffe-f970-4d48-a59d-82747af4c1e7/1DMwFNP5bB.lottie" />

            <h2>Oops! Page Not Found</h2>
            
            <p className='text-danger'>The page you're looking for doesn't exist.</p>
            <Link to="/" className="btn custom-btn-primary text-light">
                Go Back Home
            </Link>
        </div>
    );
};

export default NotFound;