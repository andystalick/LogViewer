import './LogListItem.css';

import JsonDisplay from '../JsonDisplay/JsonDisplay';
import { LogItem } from '../../hooks/useLogData';
import { useState } from 'react';

interface LogListItemProps {
  logItem: LogItem;
}

const LogListItem: React.FC<LogListItemProps> = ({ logItem }) => {
  const formatttedTime = new Date(logItem.parsedRow._time).toISOString();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <details
      className="log-list-item"
      open={isOpen}
      onToggle={() => setIsOpen(!isOpen)}
    >
      <summary>
        <time className="item-time">{formatttedTime}</time>
        <div className="item-raw">{`"${logItem.rawRow}"`}</div>
      </summary>
      {isOpen && <JsonDisplay obj={logItem.parsedRow} />}
    </details>
  );
};

export default LogListItem;
