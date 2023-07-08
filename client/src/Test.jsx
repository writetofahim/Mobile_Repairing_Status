import React, { useEffect, useState } from "react";

const Test = () => {
  const [working, setWorking] = useState(false);
  const [almost, setAlmost] = useState(false);
  const [done, setDone] = useState(false);
  const inputValue = "your-customer-id"; // Example value for inputValue

  const status = "working";

  useEffect(() => {
    if (status === "working") {
      setWorking(true);
      setAlmost(false);
      setDone(false);
    } else if (status === "almost") {
      setWorking(false);
      setAlmost(true);
      setDone(false);
    } else if (status === "done") {
      setWorking(false);
      setAlmost(false);
      setDone(true);
    } else {
      setWorking(false); // Default values if status doesn't match any condition
      setAlmost(false);
      setDone(false);
    }
  }, [status]);
  const obj = {
    customerId: inputValue,
    status: working
      ? "working"
      : almost
      ? "almost"
      : done
      ? "done"
      : "In the queue",
  };

  console.log(obj.status);

  // ... Rest of your component code

  return <div>{/* JSX content */}</div>;
};

export default Test;
