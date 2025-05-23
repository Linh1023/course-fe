"use client"
import { FetchServerGetApi } from '@/actions/server/fetch_server_api';
import API from '@/api/api';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type CurrentAccountContextType = {
  currentAccount: CurrentAccountResponse | null;
  setCurrentAccount: (value: CurrentAccountResponse) => void;
  fetchGetCurrentAccount: () => void
};

const CurrentAccountContext = createContext<CurrentAccountContextType | undefined>(undefined);

export const CurrentAccountProvider = ({ children, currentAccountRes }: { children: ReactNode,  currentAccountRes: CurrentAccountResponse | null; }) => {

  const [currentAccount, setCurrentAccount] = useState<CurrentAccountResponse | null>(currentAccountRes);


  const fetchGetCurrentAccount = async () => {
    // lay thong tin user
    const res = await FetchServerGetApi(API.ACCOUNT.CURRENT_ACCOUNT)
    if (res && res.status === 200) {
        const user: CurrentAccountResponse = res.result
        setCurrentAccount(user)
    } else {
      setCurrentAccount(null)
    }
  }

  // useEffect(() => {
  //   console.log("run current account context >>>")
  //   const fetch = async () => {
  //    await fetchGetCurrentAccount()
  //   }
  //   fetch()
  // },[])

  return (
    <CurrentAccountContext.Provider value={{ currentAccount, setCurrentAccount, fetchGetCurrentAccount }}>
      {children}
    </CurrentAccountContext.Provider>

  );
};

export const useCurrentAccountContext = () => {
  const context = useContext(CurrentAccountContext);
  if (!context) throw new Error('useUserContext must be used within a UserProvider');
  return context;
};
