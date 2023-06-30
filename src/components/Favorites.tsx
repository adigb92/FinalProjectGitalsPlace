import React, { FunctionComponent, useEffect, useState } from "react";
import { fetchContents, deleteContent, updateContent } from "../utils/api";
import { Content } from "../models/Content";
import { useAuthStatus } from "../hooks/useAuthStatus";
import Modal from './Modal';

interface FavoritesProps { }

const Favorites: FunctionComponent<FavoritesProps> = () => {
    const [contents, setContents] = useState<Content[]>([]);
    const [selectedContent, setSelectedContent] = useState<Content | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [newDescription, setNewDescription] = useState("");
    const [newTitle, setNewTitle] = useState("");
    const [newBody, setNewBody] = useState("");
    const { isAdmin, token } = useAuthStatus();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const contentsData = await fetchContents();
                setContents(contentsData);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

        fetchData();
    }, []);


    useEffect(() => {

    }, [contents]);

    const handleDelete = async (id: string) => {
        if (isAdmin && token) {
            try {
                await deleteContent(id, token);
                setContents(contents.filter(content => content._id !== id));
            } catch (error) {
                console.error("Failed to delete content:", error);
            }
        }
    };

    const handleUpdate = (content: Content) => {
        setSelectedContent(content);
        setNewTitle(content.title);
        setNewBody(content.body);
        setNewDescription(content.description);
        setModalVisible(true);
    };

    const handleUpdateSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isAdmin && token && selectedContent) {
            const updatedData = new FormData();
            updatedData.append('title', newTitle);
            updatedData.append('body', newBody);
            updatedData.append('description', newDescription);
            try {
                const response = await updateContent(selectedContent._id, updatedData, token);
                if (response.data) {
                    setContents(contents.map(content => content._id === selectedContent._id ? response.data : content));
                }
            } catch (error) {
                console.error("Failed to update content:", error);
            }
        }
        setModalVisible(false);
    };

    return (
        <div className="container">
            <h1 className="text-center mt-5">Our Work</h1>
            <div className="row mt-4">
                {contents.map((item: Content) => (
                    <div key={item._id} className="col-md-4 col-lg-3 mb-4">
                        <div className="card">
                            {item.image && (
                                <img src={item.image} className="card-img-top" alt={item.title} />
                            )}
                            <div className="card-body">
                                <h5 className="card-title">{item.title}</h5>
                                <p className="card-text">{item.description}</p>
                                <p className="card-text">{item.body}</p>
                                {isAdmin && (
                                    <div>
                                        <button onClick={() => handleUpdate(item)}>Update</button>
                                        <button onClick={() => handleDelete(item._id)}>Delete</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {modalVisible && selectedContent && (
                <Modal onClose={() => setModalVisible(false)}>
                    <h2>Update Content</h2>
                    <form onSubmit={handleUpdateSubmit}>
                        <label>
                            New Title:
                            <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                        </label>
                        <label>
                            New Body:
                            <input type="text" value={newBody} onChange={(e) => setNewBody(e.target.value)} />
                        </label>
                        <label>
                            New Description:
                            <input type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
                        </label>
                        <button type="submit">Submit</button>
                    </form>
                </Modal>
            )}
        </div>
    );
};

export default Favorites;
