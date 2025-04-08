import React, { useState } from "react";
import PropTypes from "prop-types";
import CreateGroupModal from "./Modals/CreateGroupModal";
import config from "../config";

const ChatSidebar = ({ groups, selectedGroup, setSelectedGroup, onGroupCreated }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [showModal, setShowModal] = useState(false);

    return (
        <div className={`chat-sidebar ${collapsed ? "collapsed" : ""}`}>
            <button className="chat-btn-toggle" onClick={() => setCollapsed(!collapsed)}>
                {collapsed ? <i className="bi bi-chevron-double-right"></i> : <i className="bi bi-chevron-double-left"></i>}
            </button>

            <div className="d-flex align-items-center justify-content-between custom-heading fs-4 pb-4">
                <span>Groups</span>
                {!collapsed && (
                    <button className="btn custom-btn-primary text-white" onClick={() => setShowModal(true)}>
                        <i className="bi bi-plus-circle"></i> Create
                    </button>
                )}
            </div>

            {groups.map((group) => (
                <div key={group._id}>
                    {!collapsed && (
                        <div
                            onClick={() => setSelectedGroup(group)}
                            className={`group-item ${selectedGroup?._id === group._id ? "active" : ""} d-flex`}
                            style={{ cursor: "pointer" }}
                        >
                            <div>
                                <img src={`${config.BASE_URL}/uploads/groups/${group.profileImage}`} alt={group.name} className="group-img" />
                            </div>
                            <div className="ms-2">
                                <div className="group-name">{group.name.slice(0,18)}</div>
                                <div className="latest-message">
                                    {group.latestMessage
                                        ? `${group.latestMessage.senderName}: ${group.latestMessage.content.slice(0,12)}...`
                                        : "No messages yet"}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ))}

            <CreateGroupModal
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
                onGroupCreated={onGroupCreated || (() => { })}
            />
        </div>
    );
};

ChatSidebar.propTypes = {
    groups: PropTypes.array.isRequired,
    selectedGroup: PropTypes.object,
    setSelectedGroup: PropTypes.func.isRequired,
    onGroupCreated: PropTypes.func,
};

export default ChatSidebar;