import './LogList.css';

import { LogDataContext } from '../../utils/Contexts';
import LogListItem from '../LogListItem';
import { useContext } from 'react';

const LogList = () => {
  const logData = useContext(LogDataContext);

  return (
    <div className="log-list">
      <div>
        <span>Time</span>
        <span>Event</span>
      </div>
      <div>
        {logData.loading == true &&
          `Loaded ${Object.keys(logData?.logItems || []).length} rows`}
      </div>
      <div className="scroller">
        <div>
          {Object.keys(logData.logItems).map((key, index) => (
            <LogListItem
              key={`${index}-${key}`}
              itemData={logData.logItems[key]}
            />
          ))}
        </div>
        {logData.loading == true && <div>{`...`}</div>}
      </div>
    </div>
  );
};

export default LogList;
