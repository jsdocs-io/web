import { useEffect, useState } from "react";
import { timeAgo } from "short-time-ago";

const TimeAgo = ({ date: rawDate }: { date: string }) => {
  const date = new Date(rawDate);
  const [description, setDescription] = useState(timeAgo(date));

  useEffect(() => {
    const interval = setInterval(() => {
      setDescription(timeAgo(date));
    }, 60000);

    return () => clearInterval(interval);
  });

  return (
    <time title={date.toUTCString()} dateTime={date.toISOString()}>
      {description}
    </time>
  );
};

export default TimeAgo;
