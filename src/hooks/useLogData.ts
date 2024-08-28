import { useEffect, useRef, useState } from 'react';

import { URL } from '../utils/constants';

export interface LogData {
  logItems: {
    [key: string]: LogItem;
  };
  error: Error | null;
  loading: boolean;
}

export interface LogItem {
  parsedRow: LogItemParsed;
  rawRow: string;
}

export interface LogItemParsed {
  _time: string;
  cid: string;
  channel: string;
  level: string;
  message: string;
  [key: string]: number | string | object; // Allow other properties with specific types
}

export const parseRow = (rawRow: string) => {
  const parsedRow: LogItemParsed = JSON.parse(rawRow);
  const time: string = parsedRow._time;
  return { [time]: { parsedRow, rawRow } };
};

const useLogData = (): LogData => {
  const [logItems, setLogItems] = useState({});
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const effectHasRun = useRef(false);

  useEffect(() => {
    if (effectHasRun.current) return; // this helps us avoid running the effect twice, as would normally happen in React's Strict mode
    const streamNDJSONFile = async () => {
      try {
        const response = await fetch(URL); // use the browser's async XHR API
        const reader = response.body?.getReader(); // get a ReadableStream API "reader" to parse the chunks as they come in
        const decoder = new TextDecoder('utf-8'); // get a TextDecoder so we know how to decode the bytes in the chunks
        let buffer = '';
        if (reader !== undefined) {
          while (true) {
            const { done, value } = await reader.read(); // async ask the Reader to parse some chunks in this loop
            if (done) break; // stop looping if the Reader is finished

            buffer += decoder.decode(value, { stream: true }); // use the TextDecoder to decode some bytes into a string
            const lines = buffer.split('\n'); // one chunk might contain multiple lines, so split on newlines - this is NDJSON
            buffer = lines.pop() || ''; // Keep the last incomplete line in the buffer for later or reset to empty string

            // let counter = 0; // TODO - DEBUG CODE set a counter so we can render with a smaller number of rows
            for (const line of lines) {
              // if (counter < 100) {
              // TODO - DEBUG CODE set a counter so we can render with a smaller number of rows
              // loop through the lines we parsed from the chunk
              if (line.trim().length > 0) {
                // as long as the line isn't empty after removing trailing blankspace
                try {
                  setLogItems((prevItems) => {
                    // update our hook's state to add the new line as K:V in the state object
                    return { ...prevItems, ...parseRow(line) };
                  });
                } catch (err) {
                  throw new Error(`Failed to parse JSON line: ${line} ${err}`);
                }
              }
              // counter++; // TODO - DEBUG CODE set a counter so we can render with a smaller number of rows
              // }
            }
          }

          // Parse the last incomplete line if it exists
          if (buffer.trim().length > 0) {
            // as long as the buffer isn't empty after removing trailing blankspace
            try {
              setLogItems((prevItems) => {
                // update our hook's state to add the new line as K:V in the state object
                return { ...prevItems, ...parseRow(buffer) };
              });
            } catch (err) {
              throw new Error(`Failed to parse JSON line: ${buffer} ${err}`);
            }
          }
          setIsLoading(false); // once we're done with fetch data, set a flag to tell consumers
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error('An unknown error occurred'));
        }
        setIsLoading(false);
      }
    };

    streamNDJSONFile(); // often you see an IIFE here, this seems a little nicer
    effectHasRun.current = true; // set a flag so we don't run twice in Strict Mode
  }, []);

  return { logItems, error, loading: isLoading };
};

export default useLogData;
