import './LogListItem.css';

import { memo, useState } from 'react';

import JsonDisplay from '../JsonDisplay/JsonDisplay';

interface LogListItemProps {
  rawRow: string;
  rawTime: string;
  open?: boolean;
}

const LogListItem = memo<LogListItemProps>((props) => {
  const { rawRow, rawTime, open } = props;
  const formattedTime = new Date(Number(rawTime)).toISOString();

  const [isOpen, setIsOpen] = useState(open == undefined ? false : open);

  return (
    <details
      className="log-list-item"
      open={isOpen}
      onToggle={() => setIsOpen(!isOpen)}
      data-testid="log-list-item"
    >
      <summary role="button">
        <time className="item-time">{formattedTime}</time>
        <div className="item-raw">{`"${rawRow}"`}</div>
      </summary>
      {isOpen && <JsonDisplay str={rawRow} />}
    </details>
  );
});

export default LogListItem;
