import React, { useState, useEffect } from "react";

function CurrentDateTime() {
  const [currentDateTime, setCurrentDateTime] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };
      const formattedDateTime = now.toLocaleString("en-US", options);
      setCurrentDateTime(formattedDateTime);
    };

    updateDateTime(); // Initial update

    const timer = setInterval(updateDateTime, 1000); // Update every second

    return () => {
      clearInterval(timer); // Clean up the timer on component unmount
    };
  }, []);

  return <div className="my-4">{currentDateTime}</div>;
}

export default CurrentDateTime;
