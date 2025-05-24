import React, { useState, useEffect, memo } from 'react';

const Clock: React.FC<{ className?: string }> = ({ className }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={className}>
      <div className="text-3xl font-bold">
        {time.toLocaleTimeString()}
      </div>
      <div className="text-sm text-gray-500">
        {time.toLocaleDateString()}
      </div>
    </div>
  );
};

// Memoize the component since it updates frequently
export default memo(Clock);
