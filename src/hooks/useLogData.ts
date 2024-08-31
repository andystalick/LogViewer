import { useEffect, useState } from 'react';

import { URL } from '../utils/constants';

export interface LogData {
  logItems: {
    [key: string]: LogItem;
  };
  loading: boolean;
}

export interface LogItem {
  rawRow: string;
}

const useLogData = (): LogData => {
  const [logItems, setLogItems] = useState({});
  const [loading, setLoading] = useState(true);

  const streamNDJSONFile = async () => {
    const response = await fetch(URL); // use the browser's async XHR API
    const reader = response.body?.getReader(); // get a browser ReadableStream API Reader to parse the chunks as they come in
    if (reader !== undefined) {
      const decoder = new TextDecoder('utf-8'); // get a browser TextDecoder so we know how to decode the bytes in the chunks

      let buffer = ''; // this is where we store the string decoded data c
      while (true) {
        const { done, value } = await reader.read(); // async ask the Reader to parse some chunks in this loop
        if (done) break; // stop looping if the Reader is finished

        // do something with the Value chunk we got from the Reader
        const chunk = decoder.decode(value); // decode the bytes into a string
        buffer += chunk; // append the chunk to the buffer
        const lines = buffer.split('\n'); // split the buffer into an array oflines
        buffer = lines.pop() || ''; // keep just last line in the buffer for the next chunk
        const parsedlines: { [key: string]: LogItem } = {};
        // add the parsed lines from this iteration into our bin
        lines.forEach((line) => {
          const regex = /"_time":(\d+)/; // we delay the expensive full JSON parsing of the raw line until we do a detail render of the row
          const time = line.match(regex)?.[1] || ''; // we only need _time for our rendering so we use a cheaper regex
          parsedlines[time] = { rawRow: line };
        });
        setLogItems((oldLoginItems) => ({ ...oldLoginItems, ...parsedlines }));
      }
      setLoading(false);
    }
  };
  useEffect(() => {
    streamNDJSONFile();
  }, []);

  return { logItems, loading };
};

export default useLogData;
