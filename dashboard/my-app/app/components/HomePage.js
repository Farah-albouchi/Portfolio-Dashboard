"use client";

import Image from "next/image";
import './styles.css';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const HomePart = ({ data }) => {
  const handleDownload = () => {
    const downloadUrl = data.CV;
    fetch(downloadUrl)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const a = document.createElement('a');
        a.href = url;
        a.download = 'CV.pdf';
        document.body.appendChild(a);
        a.click();
        a.remove();
      })
      .catch(err => console.error('Download failed:', err));
  };

  const defaultFirstName = "FirstName";
  const defaultLastName = "LastName";
  const defaultJob = "Job";
  const defaultDescription = "description about yourself.";
  const defaultImage = "/assets/profile.svg";

  return (
    <section
      id="homepart"
      className="home flex flex-row   items-center justify-center sm:items-start sm:justify-start p-5 sm:p-10 bg-white"
    >
      <div className="flex items-center justify-center">
        <div>
          <h2 className="sm:text-lg text-sm mb-2">Welcome to my Portfolio</h2>
          <h1 className="sm:text-5xl font-bold text-3xl my-2">Hi I'm</h1>
          <h1 className="sm:text-5xl font-bold text-3xl text-customblue my-2">
            {data.FirstName || defaultFirstName} {data.Lastname || defaultLastName}
          </h1>
          <h1 className="sm:text-5xl font-bold text-3xl my-2">
            {data.Job || defaultJob}
          </h1>
          <p className="mt-5 sm:text-lg text-sm font-normal">
            {data.description || defaultDescription}
          </p>
          <div className="flex mb-40 mt-10 lg:justify-start space-x-4">
            <button className="bg-customblue w-40 h-12 text-white py-2 mr-4 font-light sm:text-normal sm:font-medium">
              Hire Me!
            </button>
            <button onClick={handleDownload} className="border border-customblue w-56 h-12 py-2 font-light sm:text-normal sm:font-medium flex items-center space-x-2">
              <span className="text-customblue">Download CV</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#07F"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="hidden sm:block">
        <Avatar>
          <AvatarImage src={data.image || defaultImage} alt="Profile Picture" />
          <AvatarFallback>IM</AvatarFallback>
        </Avatar>
      </div>
    </section>
  );
};

export default HomePart;
