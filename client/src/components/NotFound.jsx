import { Link } from 'react-router-dom';
import LottiePlayer2 from './LottiePlayer'
import RecipeLogo from "../assets/images/recipe-radar-new.png";

// import '../assets/styles/NotFound.css';

const NotFound = () => {
    return (
        <div className="text-center mt-1">
            <LottiePlayer2 src="https://lottie.host/106dfaed-6570-49fd-9303-f5ab98faf92a/uDvHGp1LjW.lottie" height="400px" width="500px" />
            <Link to="/" className="btn custom-btn-primary text-light">
                Go Back Home
            </Link>
        </div>
    );
};

export default NotFound;