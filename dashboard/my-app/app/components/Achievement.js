import AchievementComponent from "./AchievementComponent";
import React from "react";
import './styles.css';

const Achievement = ({ data }) => {
  return (
    <div className="bg-Achievement bg-cover pt-5 bg-center flex flex-col items-center justify-center sm:items-center sm:justify-center p-5 sm:p-10">
      <h2 className="text-customwhite">HOW I WORK</h2>
      <h1 className="text-white text-center text-2xl font-bold sm:w-1/2">
        {data.title}
      </h1>
      <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4  mt-24 pb-32 w-full">
        {data.Achievements && data.Achievements.length > 0 ? (
          data.Achievements.map((widget, index) => (
            <div key={index} className="achievement-item">
              <AchievementComponent title={widget.value} description={widget.description} />
            </div>
          ))
        ) : (
          <p className="text-white">No Achievement available</p>
        )}
      </div>
    </div>
  );
}

export default Achievement;
