'use client';

import ServiceComponent from "./ServiceComponent";
import './styles.css';

const Services = ({ data }) => {
    console.log(data);
    return (
        <section
            id="services"
            className="flex flex-col items-center justify-center sm:items-center sm:justify-center "
        >
            <div className="flex justify-center items-center flex-col mb-8">
                <h2 className="text-customblue text-sm mb-5">SERVICES</h2>
                <h1 className=" text-2xl font-bold">{data.title} <span className="text-2xl font-bold text-customblue">{data.title2}</span></h1>
                <p className="text-sm font-normal sm:w-1/2 text-center mt-6">
                    {data.description}
                </p>
            </div>
            <div className=" mx-8 max-w-screen-sm overflow-x-auto">
                <ServiceComponent services={data.ServicesCom} />
            </div>
        </section>
    );
};

export default Services;
