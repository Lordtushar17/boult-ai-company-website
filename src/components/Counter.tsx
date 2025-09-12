import React, { useState, useEffect } from 'react';

interface CounterProps {
  target: number;
  isVisible: boolean;
  delay?: number;
}

const Counter: React.FC<CounterProps> = ({ target, isVisible, delay = 0 }) => {
  const [count, setCount] = useState(0); //counter

  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      let start = 0;
      const duration = 2000; // 2 seconds
      const increment = target / (duration / 16); // 60fps

      const counter = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(counter);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(counter);
    }, delay);

    return () => clearTimeout(timer);
  }, [isVisible, target, delay]);

  return <span>{count.toLocaleString()}</span>;
};

export default Counter;