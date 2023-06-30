import { FunctionComponent, useState, useEffect } from "react";
import axios from 'axios';
import "../assets/styles/MessagesFromUsers.scss";


interface MessagesFromUsersProps { }

interface Message {
    _id: string;
    name: string;
    email: string;
    message: string;
}

const MessagesFromUsers: FunctionComponent<MessagesFromUsersProps> = () => {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        const fetchMessages = async () => {
            const res = await axios.get('/api/messages');
            setMessages(res.data);
        };

        fetchMessages();
    }, []);

    return (
        <>
            {messages.map(message => (
                <div key={message._id} className="messageContainer">
                    <h2 className="messageName">{message.name}</h2>
                    <p className="messageEmail">{message.email}</p>
                    <p className="messageContent">{message.message}</p>
                </div>
            ))}
        </>
    );
}

export default MessagesFromUsers;
