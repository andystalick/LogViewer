import { useEffect, useState } from 'react';

import { URL } from '../utils/constants';

export interface LogData {
  logItems: Array<string>;
  error: Error | null;
  loading: boolean;
}

export interface LogItem {
  rawRow: string;
}

const useLogData = (): LogData => {
  const [logItems, setLogItems] = useState<Array<string>>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const streamNDJSONFile = async () => {
      try {
        const response = await fetch(URL); // use the browser's async XHR API
        const reader = response.body?.getReader(); // get a ReadableStream API "reader" to parse the chunks as they come in
        if (reader !== undefined) {
          const decoder = new TextDecoder('utf-8'); // get a TextDecoder so we know how to decode the bytes in the chunks
          let buffer = '';
          let bin: Array<string> = [];

          while (true) {
            const { done, value } = await reader.read(); // async ask the Reader to parse some chunks in this loop
            if (done) break; // stop looping if the Reader is finished

            // do something with the Value chunk we got from the Reader
            const chunk = decoder.decode(value); // decode the bytes into a string
            buffer += chunk; // append the chunk to the buffer
            const lines = buffer.split('\n'); // split the buffer into lines
            buffer = lines.pop() || ''; // keep just last line in the buffer for the next chunk
            bin = bin.concat(lines); // add the parsed lines from this iteration into our bin
            if (bin.length >= 5000) {
              // if we have enough lines, perform the expensive operation of dumping into state
              setLogItems((prevLogItems) => [...prevLogItems, ...bin]);
              bin = [];
            }
          }
          if (bin.length > 0) {
            // just in case we still have some items in the bin after we're done, get them into state
            setLogItems((prevLogItems) => [...prevLogItems, ...bin]);
          }
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    streamNDJSONFile(); // often you see an IIFE here, this seems a little nicer
  }, []);

  return { logItems, error, loading };
};

export default useLogData;
