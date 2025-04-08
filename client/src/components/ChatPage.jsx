import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import ChatSidebar from './ChatSidebar';
import ChatBox from './ChatBox';
import NavBar from './NavBar';


import '../assets/styles/Chat.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css';

const ChatPage = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();

  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [messages, setMessages] = useState([]);

  const fetchGroups = async () => {
    try {
      const token = localStorage.getItem("authToken");

      if(!token){
        navigate('/signin');
      }

      const res = await axios.get(`${config.BASE_URL}/groups/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGroups(res.data);
    } catch (err) {
      console.error("Failed to fetch groups", err);
    }
  };

  const fetchMessages = async (groupId) => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get(`${config.BASE_URL}/messages/${groupId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(res.data);
    } catch (err) {
      console.error("Failed to fetch messages", err);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  useEffect(() => {
    if (groupId && groups.length) {
      const group = groups.find((g) => g._id === groupId);
      setSelectedGroup(group);
      fetchMessages(groupId);
    }
  }, [groupId, groups]);

  const handleGroupCreated = (newGroup) => {
    setGroups((prev) => [newGroup, ...prev]);
    navigate(`/chat/${newGroup._id}`);
  };

  return (
    <div className='bg-white'>
      <NavBar />
      <ChatSidebar
        groups={groups}
        selectedGroup={selectedGroup}
        setSelectedGroup={(group) => navigate(`/chat/${group._id}`)}
        onGroupCreated={handleGroupCreated}
      />
      <div className="flex-grow-1">
        <ChatBox
          selectedGroup={selectedGroup}
          messages={messages}
          setMessages={setMessages}
        />
      </div>
    </div>
  );
};

export default ChatPage;