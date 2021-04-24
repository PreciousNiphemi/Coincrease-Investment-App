import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../components/firebase';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    const signUp = (email, password) => {
       return auth.createUserWithEmailAndPassword(email, password)
    }

    const signIn = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password)
    }

    const signOut = () => {
        localStorage.clear()
        return auth.signOut()  
       
    }

    const resetPassword = (email) => {
        return auth.sendPasswordResetEmail(email)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        signUp,
        signIn,
        signOut,
        resetPassword
    }

    return (
        <AuthContext.Provider value={value} >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
