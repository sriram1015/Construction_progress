import React, { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "./UseContext";
import "./Profile.css";
import Listdata from "../Pages/listdata"
const node_url = import.meta.env.VITE_NODE_URL;

const Profile = () => {
    const { user, setUser } = useContext(UserContext); // Access the user details
    const [isEditing, setIsEditing] = useState(false); // Toggle edit mode
    const [formData, setFormData] = useState({
        username: user?.username || "",
        email: user?.email || "", // Include email in the form data
        phone: user?.phone || "",
        role: user?.memberType || "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = async () => {
        try {
            const response = await axios.put(`${node_url}/profile/update`, formData);
            setUser(response.data); // Update the user context with new data
            setIsEditing(false);
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile. Please try again.");
        }
    };

    if (!user) {
        return (
            <div className="profile-container">
                <p className="no-user">No user is logged in.</p>
            </div>
        );
    }

    return (
        <div className="profile-container">
            <div className="profile-banner">
                <img
                    src="/banner-image.jpg" // Replace with a banner image path
                    alt="Profile Banner"
                    className="profile-banner-image"
                />
            </div>
            <div className="profile-card">
                <img
                    src="/default-avatar.png" // Replace with a default avatar image path
                    alt="User Avatar"
                    className="profile-avatar"
                />
                {isEditing ? (
                    <div className="profile-edit-form">
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            placeholder="Username"
                            className="profile-input"
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Email"
                            className="profile-input"
                        />
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Phone"
                            className="profile-input"
                        />
                        <input
                            type="text"
                            name="role"
                            value={formData.role}
                            onChange={handleInputChange}
                            placeholder="Role"
                            className="profile-input"
                        />
                        <button className="profile-save-button" onClick={handleSave}>
                            Save
                        </button>
                        <button
                            className="profile-cancel-button"
                            onClick={() => setIsEditing(false)}
                        >
                            Cancel
                        </button>
                    </div>
                ) : (
                    <div className="profile-details">
                        <h1 className="profile-username">{formData.username}</h1>
                        <p className="profile-email">Email: {formData.email}</p>
                        <p className="profile-phone">Phone: {formData.phone}</p>
                        <p className="profile-role">Role: {formData.role}</p>
                        <button
                            className="profile-edit-button"
                            onClick={() => setIsEditing(true)}
                        >
                            Edit Profile
                        </button>
                    </div>
                )}
            </div>
                <Listdata />
        </div>
    );
};

export default Profile;