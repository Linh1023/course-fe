"use client"
import API from '@/api/api';
import { useSearchParams } from 'next/navigation';
import { createContext, useContext, useState, ReactNode } from 'react';

type QuerySearchClientContextType = {
    querySearch: string
    setQuerySearch: (v:string) => void
    isLoading:boolean
    setIsLoading:(v:boolean) => void
};

const QuerySearchClientContext = createContext<QuerySearchClientContextType | undefined>(undefined);

export const QuerySearchClientProvider = ({ children }: { children: ReactNode }) => {
      const searchParams = useSearchParams()
    const [querySearch, setQuerySearch] = useState<string>(() => searchParams.toString());
    const [isLoading, setIsLoading] = useState(false);



    return (

        <QuerySearchClientContext.Provider value={{ querySearch, setQuerySearch, isLoading , setIsLoading}}>
            {children}
        </QuerySearchClientContext.Provider>

    );
};

export const useQuerySearchClientContext = () => {
    const context = useContext(QuerySearchClientContext);
    if (!context) throw new Error('useUserContext must be used within a UserProvider');
    return context;
};
