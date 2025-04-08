const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  profileImage: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Group', groupSchema);