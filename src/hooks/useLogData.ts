import { BINSIZE, URL } from '../utils/constants';
import { useEffect, useState } from 'react';

export interface LogData {
  logItems: {
    [key: string]: LogItem;
  };
  error: Error | null;
  loading: boolean;
}

export interface LogItem {
  rawRow: string;
}

const useLogData = (): LogData => {
  const [logItems, setLogItems] = useState({});
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const streamNDJSONFile = async () => {
      try {
        const response = await fetch(URL); // use the browser's async XHR API
        const reader = response.body?.getReader(); // get a browser ReadableStream API Reader to parse the chunks as they come in
        if (reader !== undefined) {
          const decoder = new TextDecoder('utf-8'); // get a browser TextDecoder so we know how to decode the bytes in the chunks

          let buffer = ''; // this is where we store the string decoded data c
          let bin: { [key: string]: LogItem } = {};

          while (true) {
            const { done, value } = await reader.read(); // async ask the Reader to parse some chunks in this loop
            if (done) break; // stop looping if the Reader is finished

            // do something with the Value chunk we got from the Reader
            const chunk = decoder.decode(value); // decode the bytes into a string
            buffer += chunk; // append the chunk to the buffer
            const lines = buffer.split('\n'); // split the buffer into an array oflines
            buffer = lines.pop() || ''; // keep just last line in the buffer for the next chunk

            // add the parsed lines from this iteration into our bin
            lines.forEach((line) => {
              const regex = /"_time":(\d+)/; // we delay the expensive full JSON parsing of the raw line until we do a detail render of the row
              const time = line.match(regex)?.[1] || ''; // we only need _time for our rendering so we use a cheaper regex
              bin[time] = { rawRow: line };
            });

            // if we have enough lines, perform the expensive operation of dumping into state, which causes React to render
            if (Object.keys(bin).length >= BINSIZE) {
              setLogItems((prevLogItems) => {
                return { ...prevLogItems, ...bin };
              });
              bin = {}; // empty the bin
            }
          }
          // just in case we still have some items in the bin after we're done reading chunks from the reader, get them into state
          if (Object.keys(bin).length > 0) {
            setLogItems((prevLogItems) => {
              return { ...prevLogItems, ...bin };
            });
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
