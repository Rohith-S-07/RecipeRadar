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
    youtube: '',
    tags: []
  });

  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [notification, setNotification] = useState({
    isOpen: false,
    message: '',
    type: 'success'
  });

  const [tags, setTags] = useState([]);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const predefinedTags = [
    "Breakfast", "Lunch", "Dinner", "Snacks", "Desserts", "Drinks",
    "Vegan", "Vegetarian", "Dairy-Free", "Gluten-Free", "Keto", "Low-Carb",
    "High-Protein", "Low-Calorie", "Balanced", "Fiber-Rich", "Indian",
    "Mexican", "Italian", "Chinese", "Spicy", "Sweet", "Savory", "Fast Food"
  ];

  const toggleTag = (tag) => {
    setTags((prevTags) => {
      if (prevTags.includes(tag)) {
        return prevTags.filter(t => t !== tag);
      } else if (prevTags.length < 5) {
        return [...prevTags, tag];
      } else {
        setNotification({ isOpen: true, message: 'You can select up to 5 tags only.', type: 'error' });
        return prevTags;
      }
    });
  };

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get(`${config.BASE_URL}/profile/getProfile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(response.data.user);
      setTags(response.data.user.tags || []);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
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

    const isPasswordUpdating = passwordData.currentPassword || passwordData.newPassword || passwordData.confirmPassword;

    if (isPasswordUpdating) {
      if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
        return setNotification({ isOpen: true, message: 'All password fields are required.', type: 'error' });
      }
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        return setNotification({ isOpen: true, message: 'Passwords do not match.', type: 'error' });
      }
    }

    const formData = new FormData();
    formData.append('description', profile.description);
    formData.append('instagram', profile.instagram);
    formData.append('youtube', profile.youtube);

    tags.forEach((tag, index) => {
      formData.append(`tags[${index}]`, tag);
    });

    if (selectedFile) {
      formData.append('profilePicture', selectedFile);
    }

    if (isPasswordUpdating) {
      formData.append('currentPassword', passwordData.currentPassword);
      formData.append('newPassword', passwordData.newPassword);
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
      fetchProfile();
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setNotification({ isOpen: true, message: 'Failed to update profile.', type: 'error' });
    }
  };

  return (
    <div className="profile-header m-3">
      {/* Profile Details */}
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
          <h2 className='text-stroke2 fs-3'>{profile.name}</h2>
          <p className='text-secondary ms-2'>{profile.description || "No description available."}</p>

          {profile.tags && profile.tags.length > 0 && (
            <div className="mt-3">
              <h6>My Interests:</h6>
              <div className="d-flex flex-wrap gap-2">
                {profile.tags.map((tag, index) => (
                  <span key={index} className="tags">{tag}</span>
                ))}
              </div>
            </div>
          )}
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
              <label htmlFor="name"><i className='bi bi-person'></i> Name</label>
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
              <label htmlFor="email"><i className='bi bi-envelope'></i> Email</label>
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
              <label htmlFor="description"><i className='bi bi-info-circle'></i> About</label>
              <textarea
                id="description"
                name="description"
                value={profile.description}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="instagram"><i className='bi bi-instagram'></i> Instagram</label>
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
              <label htmlFor="youtube"><i className='bi bi-youtube'></i> YouTube</label>
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
              <label htmlFor="profilePicture"><i className='bi bi-file-image'></i> Profile Picture</label>
              <input
                type="file"
                id="profilePicture"
                className="form-control"
                onChange={handleFileChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label"><i className='bi bi-tag'></i> Select Tags</label>
              <div className="d-flex flex-wrap gap-2">
                {predefinedTags.map(tag => (
                  <button
                    key={tag}
                    type="button"
                    className={`btn btn-sm ${tags.includes(tag) ? 'btn-primary' : 'btn-outline-secondary'}`}
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Tags Display */}
            <div className="mb-3">
              <label className="form-label"><i className='bi bi-tag-fill'></i> Selected Tags:</label>
              <div className="border rounded p-2 bg-light">
                {tags.length > 0 ? tags.join(', ') : "No tags selected"}
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 mb-3">
                <label htmlFor="currentPassword">Current Password</label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="form-control"
                />
              </div>

              <div className="col-md-4 mb-3">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="form-control"
                />
              </div>

              <div className="col-md-4 mb-3">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="form-control"
                />
              </div>
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