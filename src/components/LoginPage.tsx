import React, { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../utils/api";
import { useAuthContext } from "../contexts/AuthContext";

interface LoginPageProps { }

const LoginPage: FunctionComponent<LoginPageProps> = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { updateAuthState } = useAuthContext();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await login({ email, password });
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
            }
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="container">
            <h1 className="text-center mt-5">Login</h1>
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4 mt-4">
                    {error && (
                        <div className="alert alert-danger text-center">{error}</div>
                    )}
                    <form onSubmit={handleSubmit}>
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
                        <button type="submit" className="btn btn-primary w-100">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
