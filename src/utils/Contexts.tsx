import { createContext } from 'react';
import useLogData from '../hooks/useLogData';

// Create a context
export const LogDataContext = createContext([]);

// Create a provider component
export const LogDataProvider = ({ children }) => {
  const logData = useLogData();

  return (
    <LogDataContext.Provider value={logData}>
      {children}
    </LogDataContext.Provider>
  );
};
