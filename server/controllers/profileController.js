const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Get user profile details
const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user });
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update user profile
const updateProfile = async (req, res) => {
    const {description, password, instagram, youtube } = req.body;
    const profilePicture = req.file ? req.file.path : req.user.profilePicture;

    try {
        const updatedData = {description, profilePicture, instagram, youtube };

        // If password is provided, hash it
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 12);
            updatedData.password = hashedPassword;
        }

        const updatedUser = await User.findByIdAndUpdate(req.user.id, updatedData, { new: true }).select('-password');
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            user: updatedUser,
        });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getProfile, updateProfile };