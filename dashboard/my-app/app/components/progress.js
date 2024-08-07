import React from 'react';
import * as Progress from '@radix-ui/react-progress';

const ProgressDemo = ({ value }) => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {

    const timer = setTimeout(() => setProgress(value), 300);
    return () => clearTimeout(timer);
  }, []);
  React.useEffect(() => {
    setProgress(value);
  }, [value]);

  return (
    <Progress.Root
      className="relative overflow-hidden bg-customgrey  w-96 rounded-full sm:h-3 h-5"
      style={{
        transform: 'translateZ(0)',
      }}
      value={progress}
    >
      <Progress.Indicator
        className="bg-customblue w-full h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
        style={{ transform: `translateX(-${100 - progress}%)` }}
      />
    </Progress.Root>
  );
};


export default ProgressDemo; 