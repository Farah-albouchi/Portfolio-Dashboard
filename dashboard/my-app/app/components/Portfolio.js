"use client";
import { useState } from 'react';
import PortfolioComponent from './PortfolioComponent';
import './styles.css';

const Portfolio = ({ data }) => {
  const [selectedSection, setSelectedSection] = useState('All');

  const getButtonClasses = (section) =>
    selectedSection === section
      ? 'bg-customblue text-white w-40 text-sm font-medium flex items-center justify-center p-2'
      : 'border border-customblue w-40 text-sm text-customblue font-medium flex items-center justify-center p-2';

  const filterProjects = () => {
    if (selectedSection === 'All') {
      return data.projects;
    }
    return data.projects.filter((project) => project.type === selectedSection);
  };

  const filteredProjects = filterProjects();

  return (
    <section id="portfolio" className="flex flex-col justify-center items-center">
      <h2 className="text-customblue">MY PORTFOLIO</h2>
      <h1 className="sm:text-2xl sm:w-2/4 text-center mt-5 text-2xl font-bold">
      {data.title}
      </h1>
      <div className="flex flex-wrap justify-center gap-2 mt-10 w-full">
        <button
          className={getButtonClasses('All')}
          onClick={() => setSelectedSection('All')}
        >
          All
        </button>
        {data.types.map((type, index) => (
          <button
            key={index}
            className={getButtonClasses(type)}
            onClick={() => setSelectedSection(type)}
          >
            {type}
          </button>
        ))}
      </div>
      <div className="mt-10 ml-4 grid sm:grid-cols-3 gap-2 sm:grid-flow-row sm:gap-4">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, index) => (
            <PortfolioComponent
              key={index}
              image={project.image}
              name={project.name}
            />
          ))
        ) : (
          <p>No projects available</p>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
