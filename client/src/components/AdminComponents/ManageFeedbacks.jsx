import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config";
import NotificationModal from "../Modals/NotificationModal";
import LottiePlayer from "../LottiePlayer";

const ManageFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${config.BASE_URL}/admin/getFeedbacks`);
      setFeedbacks(response.data);
    } catch (error) {
      console.error("Error fetching feedbacks", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (feedbackId, newStatus) => {
    try {
      await axios.put(`${config.BASE_URL}/admin/updateFeedbackStatus/${feedbackId}`, {
        status: newStatus
      });

      // Update state locally
      const updatedFeedbacks = feedbacks.map(fb => {
        if (fb._id === feedbackId) {
          return { ...fb, status: newStatus };
        }
        return fb;
      });
      setFeedbacks(updatedFeedbacks);

      setNotificationMessage("Status updated successfully!");
    } catch (error) {
      console.error("Error updating status", error);
      setNotificationMessage("Failed to update status.");
    } finally {
      setIsNotificationOpen(true);
    }
  };

  return (
    <div className="p-3">
      <h2 className="custom-heading pb-3">Manage Feedbacks</h2>
      {loading ? (
        <div className="text-muted text-center">
          <LottiePlayer src="https://lottie.host/10236891-3b0a-4744-be9f-74e8fd54026d/in2dZGOmWu.lottie" />
          <br />
          Loading feedback data...
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped rounded-3 overflow-hidden">
            <thead className="table-dark">
              <tr>
                <th>User Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Status</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map(fb => (
                <tr key={fb._id}>
                  <td>{fb.first_name} {fb.last_name}</td>
                  <td>{fb.email}</td>
                  <td>{fb.message}</td>
                  <td>
                    <span className={`badge fs-6 bg-${fb.status === "Resolved" ? "success" : fb.status === "Reviewed" ? "warning" : "secondary"}`}>
                      {fb.status || "Pending"}
                    </span>
                  </td>
                  <td>
                    <select
                      className="form-select form-select-sm"
                      value={fb.status || "Pending"}
                      onChange={(e) => handleStatusChange(fb._id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Reviewed">Reviewed</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <NotificationModal
        isOpen={isNotificationOpen}
        onRequestClose={() => setIsNotificationOpen(false)}
        message={notificationMessage}
      />
    </div>
  );
};

export default ManageFeedbacks;