import React, { useState, useEffect } from 'react';

export type ClockProps = {
  className: string
}

export default function Clock({ className }: ClockProps) {
  const [dateTime, setDateTime] = useState(new Date().toLocaleString('en-GB'));
  useEffect(() => {
    setTimeout(() => {
      setDateTime(new Date().toLocaleString('en-GB'));
    }, 1000);
  }, [dateTime]);
  return (
    <span className={className}>{dateTime}</span>
  );
}
