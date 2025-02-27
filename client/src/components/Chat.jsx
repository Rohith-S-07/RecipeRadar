import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

const sampleMessages = [
    { id: 1, sender: 'Rohith S', content: 'Hey there!', timestamp: '10:30 AM' },
    { id: 2, sender: 'Abu', content: 'Hello! How are you?', timestamp: '10:32 AM' },
    { id: 3, sender: 'Rohith S', content: 'I am good! What about you?', timestamp: '10:35 AM' },
    { id: 4, sender: 'Abu', content: 'Same here!', timestamp: '10:37 AM' }
];

const Chat = () => {
    const [messages, setMessages] = useState(sampleMessages);
    const [newMessage, setNewMessage] = useState('');
    const currentUser = 'Rohith S';

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const newMsg = {
                id: messages.length + 1,
                sender: currentUser,
                content: newMessage,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages([...messages, newMsg]);
            setNewMessage('');
        }
    };

    return (
        <div className="container mt-4">
            <div className="card p-3">
                <h3 className="text-center"><FaUserCircle size={24} className="text-muted" /> Abu </h3>
                <div className="chat-history p-3" style={{ height: '300px', overflowY: 'scroll', background: '#f8f9fa', borderRadius: '5px' }}>
                    {messages.map(msg => (
                        <div key={msg.id} className={`d-flex mb-2 ${msg.sender === currentUser ? 'justify-content-end' : ''}`}>
                            {msg.sender !== currentUser && (
                                <div className="d-flex align-items-start me-2">
                                    <FaUserCircle size={24} className="text-muted" />
                                    <div className="ms-2">
                                        <strong className="text-primary">{msg.sender}</strong>
                                        <small className="d-block text-muted">{msg.timestamp}</small>
                                    </div>
                                </div>
                            )}
                            <div className={`p-2 ${msg.sender === currentUser ? 'bg-primary text-white' : 'bg-secondary text-light'} rounded`} style={{ maxWidth: '70%' }}>
                                {msg.content}
                            </div>
                            {msg.sender === currentUser && (
                                <div className="d-flex align-items-start ms-2">
                                    <div className="me-2 text-end">
                                        <strong className="text-success">{msg.sender}</strong>
                                        <small className="d-block text-muted">{msg.timestamp}</small>
                                    </div>
                                    <FaUserCircle size={24} className="text-muted" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="input-group mt-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button className="btn btn-primary" onClick={handleSendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default Chat;