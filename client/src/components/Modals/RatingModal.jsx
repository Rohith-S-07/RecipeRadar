import React from 'react';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/styles/DialogBoxes.css';

const RatingModal = ({ isOpen, onRequestClose, onSubmitRating, userRating }) => {

    const handleRating = (ratingValue) => {
        onRequestClose(); // Close the modal immediately
        onSubmitRating(ratingValue); // Submit the rating
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            ariaHideApp={false}
            className="modal-dialog-centered custom-modal"
            overlayClassName="modal-overlay"
        >
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Rate this Recipe</h5>
                    <button type="button" className="btn-close" onClick={onRequestClose}></button>
                </div>

                <div className="modal-body text-center">
                    <div className="d-flex gap-2 justify-content-center my-3">
                        {[1, 2, 3, 4, 5].map((value) => (
                            <i
                                key={value}
                                className={`bi bi-star${value <= userRating ? '-fill' : ''} fs-3 text-warning`}
                                style={{ cursor: "pointer" }}
                                onClick={() => handleRating(value)}
                            />
                        ))}
                    </div>
                </div>

                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={onRequestClose}>Cancel</button>
                </div>
            </div>
        </Modal>
    );
};

export default RatingModal;
