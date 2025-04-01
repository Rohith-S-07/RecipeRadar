import { useState } from "react";
import axios from "../config"; // Ensure API base URL is configured in `config.js`

const AddTag = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !image || !description) {
      setError("All fields are required.");
      return;
    }
    try {
      const response = await axios.post("/tags", { name, image, description });
      setSuccess("Tag added successfully!");
      setName("");
      setImage("");
      setDescription("");
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="container">
      <h2>Add New Tag</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <label>Tag Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

        <label>Image URL:</label>
        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} required />

        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

        <button type="submit">Add Tag</button>
      </form>
    </div>
  );
};

export default AddTag;