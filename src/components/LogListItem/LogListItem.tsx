import './LogListItem.css';

import { memo, useState } from 'react';

import JsonDisplay from '../JsonDisplay/JsonDisplay';
import type { LogItem } from '../../hooks/useLogData';

const LogListItem = memo<{ logItem: LogItem; rawTime: string }>(
  ({ logItem, rawTime }) => {
    const formattedTime = new Date(Number(rawTime)).toISOString();

    const [isOpen, setIsOpen] = useState(false);

    return (
      <details
        className="log-list-item"
        open={isOpen}
        onToggle={() => setIsOpen(!isOpen)}
      >
        <summary>
          <time className="item-time">{formattedTime}</time>
          <div className="item-raw">{`"${logItem.rawRow}"`}</div>
        </summary>
        {isOpen && <JsonDisplay str={logItem.rawRow} />}
      </details>
    );
  }
);

export default LogListItem;
