const Group = require("../models/Group");
const Message = require('../models/Message');

exports.createGroup = async (req, res) => {
    try {
        const { name } = req.body;
        const profileImage = req.file ? req.file.filename : null;

        const newGroup = new Group({
            name,
            createdBy: req.user.id,
            profileImage,
        });

        await newGroup.save();
        res.status(201).json(newGroup);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create group" });
    }
};

exports.getAllGroups = async (req, res) => {
    try {
        const groups = await Group.find().populate("createdBy", "name email");

        const groupsWithLatestMessage = await Promise.all(
            groups.map(async (group) => {
                const latestMessage = await Message.findOne({ groupId: group._id })
                    .sort({ createdAt: -1 })
                    .select('content createdAt senderProfile');

                return {
                    ...group.toObject(),
                    latestMessage: latestMessage
                        ? {
                            content: latestMessage.content,
                            createdAt: latestMessage.createdAt,
                            senderName: latestMessage.senderProfile?.name || 'Unknown',
                        }
                        : null,
                };
            })
        );

        res.status(200).json(groupsWithLatestMessage);
    } catch (err) {
        console.error("Failed to fetch groups:", err);
        res.status(500).json({ error: "Failed to fetch groups" });
    }
};
