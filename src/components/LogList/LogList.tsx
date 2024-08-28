import './LogList.css';

import Loader from '../Loader';
import { LogDataContext } from '../../utils/Contexts';
import LogListItem from '../LogListItem';
import { TOTALROWS } from '../../utils/constants';
import { useContext } from 'react';

const LogList: React.FC = () => {
  const logData = useContext(LogDataContext);

  return (
    <div className="log-list">
      <div className="list-header">
        <div className="list-header list-header-time">Time</div>
        <div className="list-header list-header-event">Event</div>
      </div>
      {logData.loading && (
        <Loader
          loaded={Object.keys(logData?.logItems || []).length}
          total={TOTALROWS}
        />
      )}
      <div className="list-body">
        {Object.keys(logData.logItems).map((key, index) => (
          <LogListItem
            key={`${index}-${key}`}
            logItem={logData.logItems[key]}
          />
        ))}
      </div>
    </div>
  );
};

export default LogList;
