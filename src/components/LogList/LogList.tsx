import './LogList.css';

import { useContext, useMemo } from 'react';

import Loader from '../Loader';
import { LogDataContext } from '../../utils/Contexts';
import LogListItem from '../LogListItem';
import { TOTALROWS } from '../../utils/constants';

const LogListView: React.FC = () => {
  const { logItems, loading } = useContext(LogDataContext);

  const memoizedLogItems = useMemo(() => logItems, [logItems]);

  return (
    <div className="log-list">
      <div className="list-header">
        <div className="list-header list-header-time">Time</div>
        <div className="list-header list-header-event">Event</div>
      </div>
      {loading && (
        <Loader loaded={Object.keys(logItems).length} total={TOTALROWS} />
      )}
      <div className="list-body">
        {Object.keys(memoizedLogItems).map((key, index) => (
          <LogListItem
            key={`${index}-${key}`}
            rawRow={logItems[key]?.rawRow}
            rawTime={key}
          />
        ))}
      </div>
    </div>
  );
};

export default LogListView;
