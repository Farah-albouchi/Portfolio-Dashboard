'use client';

import { useState } from 'react';

const PortfolioComponent = ({image,name}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative w-[300x] h-[197x] overflow-hidden rounded-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`transition-transform duration-500   ${
          isHovered ? 'scale-110 opacity-100' : 'scale-500'
        } rounded-2xl overflow-hidden`}
      >
        <img src={image} alt="Image" width={300} height={260} className="w-full h-full rounded-2xl" />
      </div>
      <div
        className={`absolute inset-0  bg-black bg-opacity-25 flex items-center justify-center text-lg transition-opacity duration-500 ${
          isHovered ? 'opacity-300' : 'opacity-0'
        }`}
      >
        <p className="transition-opacity text-2xl text-white duration-500">{name}</p>
      </div>
    </div>
  );
};

export default PortfolioComponent;
