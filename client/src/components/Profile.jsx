import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';
import Youtube from '../assets/images/youtube.png';
import Instagram from '../assets/images/instagram.png';
import NotificationModal from './Modals/NotificationModal';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    description: '',
    profilePicture: '',
    instagram: '',
    youtube: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [notification, setNotification] = useState({
    isOpen: false,
    message: '',
    type: 'success'
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`${config.BASE_URL}/profile/getProfile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(response.data.user);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const isValidUrl = (url) => {
    const urlPattern = /^(https?:\/\/)?(www\.)?(instagram\.com\/[A-Za-z0-9-_?=&#]+|youtube\.com\/(watch\?v=|shorts\/|channel\/|@|user\/)[A-Za-z0-9-_?=&#]+)$/i;
    return urlPattern.test(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!profile.name.trim()) {
      return setNotification({ isOpen: true, message: 'Name is required.', type: 'error' });
    }
    if (!profile.email.trim()) {
      return setNotification({ isOpen: true, message: 'Email is required.', type: 'error' });
    }

    if (profile.instagram && !isValidUrl(profile.instagram)) {
      return setNotification({ isOpen: true, message: 'Invalid Instagram link format.', type: 'error' });
    }

    if (profile.youtube && !isValidUrl(profile.youtube)) {
      return setNotification({ isOpen: true, message: 'Invalid YouTube link format.', type: 'error' });
    }

    const formData = new FormData();
    formData.append('description', profile.description);
    formData.append('instagram', profile.instagram);
    formData.append('youtube', profile.youtube);

    if (selectedFile) {
      formData.append('profilePicture', selectedFile);
    }

    try {
      const token = localStorage.getItem('authToken');
      await axios.put(`${config.BASE_URL}/profile/updateProfile`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      setNotification({ isOpen: true, message: 'Profile updated successfully!', type: 'success' });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setNotification({ isOpen: true, message: 'Failed to update profile.', type: 'error' });
    }
  };

  return (
    <div className="p-3">
      <div className="profile-header">

        <div className='profile-gradient'></div>
        <div className='profile-info'>
          <div className='d-flex justify-content-between'>
            <img
              src={`${config.BASE_URL}/${profile.profilePicture}`}
              alt="Profile"
              className="profile-img"
            />
            <div>
              {profile.instagram && (
                <a href={profile.instagram} target="_blank" rel="noopener noreferrer">
                  <img src={Instagram} alt="Insta" height={35} />
                </a>
              )}
              {profile.youtube && (
                <a href={profile.youtube} target="_blank" rel="noopener noreferrer">
                  <img src={Youtube} alt="YT" height={35} />
                </a>
              )}
            </div>
          </div>

          <div className='profile-content'>
            <h2>{profile.name}</h2>
            <p>{profile.description || "No description available."}</p>
          </div>
        </div>

        {!isEditing && (
          <div className='d-flex justify-content-end p-2'>
            <button
              className="btn custom-btn-primary edit-btn text-white"
              onClick={() => setIsEditing(true)}
            >
              <i className='bi bi-pencil me-2'></i>
              Edit Profile
            </button>
          </div>
        )}

        {isEditing && (
          <form onSubmit={handleSubmit} className="profile-edit-form p-3">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={profile.name}
                  className="form-control"
                  disabled
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profile.email}
                  className="form-control"
                  disabled
                  readOnly
                />
              </div>

              <div className="col-md-12 mb-3">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={profile.description}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="instagram">Instagram</label>
                <input
                  type="text"
                  id="instagram"
                  name="instagram"
                  value={profile.instagram}
                  onChange={handleInputChange}
                  placeholder="Instagram Link"
                  className="form-control"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="youtube">YouTube</label>
                <input
                  type="text"
                  id="youtube"
                  name="youtube"
                  value={profile.youtube}
                  onChange={handleInputChange}
                  placeholder="YouTube Link"
                  className="form-control"
                />
              </div>

              <div className="col-md-12 mb-3">
                <label htmlFor="profilePicture">Profile Picture</label>
                <input
                  type="file"
                  id="profilePicture"
                  className="form-control"
                  onChange={handleFileChange}
                />
              </div>
            </div>

            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-primary me-2">
                Save Changes
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Notification Modal Integration */}
      <NotificationModal
        isOpen={notification.isOpen}
        onRequestClose={() => setNotification({ ...notification, isOpen: false })}
        message={notification.message}
      />
    </div>
  );
};

export default Profile;