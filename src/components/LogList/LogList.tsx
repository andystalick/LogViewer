import './LogList.css';

import { LogDataContext } from '../../utils/Contexts';
import LogListItem from '../LogListItem';
import { useContext } from 'react';

const LogList = () => {
  const logData = useContext(LogDataContext);
  console.log(
    'rerendering LogList',
    Object.keys(logData?.logItems || []).length
  );

  return (
    <div className="scroller">
      {logData.logItems.map((logItem, index) => (
        <LogListItem key={index} itemData={logItem} />
      ))}
    </div>
  );
};

export default LogList;
