import { ReactElement, createContext } from 'react';

import type { LogData } from '../hooks/useLogData';
import useLogData from '../hooks/useLogData';

// Create a context
export const LogDataContext = createContext({
  logItems: {},
  loading: false,
  error: null,
} as LogData);

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
