import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/styles/DialogBoxes.css';
import config from '../../config';
import NotificationModal from './NotificationModal'; // import your modal

const CreateGroupModal = ({ isOpen, onRequestClose, onGroupCreated }) => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);

  // Notification modal state
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifMessage, setNotifMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    if (image) formData.append("profileImage", image);

    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.post(`${config.BASE_URL}/groups/creategroup`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        }
      });

      if (onGroupCreated) onGroupCreated(res.data);
      setNotifMessage("Group created successfully!");
      setNotifOpen(true);
      setName('');
      setImage(null);
    } catch (err) {
      console.error("Group creation failed:", err);
      setNotifMessage("Error creating group");
      setNotifOpen(true);
    }
  };

  const handleNotifClose = () => {
    setNotifOpen(false);
    if (notifMessage === "Group created successfully!") {
      onRequestClose();
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        ariaHideApp={false}
        className="modal-dialog-centered custom-modal"
        overlayClassName="modal-overlay"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create Group</h5>
            <button type="button" className="btn-close" onClick={onRequestClose}></button>
          </div>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Group Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Profile Image</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">
                Create
              </button>
              <button type="button" className="btn btn-secondary" onClick={onRequestClose}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Notification Modal */}
      <NotificationModal
        isOpen={notifOpen}
        onRequestClose={handleNotifClose}
        message={notifMessage}
      />
    </>
  );
};

export default CreateGroupModal;