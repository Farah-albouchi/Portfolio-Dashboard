import React, { useState } from "react";
import Image from "next/image";

const TestimonialsComponent = ({people}) => {


  const [hoveredIndex, setHoveredIndex] = useState(null);

  const getBackground = (index) =>
    hoveredIndex === index ? "bg-customblue text-white w-72 border-customborder flex flex-col justify-center items-center border-2 p-5 rounded-xl" : "bg-white flex flex-col justify-center items-center border-customborder border-2 p-5 w-72 rounded-xl";

  const getHoveredText = (index) =>
    hoveredIndex === index ? "bg-customblue text-sm font-normal text-white mt-5" : "font-normal text-black text-sm mt-5";

  const getHoveredName = (index) =>
    hoveredIndex === index ? "bg-customblue text-lg font-semibold text-white mt-3" : "font-semibold text-lg text-sm mt-3";

  const getHoveredJob = (index) =>
    hoveredIndex === index ? "bg-customblue text-sm font-normal text-white" : "font-normal text-customgrey2 text-sm";

  const generateStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFB400" stroke="#FFB400" className="size-3">
          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="overflow-x-auto h-[800px] max-w-[690px]">
      <div className="flex flex-row space-x-4 w-max">
        {people.map((widget, index) => (
          <div
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={getBackground(index)}
          >
            <img src={widget.image} alt="Icon" width={100} height={100} />
            <div className="mt-5 flex flex-row">
              {generateStars()}
            </div>
            <p className={getHoveredText(index)}>{widget.description}</p>
            <p className={getHoveredName(index)}>{widget.name}</p>
            <p className={getHoveredJob(index)}>{widget.job}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsComponent;
