import { FunctionComponent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

interface FooterProps { }

const Footer: FunctionComponent<FooterProps> = () => {
    const { isLoggedIn, isAdmin } = useAuthContext();
    const [authState, setAuthState] = useState({ isLoggedIn, isAdmin });

    useEffect(() => {
        setAuthState({ isLoggedIn, isAdmin });
    }, [isLoggedIn, isAdmin]);

    return (
        <footer className="footer py-4">
            <div className="container">
                <div className="row">
                    <div className="col-md-4 text-light">
                        <h5>&copy; 2023 Gital's Place</h5>
                        <p>Developed by Adi Gabay</p>
                        <div className="social-icons">
                            <Link to="https://www.facebook.com/profile.php?id=100000463246110" className="social-icon">
                                <i className="fab fa-facebook-f"></i>
                            </Link>
                            <Link to="https://www.instagram.com/_gitalcohen_/" className="social-icon">
                                <i className="fab fa-instagram"></i>
                            </Link>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <ul className="list-inline text-md-end text-light">
                            <li className="list-inline-item">
                                <Link to="/home" className="nav-link">
                                    Home
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="/about" className="nav-link">
                                    About
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="/service" className="nav-link">
                                    Services
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="/favorites" className="nav-link">
                                    Our Work
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="/contact" className="nav-link">
                                    Contact Us
                                </Link>
                            </li>
                            {!authState.isLoggedIn && (
                                <>
                                    <li className="list-inline-item">
                                        <Link to="/" className="nav-link">
                                            Login
                                        </Link>
                                    </li>
                                    <li className="list-inline-item">
                                        <Link to="/register" className="nav-link">
                                            Register
                                        </Link>
                                    </li>
                                </>
                            )}
                            {authState.isLoggedIn && (
                                <>
                                    <li className="list-inline-item">
                                        <Link to="/book" className="nav-link">
                                            Book an appointment
                                        </Link>
                                    </li>
                                    {authState.isAdmin && (
                                        <>
                                            <li className="list-inline-item">
                                                <Link to="/admin" className="nav-link">
                                                    Admin
                                                </Link>
                                            </li>
                                            <li className="list-inline-item">
                                                <Link to="/contform" className="nav-link">
                                                    Add content
                                                </Link>
                                            </li>
                                            <li className="list-inline-item">
                                                <Link to="/allapp" className="nav-link">
                                                    All appointments
                                                </Link>
                                            </li>
                                            <li className="list-inline-item">
                                                <Link to="/messages" className="nav-link">
                                                    Messages from users
                                                </Link>
                                            </li>
                                        </>
                                    )}
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
            <style>{`
                .footer {
                    background-color: #9f5f80;
                }
                .nav-link {
                    color: #f8f9fa;
                }
                .nav-link:hover {
                    color: #adb5bd;
                }
                .social-icons {
                    display: flex;
                    gap: 1rem;
                }
                .social-icon {
                    color: #f8f9fa;
                    font-size: 1.5rem;
                }
                .social-icon:hover {
                    color: #adb5bd;
                }
            `}</style>
        </footer>
    );
};

export default Footer;
