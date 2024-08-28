import { ReactElement, createContext } from 'react';

import useLogData from '../hooks/useLogData';

// Create a context
export const LogDataContext = createContext([]);

// Create a provider component
export const LogDataProvider = (props: { children: ReactElement }) => {
  const { children } = props;
  const logData = useLogData();

  return (
    <LogDataContext.Provider value={logData}>
      {children}
    </LogDataContext.Provider>
  );
};
