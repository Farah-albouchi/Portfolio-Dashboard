'use client'
import { useState } from "react";
import {  Button } from "@mui/material";
import './styles.css';

const ContactMe = ({data}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    details: '',
    isChecked: false,
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (event) => {
    setFormData({ ...formData, isChecked: event.target.checked });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, email ,isChecked } = formData;
    let valid = true;
  

    if (!name || !email || !isChecked ) {
      valid = false;
   
      setErrors(prevErrors => ({
        ...prevErrors,
        name: !name,
        email: !email,
      }));
    }
  
    if (valid ) {
      console.log('Form submitted:', formData);
    } else {
      console.log("There are errors in the form submission"); 
    }
  };
  
  return (
    <section id="contact" className="ml-10 bg-Contact bg-cover min-h-screen max-w-screen pl-5 bg-center flex flex-col justify-center items-center">
      <h2 className="text-customwhite text-sm">CONTACT ME</h2>
      <h1 className="text-white text-center text-2xl font-bold sm:w-1/2">Request Free Consultancy</h1>
      <div className="flex sm:flex-row flex-col mt-20">
        <div className="bg-white  h-56 w-full sm:w-1/2 p-4 rounded-2xl">
          <h2 className="text-sm">Hotline 24/7</h2>
          <h1 className="text-xl mb-2">(+216) {data.phone}</h1>
          <h2 className="text-sm">Address: {data.address}</h2>
          <p className="text-sm">Email: <span className="font-normal">{data.email}</span></p>
          <p className="text-sm">Work Hour: <span className="font-normal text-sm">{data.workingHours}</span></p>
        </div>
        <div className="mt-10  pr-5 sm:mt-0 sm:ml-10 w-full sm:w-2/3">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row sm:space-x-5">
              <input
                className={`rounded-lg text-sm w-full sm:w-1/2 p-2 h-12 mb-5 sm:mb-0 ${errors.name ? 'border-red-500 border-solid  border-2' : ''}`}
                type="text"
                placeholder="Name*"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
              <input
                className={`rounded-lg w-full text-sm sm:w-1/2 p-2 h-12 ${errors.email ? 'border-red-500 border-solid  border-2' : ''}`}
                type="email"
                placeholder="Email Address*"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <input
              className="rounded-lg w-full text-sm p-2 h-12 mt-5"
              type="text"
              placeholder="How can we help you?"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
            />
            <input
              className="rounded-lg w-full text-sm p-2 h-36 mt-5"
              type="text"
              placeholder="How can we help you?"
              name="details"
              value={formData.details}
              onChange={handleInputChange}
            />
            <div className="flex items-center">
            
             <input
             type="checkbox"
             id="agree"
            
             checked={formData.isChecked}
             onChange={handleCheckboxChange}
           />
              <p className="text-customwhite ml-2 font-normal text-sm">By submitting, I’m agreed to the <a href="#" className="text-customwhite">Terms & Conditions</a></p>
            </div>
            <Button
              type="submit"
              sx={{
                fontSize:20 ,
                textTransform:"none" ,
                width:150,
                height:30,
              fontWeight:700 ,
                borderRadius:20,
                backgroundColor: '#00489A',
                '&:hover': {
                  backgroundColor: '#003366',
                },
                color: '#ffffff',
              }}
              className="mt-5 text-sm "
            >
              Request Now
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactMe;
