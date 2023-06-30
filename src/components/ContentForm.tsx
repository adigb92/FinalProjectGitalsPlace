import React, { FunctionComponent, useState } from "react";
import { createContent } from "../utils/api";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ContentForm: FunctionComponent = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<File | null>(null);

    const { token } = useAuthStatus();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('body', body);
            formData.append('description', description);
            if (image) {
                formData.append('image', image);
            }

            if (token) {
                await createContent(formData, token);
                toast.success('Content added successfully!', {
                    position: toast.POSITION.TOP_RIGHT
                });
                setTitle("");
                setBody("");
                setDescription("");
                setImage(null);
                navigate('/favorites');
            }

        } catch (error) {
            const err = error as Error;
            console.error("Error adding content:", err);
            toast.error('Error adding content: ' + err.message, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.length) {
            setImage(event.target.files[0]);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="container mt-4" encType="multipart/form-data">
            <h2 className="mb-4">Add Content</h2>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">
                    Title:
                </label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <label htmlFor="body" className="form-label">
                    Body:
                </label>
                <textarea
                    id="body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    required
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">
                    Description:
                </label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <label htmlFor="image" className="form-label">
                    Image:
                </label>
                <input
                    type="file"
                    id="image"
                    onChange={handleFileChange}
                    required
                    className="form-control"
                />
            </div>
            <button type="submit" className="btn btn-primary">
                Add Content
            </button>
        </form>
    );
};

export default ContentForm;
