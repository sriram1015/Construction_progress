import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../Auth/UseContext";
import "./Profile.css";
import Listdata from "./listdata";

const node_url = import.meta.env.VITE_NODE_URL;

const Profile = () => {
    const { user, setUser } = useContext(UserContext);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        username: user?.username || "",
        email: user?.email || "",
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
            setUser(response.data);
            setIsEditing(false);
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile. Please try again.");
        }
    };

    const getInitials = (name) => {
        if (!name) return "";
        const names = name.split(" ");
        let initials = names[0].substring(0, 1).toUpperCase();
        if (names.length > 1) {
            initials += names[names.length - 1].substring(0, 1).toUpperCase();
        }
        return initials;
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
            <div className="profile-card">
                <div className="profile-content">
                    {/* Left Side - Image */}
                    <div className="profile-image-container">
                        {user?.profileImage ? (
                            <img
                                src={user.profileImage}
                                alt="Profile"
                                className="profile-avatar"
                            />
                        ) : (
                            <div className="profile-avatar-initials">
                                {getInitials(user.username)}
                            </div>
                        )}
                    </div>

                    {/* Right Side - Details */}
                    <div className="profile-details-container">
                        {isEditing ? (
                            <div className="profile-edit-form">
                                <h2><b>Edit Profile</b></h2>
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
                                <div className="button-group">
                                    <button className="profile-save-button" onClick={handleSave}>
                                        Save Changes
                                    </button>
                                    <button
                                        className="profile-cancel-button"
                                        onClick={() => setIsEditing(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="profile-details">
                                <h1><b>{formData.username}</b></h1>
                                <div className="profile-info">
                                    <div className="profile-info-item">
                                        <span className="profile-info-label">Email:</span>
                                        <span className="profile-info-value">{formData.email}</span>
                                    </div>
                                    <div className="profile-info-item">
                                        <span className="profile-info-label">Phone:</span>
                                        <span className="profile-info-value">{formData.phone}</span>
                                    </div>
                                    <div className="profile-info-item">
                                        <span className="profile-info-label">Role:</span>
                                        <span className="profile-info-value">{formData.role}</span>
                                    </div>
                                </div>
                                <button
                                    className="profile-edit-button"
                                    onClick={() => setIsEditing(true)}
                                >
                                    Edit Profile
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Listdata />
        </div>
    );
};

export default Profile;
