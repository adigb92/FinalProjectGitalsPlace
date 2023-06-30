import React, { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../utils/api";
import { useAuthContext } from "../contexts/AuthContext";

interface RegisterPageProps { }

const RegisterPage: FunctionComponent<RegisterPageProps> = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { updateAuthState } = useAuthContext();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const userData = { name, email, password };
            const response = await register(userData);
            if (response && response.token) {
                localStorage.setItem("token", response.token);
                localStorage.setItem("role", response.role);

                updateAuthState({
                    isLoggedIn: true,
                    isAdmin: response.role === 'admin',
                    token: response.token,
                    role: response.role,
                });
                navigate("/home");
            } else {
                setError("Registration failed, please try again.");
            }
        } catch (err) {
            const error = err as Error;
            setError(error.message);
        }
    };

    return (
        <div className="container">
            <h1 className="text-center mt-5">Register</h1>
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4 mt-4">
                    {error && (
                        <div className="alert alert-danger text-center">{error}</div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email address
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
