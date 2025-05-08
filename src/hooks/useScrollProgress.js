'use client';

import { useEffect, useState } from 'react';

export default function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = 
        document.documentElement.scrollHeight - 
        document.documentElement.clientHeight;
      const progress = (scrollTop / scrollHeight) * 100;
      
      setProgress(progress);
    };

    // Add event listener
    window.addEventListener('scroll', handleScroll);
    
    // Clean up
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
}