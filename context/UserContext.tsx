
'use client';
// context/UserContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the User interface
interface User {
    firstName: string;
    email: string;
    Points: number;
    username:string;
}

// Define the context interface
interface UserContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
}

// Create the UserContext with initial undefined state
const UserContext = createContext<UserContextType | undefined>(undefined);

// Custom hook to use the UserContext
export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

// UserProviderProps interface for component props
interface UserProviderProps {
    children: ReactNode;
}

// Provider component
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    // Load user data from localStorage on initial render
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Store or remove user in localStorage when user state changes
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    // Login function to set the user state
    const login = (userData: User) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    // Logout function to clear user data
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};
