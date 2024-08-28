import './LogListItem.css';

import JsonDisplay from '../JsonDisplay/JsonDisplay';
import { useState } from 'react';

const LogListItem = ({ itemData }) => {
  const formatttedTime = new Date(itemData.parsedRow._time).toISOString();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <details
      className="log-list-item"
      open={isOpen}
      onToggle={() => setIsOpen(!isOpen)}
    >
      <summary>
        <div className="item-time">{formatttedTime}</div>
        <div className="item-raw">{`"${itemData.rawRow}"`}</div>
      </summary>
      {isOpen && <JsonDisplay obj={itemData.parsedRow} />}
    </details>
  );
};

export default LogListItem;
