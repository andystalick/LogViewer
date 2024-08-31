import { bin } from 'd3-array';
import { timeDay } from 'd3-time';

// Function to prepare data for the graph with fixed size time intervals
const prepareTimelineData = (rawTimestamps: Array<string>) => {
  // Convert raw timestamps to numbers (epoch milliseconds)
  const timestamps: number[] = rawTimestamps.map((timestamp) =>
    Number(timestamp)
  );

  // Create thresholds as epoch timestamps for 1-day intervals - reflecting the data we start at the most recent
  const start = Math.min(...timestamps);
  const end = Math.max(...timestamps);

  const thresholds: number[] = timeDay
    .range(
      new Date(start), // Start date
      new Date(end), // End date
      1
    )
    .map((date) => date.getTime()); // Convert Date objects to epoch timestamps

  // Apply binning with the generated thresholds
  const bins = bin().thresholds(thresholds)(timestamps);

  // Format bins and counts for output
  const formattedBins = bins.map((binItem) => ({
    startTime: formatDateToMonthDay(binItem.x0),
    count: binItem.length,
  }));

  return formattedBins;
};

const formatDateToMonthDay = (timestamp?: number): string => {
  if (timestamp !== undefined) {
    const date = new Date(timestamp);
    const formatter = new Intl.DateTimeFormat('en-US', {
      month: '2-digit',
      day: '2-digit',
    });
    return formatter.format(date).replace('/', '-'); // Replace '/' with '-' to get MM-DD format
  } else return '';
};

export default prepareTimelineData;
