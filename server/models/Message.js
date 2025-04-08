const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },

  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },

  // For quick access/display without multiple user lookups
  senderProfile: {
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    profilePicture: String,
  },

  // Message control
  isDeleted: { type: Boolean, default: false },
  deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // optional

}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);