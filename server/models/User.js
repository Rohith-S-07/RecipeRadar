const mongoose = require('mongoose');
const Recipe = require('../models/Recipe')

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    description: { type: String },
    profilePicture: { type: String },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
    instagram: { type: String },
    youtube: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
