import './LogList.css';

import { LogDataContext } from '../../utils/Contexts';
import LogListItem from '../LogListItem';
import { useContext } from 'react';

const LogList = () => {
  // const logData = useContext(LogDataContext);
  // console.log(
  //   'rerendering LogList',
  //   Object.keys(logData?.logItems || []).length
  // );

  return (
    <div className="scroller">
      <div>stuff</div>
      {/* {logItems.map((item, index) => (
        <LogListItem key={index} item={item} />
      ))} */}
    </div>
  );
};

export default LogList;
