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

const updateProfile = async (req, res) => {
    const { description, instagram, youtube, currentPassword, newPassword, tags } = req.body;
    const profilePicture = req.file ? req.file.path : req.user.profilePicture;

    try {
        const updatedData = { description, profilePicture, instagram, youtube, tags };

        if (currentPassword && newPassword) {
            const user = await User.findById(req.user.id);

            // Verify current password
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Current password is incorrect.' });
            }

            // Check if new password matches the old one
            const isSamePassword = await bcrypt.compare(newPassword, user.password);
            if (isSamePassword) {
                return res.status(400).json({ message: 'New password cannot be the same as the old password.' });
            }

            // Hash and update new password
            const hashedPassword = await bcrypt.hash(newPassword, 12);
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