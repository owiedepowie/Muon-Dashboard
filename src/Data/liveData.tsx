import { useState, useEffect } from "react";

function Example() {
  const [Timestamp, setTimestamp] = useState(0);

  useEffect(() => {
    // run every 1000ms (1 second)
    const interval = setInterval(() => {
      setTimestamp((prev) => prev + 1); // update state
    }, 1000);

    // cleanup when component unmounts
    return () => clearInterval(interval);
  }, []);

  return console.log(Timestamp);
}

export default Example;
