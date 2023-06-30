import { FunctionComponent, useState } from "react";
import axios from 'axios';
import "../assets/styles/ContactUs.scss";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

interface ContactUsProps { }

const ContactUs: FunctionComponent<ContactUsProps> = () => {
    const navigate = useNavigate();
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/contact', formState);
            if (response.status === 200) {
                toast.success('Message sent successfully', {
                    position: toast.POSITION.TOP_RIGHT
                });
                setFormState({ name: '', email: '', message: '' });
                navigate('/home');
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred while trying to send the message. Please try again.', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState({ ...formState, [event.target.name]: event.target.value });
    };

    return (
        <>
            <ToastContainer />
            <div className="contact-us-container">
                <h2>Contact Us</h2>
                <p>
                    We would love to hear from you! For any inquiries or questions, please
                    fill out the form below or reach out to us using the contact
                    information provided.
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" name="name" id="name" required onChange={handleChange} value={formState.name} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" name="email" id="email" required onChange={handleChange} value={formState.email} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message:</label>
                        <textarea name="message" id="message" required onChange={handleChange} value={formState.message}></textarea>
                    </div>
                    <button type="submit">Submit</button>
                </form>
                <div className="contact-info">
                    <h3>Contact Information</h3>
                    <p>
                        Phone: <span>(052) 555-7313</span>
                    </p>
                    <p>
                        Email: <span>info@nailcareapp.com</span>
                    </p>
                    <p>
                        Address: <span>Raban Gamliel 5, Netanya</span>
                    </p>
                </div>
            </div>
        </>
    );
};

export default ContactUs;
