const Tag = require('../models/Tag');
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "category-images/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Add a new tag
const addTag = async (req, res) => {
    try {
        const { name, description } = req.body;
        const image = req.file ? `/category-images/${req.file.filename}` : null;

        if (!name || !image || !description) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const existingTag = await Tag.findOne({ name });
        if (existingTag) {
            return res.status(400).json({ message: "Tag already exists." });
        }

        const newTag = new Tag({ name, image, description });
        await newTag.save();

        res.status(201).json({ message: "Tag added successfully!", tag: newTag });
    } catch (error) {
        res.status(500).json({ message: "Server error. Try again later." });
    }
};

// Get all tags
const getTags = async (req, res) => {
    try {
        const tags = await Tag.find();
        res.status(200).json(tags);
    } catch (error) {
        res.status(500).json({ message: "Could not fetch tags." });
    }
};

// Delete a tag
const deleteTag = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Tag ID is required." });
        }

        const deletedTag = await Tag.findByIdAndDelete(id);
        if (!deletedTag) {
            return res.status(404).json({ message: "Tag not found." });
        }

        res.status(200).json({ message: "Tag deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting tag." });
    }
};

module.exports = { addTag, getTags, deleteTag, upload };