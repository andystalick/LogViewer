// import './LogListItem.css';

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

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`log-list-item ${isOpen && 'open'}`}
      data-testid="log-list-item"
    >
      <div className="item-summary" onClick={handleClick} role="button">
        <span>{formattedTime}</span>
        <span className="item-raw">{rawRow}</span>
      </div>
      {isOpen && <JsonDisplay str={rawRow} />}
    </div>
  );
});

export default LogListItem;
