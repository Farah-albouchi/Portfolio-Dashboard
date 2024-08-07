import { useEffect, useState, useRef } from 'react';

const useElementWidth = () => {
  const [width, setWidth] = useState(0);
  const elementRef = useRef(null);

  useEffect(() => {
    const updateWidth = () => {
      if (elementRef.current) {
        setWidth(elementRef.current.offsetWidth);
      }
    };

    window.addEventListener('resize', updateWidth);
    updateWidth(); // Initial width calculation

    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  return [width, elementRef];
};

export default useElementWidth;