import React, { useEffect } from 'react';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/styles/DialogBoxes.css';

const NotificationModal = ({ isOpen, onRequestClose, message }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onRequestClose();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onRequestClose]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      className="custom-notification-modal"
      overlayClassName="custom-notification-overlay"
    >
      <div className="progress-bar-container">
        <div className="progress-bar-fill"></div>
      </div>
      <div className="notification-content">
        <p>{message}</p>
        <button className="btn btn-primary btn-sm" onClick={onRequestClose}>OK</button>
      </div>
    </Modal>
  );
};

export default NotificationModal;
