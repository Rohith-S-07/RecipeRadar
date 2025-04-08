const ContactMessage = require('../models/ContactMessage');

// POST - Save contact form
const submitMessage = async (req, res) => {
    try {
        const { first_name, last_name, email, message } = req.body;

        if (!first_name || !last_name || !email || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const newMessage = new ContactMessage({ first_name, last_name, email, message });
        await newMessage.save();

        res.status(201).json({ message: 'Message received successfully', data: newMessage });
    } catch (error) {
        console.error('Error saving message:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { submitMessage };