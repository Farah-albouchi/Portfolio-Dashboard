"use client";

import Image from 'next/image';
import { useState } from 'react';
import ProgressDemo from './progress';
import './styles.css';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AboutMe = ({ data }) => {
    const [selectedSection, setSelectedSection] = useState('skills');

    const getButtonClasses = (section) =>
        selectedSection === section
          ? 'bg-customblue rounded-full px-9 py-1.5 text-base text-white w-42 sm:h-12 font-medium flex items-center justify-center space-x-4'
          : 'border border-customblue rounded-full text-base px-9 py-1.5 w-42 sm:h-12 text-blue-600 font-medium flex items-center justify-center space-x-4';
const defaultTitle = "First Title"
const defaultTitle2 = "Second Title"
const defaultDescription = "Description"
const defaultImage = "/assets/profile.svg";




    return (
        <section id='about' className='flex sm:flex-row flex-col items-center justify-center sm:items-start sm:justify-start p-5 sm:p-10'>
            <div className=" ">
            <Avatar>
          <AvatarImage src={data.image || defaultImage} alt="Profile Picture" />
          <AvatarFallback>Image</AvatarFallback>
        </Avatar>
            </div>
            <div className="flex-1 sm:ml-10 ml-0">
                <h1 className="text-customblue text-lg sm:text-sm font-bold mb-2">ABOUT ME</h1>
                <h1 className="text-2xl font-bold text-customblue mb-2">{data.title || defaultTitle}</h1>
                <h1 className="text-2xl font-bold mb-2">{data.title2 || defaultTitle2}</h1>
                <p className='text-base font-normal mb-10'>
                   {data.description || defaultDescription}
                </p>
                <div className="flex space-x-1 mb-10">
                    <button className={getButtonClasses('skills')} onClick={() => setSelectedSection('skills')}>
                        Main Skills
                    </button>
                    <button className={getButtonClasses('awards')} onClick={() => setSelectedSection('awards')}>
                        Awards
                    </button>
                    <button className={getButtonClasses('education')} onClick={() => setSelectedSection('education')}>
                        Education
                    </button>
                </div>
                <div>
                    {selectedSection === 'skills' && (
                        <div>
                        {data.skills.map((skill, index) => (
                         <div>
                            <h1 className='mt-8 mb-4 text-lg'>{skill.name}</h1>
                            <ProgressDemo value={skill.progress} />
                            
                            </div>
                    ))
                    }
                    </div>
                    )}
                    {selectedSection === 'awards' && (
                        <div>
                        { data.awards.map((award,index) => (
                        <div>
                            <h1 className='mt-8 mb-2 text-xl'>{award}</h1>
                            
                        </div>
                   ) )} </div> ) }
                    {selectedSection === 'education' && (
                        <div>
                        { data.education.map((e,index) => (
                        <div>
                            <h1 className='mt-8 mb-2 text-xl'>{e}</h1>
                            
                        </div>
                   ) )} </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default AboutMe;
