import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/HomePage.scss';
import videoSrc from '../assets/images/video_home.mp4';

interface HomePageProps { }

const HomePage: FunctionComponent<HomePageProps> = () => {
    return (
        <div className="home-page">
            <div className="welcome-section">
                <div className="flex-container">
                    <div className="flex-item">
                        <h1 className="text-center">Welcome to Gital's place!</h1>
                        <p className="text-center">
                            We offer a wide range of professional nail care services. Browse through our services and book your
                            appointment today.
                        </p>
                        <div className="button-section">
                            <p className="appointment-text">To book an appointment, click here:</p>
                            <Link to="/book" className="appointment-button">
                                Book Appointment
                            </Link>
                        </div>
                    </div>
                    <div className="flex-item mt-2">
                        <div className="video-section">
                            <video className="home-video" src={videoSrc} autoPlay muted playsInline>
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                </div>
            </div>

            <div className="features-section">
                <h3>Why Choose Us?</h3>
                <ul>
                    <li>High-quality services</li>
                    <li>Experienced nail technicians</li>
                    <li>Relaxing and comfortable atmosphere</li>
                </ul>
            </div>

            <div className="contact-section">
                <h3>Contact Us</h3>
                <p>
                    Address: Raban Gamliel 5, Netanya
                    <br />
                    Phone: (052) 555-7313
                    <br />
                    Email: info@nailcareapp.com
                </p>
                <Link to="/contact" className="btn btn-outline-info">
                    Contact us
                </Link>
            </div>
        </div>
    );
};

export default HomePage;