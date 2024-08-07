import { useEffect, useState, useRef } from 'react';
import React from "react";
import TestimonialsComponent from "./TestimonialsComponent";
import './styles.css';

const Testimonials = ({people}) => {


  return (
    <div   >
      <div className="flex flex-col justify-center items-center mb-28">
        <h2 className="text-customblue text-sm">TESTIMONIALS</h2>
        <h1 className="text-center mt-5 text-2xl font-bold">The Trust From Clients</h1>
      </div>
      <div className='mx-2'
      >
        <TestimonialsComponent people={people} />
      </div>
    </div>
  );
};

export default Testimonials;
