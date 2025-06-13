"use client"
import API from '@/api/api';
import { createContext, useContext, useState, ReactNode } from 'react';

type SubmittedClientContextType = {
    submitted: string[]
   setSubmitted: React.Dispatch<React.SetStateAction<string[]>>;
};

const SubmittedClientContext = createContext<SubmittedClientContextType | undefined>(undefined);

export const SubmittedClientProvider = ({ children }: { children: ReactNode }) => {
    const [submitted, setSubmitted] = useState<string[]>([]);




    return (

        <SubmittedClientContext.Provider value={{submitted, setSubmitted}}>
            {children}
        </SubmittedClientContext.Provider>

    );
};

export const useSubmittedClientContext = () => {
    const context = useContext(SubmittedClientContext);
    if (!context) throw new Error('useUserContext must be used within a UserProvider');
    return context;
};
