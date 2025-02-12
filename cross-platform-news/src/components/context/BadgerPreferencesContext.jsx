import { createContext, useState, useContext } from 'react';

const BadgerPreferencesContext = createContext();

export function BadgerPreferencesProvider({ children }) {
    const [preferences, setPreferences] = useState({});

    return (
        <BadgerPreferencesContext.Provider value={{ preferences, setPreferences }}>
            {children}
        </BadgerPreferencesContext.Provider>
    );
}

export function usePreferences() {
    return useContext(BadgerPreferencesContext);
}