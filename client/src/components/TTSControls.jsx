import React, { useState, useRef } from "react";
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/styles/DialogBoxes.css';

const TTSModal = ({ isOpen, onRequestClose, recipe }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [speechRate, setSpeechRate] = useState(1);
    const speechRef = useRef(null);

    const createSpeechInstance = (text) => {
        const speech = new SpeechSynthesisUtterance(text);
        speech.lang = "en-US";
        speech.rate = speechRate;
        speech.pitch = 1;
        speech.volume = 1;

        speech.onend = () => setIsPlaying(false);
        speechRef.current = speech;
        return speech;
    };

    const handlePlay = () => {
        if (!recipe) return;

        const text = `
            Ingredients: ${recipe.ingredients.map(i => `${i.name} - ${i.quantity}`).join(', ')}. 
            Steps: ${recipe.steps.join('. ')}.
        `;

        if (isPlaying) {
            window.speechSynthesis.pause();
            setIsPlaying(false);
        } else {
            if (speechRef.current) {
                window.speechSynthesis.resume();
            } else {
                const speech = createSpeechInstance(text);
                window.speechSynthesis.speak(speech);
            }
            setIsPlaying(true);
        }
    };

    const handleStop = () => {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        speechRef.current = null;
    };

    const handleSpeedChange = (e) => {
        const newRate = parseFloat(e.target.value);
        setSpeechRate(newRate);
        if (isPlaying) {
            handleStop();
            handlePlay();
        }
    };

    const handleRepeat = () => {
        handleStop();
        handlePlay();
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
                    <h5 className="modal-title">Text-to-Speech Controls</h5>
                    <button type="button" className="btn-close" onClick={onRequestClose}></button>
                </div>

                <div className="modal-body text-center">
                    <button
                        className={`btn ${isPlaying ? "btn-warning" : "btn-primary"}`}
                        onClick={handlePlay}
                    >
                        {isPlaying ? "Pause" : "Play"}
                    </button>

                    <button className="btn btn-danger ms-2" onClick={handleStop}>
                        Stop
                    </button>

                    <button className="btn btn-secondary ms-2" onClick={handleRepeat}>
                        Repeat
                    </button>

                    <div className="mt-3">
                        <label className="form-label me-2">Speed:</label>
                        <input
                            type="range"
                            min="0.5"
                            max="2"
                            step="0.1"
                            value={speechRate}
                            onChange={handleSpeedChange}
                            className="form-range w-50"
                        />
                        <span className="ms-2">{speechRate}x</span>
                    </div>
                </div>

                <div className="modal-footer">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={onRequestClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default TTSModal;