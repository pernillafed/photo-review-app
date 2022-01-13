import React, { createContext, useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext();

const useAuthContext = () => {
    return useContext(AuthContext);
};

const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logout = () => {
        return signOut(auth);
    };

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });
    }, []);

    const values = {
        currentUser,
        signup,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={values}>
            {loading ? <p className="m-5 text-center">Loading...</p> : children}
        </AuthContext.Provider>
    )
};

export { useAuthContext, AuthContextProvider as default }