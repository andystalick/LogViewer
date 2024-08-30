import './LogList.css';

import { LogDataContext } from '../../utils/Contexts';
import LogListView from './LogListView';
import { TOTALROWS } from '../../utils/constants';
import { useContext } from 'react';

const LogList: React.FC = () => {
  const logData = useContext(LogDataContext);

  return (
    <LogListView
      loading={logData.loading}
      logItems={logData.logItems}
      totalRows={TOTALROWS}
    ></LogListView>
  );
};

export default LogList;
