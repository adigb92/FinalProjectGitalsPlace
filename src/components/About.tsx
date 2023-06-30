import React, { FunctionComponent } from "react";
import "../assets/styles/About.scss";
import { Link } from "react-router-dom";


interface AboutProps {
    background: string;
}

const About: FunctionComponent<AboutProps> = ({ background }) => {
    return (
        <div className="about-container">
            <div className="about-content">
                <h1>About Us</h1>
                <div className="about-text">
                    <p>
                        Welcome to our nail salon! We are a team of dedicated professionals who strive to provide the highest quality nail care services in a relaxing and comfortable environment. Our nail technicians have years of experience and are passionate about creating beautiful and healthy nails for our clients.
                    </p>
                    <p>
                        We offer a wide range of services, including manicures, pedicures, nail extensions, nail art, and more. We use only the best products and equipment to ensure the best results for our clients. Our commitment to cleanliness and hygiene ensures a safe and enjoyable experience for everyone who visits our salon.
                    </p>
                    <p>
                        Thank you for choosing us for your nail care needs. We look forward to serving you soon!
                    </p>
                </div>
            </div>
            <img src={background} alt="Background" className="about-background" />
            <Link to="/favorites" className="btn btn-outline-success">
                To Our Work
            </Link>
        </div>
    );
};

export default About;
