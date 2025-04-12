import React, { useState, useRef, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import { AiOutlineUpload } from 'react-icons/ai';
import { FiArrowLeft } from 'react-icons/fi';
import './AddRole.css';

const node_url = import.meta.env.VITE_NODE_URL;

const AddRole = () => {
    const editorEl = useRef(null);
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);
    const [stageContent, setStageContent] = useState({});
    const [assignedUser, setAssignedUser] = useState('');
    const [allUsers, setAllUsers] = useState([]);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedStageName, setSelectedStageName] = useState(''); // State for selected stage name

    // Predefined list of stage names
    const stageNames = [
        'Foundation',
        'Plinth',
        'Column',
        'Beam',
        'Roofing',
        'Finishing',
        'Painting',
    ];

    const clearInputs = () => {
        setTitle('');
        setImage(null);
        setStageContent({});
        setAssignedUser('');
        if (editorEl.current) {
            editorEl.current.editor.setData('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !image || !assignedUser || Object.keys(stageContent).length === 0) {
            setError('All fields are required.');
            setTimeout(() => setError(''), 5000);
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('image', image);
        formData.append('stageContent', JSON.stringify(stageContent));
        formData.append('assignedUser', assignedUser);

        try {
            const { data } = await axios.post(`${node_url}/add/role/addrole`, formData);
            setSuccess('Role added successfully!');
            clearInputs();
            setTimeout(() => setSuccess(''), 7000);
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred.');
            setTimeout(() => setError(''), 7000);
        }
    };

    const addStage = () => {
        if (!selectedStageName) {
            setError('Please select a stage name.');
            setTimeout(() => setError(''), 5000);
            return;
        }

        setStageContent((prev) => ({
            ...prev,
            [selectedStageName]: '',
        }));
        setSelectedStageName(''); // Reset the dropdown after adding
    };

    const handleStageChange = (stageName, content) => {
        setStageContent((prev) => ({
            ...prev,
            [stageName]: content,
        }));
    };

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const { data } = await axios.get(`${node_url}/add/use1`);
            setAllUsers(data);
        } catch (err) {
            console.error('Error fetching users:', err);
            setError('Failed to load users.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImage(event.target.result); // Store image preview as a data URL
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="add-role-page">
            <button className="back-btn" onClick={() => window.history.back()}>
                <FiArrowLeft /> Back
            </button>

            <form onSubmit={handleSubmit} className="add-role-form">
                {error && <div className="error-msg">{error}</div>}
                {success && <div className="success-msg">{success}</div>}

                <input
                    type="text"
                    placeholder="Role Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    aria-label="Role Title"
                />

                <div className="upload-container">
                    <div className="role-image-field" onClick={() => document.getElementById("imageInput").click()}>
                        <AiOutlineUpload size={100} color="#007bff" />
                        <div className="upload-text">Upload BluePrint of the Project.</div>
                        <input
                            type="file"
                            accept="image/*"
                            id="imageInput"
                            onChange={handleImageChange}
                            hidden
                            aria-label="Upload Image"
                        /> 
                    </div>

                    {image && (
                        <div className="image-preview-container">
                            <img src={image} alt="Uploaded Preview" className="role-image-preview" />
                        </div>
                    )}
                </div>

                <div className="stages-section">
                    <h3>Construction Stages</h3>
                    <div className="stage-dropdown">
                        <select
                            value={selectedStageName}
                            onChange={(e) => setSelectedStageName(e.target.value)}
                            aria-label="Select Stage Name"
                        >
                            <option value="" disabled>
                                Select a stage name
                            </option>
                            {stageNames.map((name) => (
                                <option key={name} value={name}>
                                    {name}
                                </option>
                            ))}
                        </select>
                        <button
                            type="button"
                            onClick={addStage}
                            className="add-stage-btn"
                        >
                            Add Stage
                        </button>
                    </div>

                    {Object.keys(stageContent).map((stage) => (
                        <div key={stage} className="stage-editor">
                            <h4>{stage}</h4>
                            <CKEditor
                                editor={ClassicEditor}
                                data={stageContent[stage]}
                                onChange={(event, editor) =>
                                    handleStageChange(stage, editor.getData())
                                }
                                ref={editorEl}
                            />
                        </div>
                    ))}
                </div>

                <div className="assign-users-section">
                    <h3>Assign to Engineer</h3>
                    {isLoading ? (
                        <p>Loading users...</p>
                    ) : (
                        <select
                            value={assignedUser}
                            onChange={(e) => setAssignedUser(e.target.value)}
                            aria-label="Assign to User"
                        >
                            <option value="" disabled>
                                Select a user
                            </option>
                            {allUsers.map((user) => (
                                <option key={user.id} value={user.username}>
                                    {user.username}
                                </option>
                            ))}
                        </select>
                    )}
                </div>

                <button type="submit" className="submit-role-btn">
                    Submit Role
                </button>
            </form>
        </div>
    );
};

export default AddRole;