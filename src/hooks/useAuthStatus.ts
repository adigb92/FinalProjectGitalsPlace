import { useCallback, useEffect, useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { getRole, getToken } from "../utils/auth";

export const useAuthStatus = () => {
    const { isLoggedIn, isAdmin, token, updateAuthState } = useAuthContext();
    const [isLoading, setIsLoading] = useState(true);

    const updateAuthStatus = useCallback(() => {
        const newToken = getToken();
        const role = getRole();
        const newIsLoggedIn = !!newToken;
        const newIsAdmin = role === "admin";
        updateAuthState({ isLoggedIn: newIsLoggedIn, isAdmin: newIsAdmin, token: newToken, role });
        setIsLoading(false);
    }, [updateAuthState]);

    const updateOnStorageChange = useCallback(
        (event: StorageEvent) => {
            if (event.key === "token" || event.key === "role") {
                const newToken = getToken();
                const role = getRole();
                if (newToken !== token || role !== (isAdmin ? "admin" : "user")) {
                    updateAuthStatus();
                }
            }
        },
        [updateAuthStatus, token, isAdmin]
    );

    useEffect(() => {
        window.addEventListener("storage", updateOnStorageChange);
        updateAuthStatus();

        return () => {
            window.removeEventListener("storage", updateOnStorageChange);
        };
    }, [updateOnStorageChange]);

    return { isLoggedIn, isAdmin, updateAuthStatus, token, isLoading };
};
