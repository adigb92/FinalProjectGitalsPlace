import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { getRole, getToken } from "../utils/auth";

interface AuthState {
    isLoggedIn: boolean;
    isAdmin: boolean;
    token: string | null;
    role: string | null;
}

interface AuthContextType extends AuthState {
    updateAuthState: (newAuthState: Partial<AuthState>) => void;
    updateAuthStateFromEvent: (event: StorageEvent) => void;
}

const initialState: AuthState = {
    isLoggedIn: !!getToken(),
    isAdmin: getRole() === "admin",
    token: getToken(),
    role: getRole(),
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [authState, setAuthState] = useState<AuthState>(initialState);

    const updateAuthState = useCallback((newAuthState: Partial<AuthState>) => {
        setAuthState((prevState) => ({ ...prevState, ...newAuthState }));
    }, []);

    const updateAuthStateFromEvent = useCallback((event: StorageEvent) => {
        if (event.key === "token" || event.key === "role") {
            const newToken = getToken();
            const role = getRole();
            const newIsLoggedIn = !!newToken;
            const newIsAdmin = role === "admin";
            setAuthState({ isLoggedIn: newIsLoggedIn, isAdmin: newIsAdmin, token: newToken, role });
        }
    }, []);

    useEffect(() => {
        window.addEventListener("storage", updateAuthStateFromEvent);

        return () => {
            window.removeEventListener("storage", updateAuthStateFromEvent);
        };
    }, [updateAuthStateFromEvent]);

    return (
        <AuthContext.Provider value={{ ...authState, updateAuthState, updateAuthStateFromEvent }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
};
