import { Link } from 'react-router-dom';
import LottiePlayer2 from '../LottiePlayer';

const Forbidden = () => {
    return (
        <div className="text-center mt-5">
            <LottiePlayer2 src="https://lottie.host/ff847889-1a45-4144-8ab7-3ce3be2e480c/lPc7syac5t.lottie" />

            <h2>403 - Forbidden Access</h2>

            <p className='text-warning'>
                You don't have permission to access this page.
            </p>

            <Link to="/" className="btn custom-btn-primary text-light">
                Go Back Home
            </Link>
        </div>
    );
};

export default Forbidden;