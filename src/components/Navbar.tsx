import {
    FunctionComponent
} from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { removeToken, removeRole } from "../utils/auth";
import { useNavigate } from "react-router-dom";

interface NavbarProps { }

const Navbar: FunctionComponent<NavbarProps> = () => {
    const { isLoggedIn, isAdmin, updateAuthState } = useAuthContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        removeToken();
        removeRole();
        updateAuthState({ isLoggedIn: false, isAdmin: false, token: null });
        navigate("/");
    };

    return (
        <nav className="navbar navbar-expand-lg custom-navbar">
            <div className="container">
                <Link to="/home" className="navbar-brand">
                    Gital's place
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link to="/home" className="nav-link">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/about" className="nav-link">
                                About
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/service" className="nav-link">
                                Services
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/favorites" className="nav-link">
                                Our Work
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/contact" className="nav-link">
                                Contact Us
                            </Link>
                        </li>
                        {!isLoggedIn && (
                            <>
                                <li className="nav-item">
                                    <Link to="/" className="nav-link">
                                        Login
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/register" className="nav-link">
                                        Register
                                    </Link>
                                </li>
                            </>
                        )}
                        {isLoggedIn && (
                            <>
                                <li className="nav-item">
                                    <Link to="/book" className="nav-link">
                                        Book an appointment
                                    </Link>
                                </li>
                                {isAdmin && (
                                    <>
                                        <li className="nav-item">
                                            <Link to="/admin" className="nav-link">
                                                Admin
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/contform" className="nav-link">
                                                Add content
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/allapp" className="nav-link">
                                                All appointments
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/messages" className="nav-link">
                                                Messages from users
                                            </Link>
                                        </li>
                                    </>
                                )}
                                <li className="nav-item">
                                    <button onClick={handleLogout} className="btn btn-link nav-link">
                                        Logout
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
            <style>{`
                .custom-navbar {
                  background-color: #9f5f80 !important;
                  color: #f8f9fa;
                }
                .custom-navbar .nav-link {
                  color: #f8f9fa !important;
                }
                .custom-navbar .nav-link:hover {
                  color: #adb5bd !important;
                }
            `}</style>
        </nav>
    );
};

export default Navbar;
