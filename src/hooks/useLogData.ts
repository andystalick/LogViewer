import { useEffect, useState } from 'react';

import { URL } from '../utils/constants';

export const parseRow = (rawRow) => {
  const parsedRow = JSON.parse(rawRow);
  const time = parsedRow._time;
  return { [time]: { parsedRow, rawRow } };
};

const useLogData = () => {
  const [logItems, setLogItems] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const streamNDJSONFile = async () => {
      try {
        const response = await fetch(URL);
        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');

          buffer = lines.pop() || ''; // Keep the last incomplete line in the buffer or set to empty string

          for (const line of lines) {
            if (line.trim()) {
              try {
                setLogItems((prevItems) => {
                  return Object.assign({}, prevItems, parseRow(line));
                  //   return { ...prevItems, ...parseRow(line) };
                });
              } catch (e) {
                console.error('Failed to parse JSON line:', line, e);
              }
            }
          }
        }

        // Parse the last incomplete line if it exists
        if (buffer.trim().length > 0) {
          try {
            setLogItems((prevItems) => {
              //   return { ...prevItems, ...parseRow(buffer) };
              return Object.assign({}, prevItems, parseRow(buffer));
            });
          } catch (e) {
            console.error('Failed to parse JSON line:', buffer, e);
          }
        }

        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    streamNDJSONFile(); // often you see an IIFE here, this seems a little nicer
  }, []);

  return { logItems, error, loading: isLoading };
};

export default useLogData;
