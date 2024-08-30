import './LogList.css';

import Loader from '../Loader';
import type { LogItem } from '../../hooks/useLogData';
import LogListItem from '../LogListItem';

interface LogListViewProps {
  loading: boolean;
  logItems: { [key: string]: LogItem };
  totalRows: number;
}

const LogListView: React.FC<LogListViewProps> = (props) => {
  const { loading, logItems, totalRows } = props;
  return (
    <div className="log-list">
      <div className="list-header">
        <div className="list-header list-header-time">Time</div>
        <div className="list-header list-header-event">Event</div>
      </div>
      {loading && (
        <Loader loaded={Object.keys(logItems).length} total={totalRows} />
      )}
      <div className="list-body">
        {Object.keys(logItems).map((key, index) => (
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
