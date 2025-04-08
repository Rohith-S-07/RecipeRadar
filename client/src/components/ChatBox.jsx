import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import config from '../config';

const ChatBox = ({ selectedGroup }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const bottomRef = useRef(null); // Scroll reference
    const currentUserId = JSON.parse(localStorage.getItem('userData')).id.toString();

    const scrollToBottom = () => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const fetchMessages = async () => {
        try {
            const token = localStorage.getItem("authToken");
            const res = await axios.get(`${config.BASE_URL}/messages/${selectedGroup._id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMessages(res.data);
        } catch (err) {
            console.error("Failed to fetch messages", err);
        }
    };

    useEffect(() => {
        if (selectedGroup?._id) {
            fetchMessages();
        }
    }, [selectedGroup]);

    useEffect(() => {
        let intervalId;

        if (selectedGroup?._id) {
            intervalId = setInterval(async () => {
                try {
                    const token = localStorage.getItem("authToken");
                    const res = await axios.get(`${config.BASE_URL}/messages/${selectedGroup._id}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });

                    if (res.data.length !== messages.length) {
                        setMessages(res.data);
                    }
                } catch (err) {
                    console.error("Auto fetch failed", err);
                }
            }, 1000);
        }

        return () => clearInterval(intervalId);
    }, [selectedGroup, messages]);

    useEffect(() => {
        if (messages.length > 0) {
            const timeout = setTimeout(() => {
                scrollToBottom();
            }, 100);
            return () => clearTimeout(timeout);
        }
    }, [messages]);

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;
        try {
            const token = localStorage.getItem("authToken");
            const res = await axios.post(
                `${config.BASE_URL}/messages/send`,
                {
                    groupId: selectedGroup._id,
                    content: newMessage,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setMessages((prev) => [...prev, res.data]);
            setNewMessage('');
        } catch (err) {
            console.error("Failed to send message", err);
        }
    };

    return (
        <div className="chat-content">
            <div className="d-flex align-items-center gap-2 pb-2 custom-heading fs-4 border-bottom">
                {selectedGroup?.profileImage && (
                    <img
                        src={`${config.BASE_URL}/uploads/groups/${selectedGroup.profileImage}`}
                        alt={selectedGroup.name}
                        className="group-img m-0"
                    />
                )}
                <span className='ms-1'>{selectedGroup ? selectedGroup.name : ''}</span>
            </div>

            <div className='chat-container'>
                <div className="message-container">
                    {selectedGroup ? (
                        messages.map((msg) => (
                            <div key={msg._id} className={currentUserId === msg.senderProfile._id ? 'current-user-message' : 'other-user-message'}>
                                <div className='message'>
                                    <img
                                        src={`${config.BASE_URL}/${msg.senderProfile?.profilePicture}`}
                                        alt={selectedGroup.name}
                                        className="msg-img"
                                    />
                                    <div className='msg-content'>
                                        <div className="msg-content-sender">{msg.senderProfile?.name || "Unknown"}</div>
                                        <div className='msg-content-message'>{msg.content}</div>
                                    </div>
                                </div>
                                <div className="msg-content-time">
                                    {new Date(msg.createdAt).toLocaleString('en-US', {
                                        dateStyle: 'medium',
                                        timeStyle: 'short',
                                    })}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-muted mt-5">
                            Please select a group to view messages
                        </div>
                    )}
                    <div ref={bottomRef} /> {/* Anchor for scroll-to-bottom */}
                </div>

                {selectedGroup && (
                    <div className="pt-3 d-flex gap-2">
                        <input
                            type="text"
                            placeholder="Type a message..."
                            className="form-control text-start"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        />
                        <button className="btn btn-success" onClick={handleSendMessage}>
                            <i className="bi bi-send-fill"></i>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatBox;