import './LogListItem.css';

import JsonDisplay from '../JsonDisplay/JsonDisplay';
import { useState } from 'react';

interface LogListItemProps {
  logItem: string;
}

const LogListItem: React.FC<LogListItemProps> = ({ logItem }) => {
  const regex = /"_time":(\d+)/;
  const time = logItem.match(regex) || '';
  const formattedTime = new Date(Number(time[1])).toISOString();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <details
      className="log-list-item"
      open={isOpen}
      onToggle={() => setIsOpen(!isOpen)}
    >
      <summary>
        <time className="item-time">{formattedTime}</time>
        <div className="item-raw">{`"${logItem}"`}</div>
      </summary>
      {isOpen && <JsonDisplay str={logItem} />}
    </details>
  );
};

export default LogListItem;
