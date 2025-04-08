const Message = require('../models/Message');
const User = require('../models/User');

exports.sendMessage = async (req, res) => {
  try {
    const { groupId, content } = req.body;
    const user = await User.findById(req.user.id).select('name profilePicture');

    const newMessage = new Message({
      groupId,
      content,
      senderId: req.user.id,
      senderProfile: {
        _id: user._id,
        name: user.name,
        profilePicture: user.profilePicture || null,
      },
    });

    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    console.error("Error in sendMessage:", err);
    res.status(500).json({ error: 'Failed to send message' });
  }
};

exports.getMessagesByGroup = async (req, res) => {
  try {
    const messages = await Message.find({ groupId: req.params.groupId, isDeleted: false })
      .sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (err) {
    console.error("Error in getMessagesByGroup:", err);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};
