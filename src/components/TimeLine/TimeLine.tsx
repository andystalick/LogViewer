import './TimeLine.css';

import { BarDatum, ResponsiveBar } from '@nivo/bar';

import { LogDataContext } from '../../utils/Contexts';
import prepareTimelineData from '../../utils/timelineDataUtils';
import { useContext } from 'react';

const TimeLine = () => {
  const { logItems, loading } = useContext(LogDataContext);

  let data = [] as BarDatum[];
  if (!loading) {
    const logItemsKeys = Object.keys(logItems);
    data = prepareTimelineData(logItemsKeys);
  }

  return (
    <div className="timeline-wrapper">
      {!loading && data.length > 0 ? (
        <ResponsiveBar
          data={data}
          keys={['count']}
          indexBy="startTime"
          isInteractive={false}
          margin={{ top: 20, right: 20, bottom: 55, left: 60 }}
          padding={0.2}
          colors={'#2496e3'}
          axisBottom={{
            tickRotation: 90,
          }}
          axisLeft={{
            legend: 'Event Count',
            legendPosition: 'middle',
            legendOffset: -50,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          animate={true}
        />
      ) : (
        <div className="timeline-placeholder">Preparing Timeline Chart</div>
      )}
    </div>
  );
};

export default TimeLine;
