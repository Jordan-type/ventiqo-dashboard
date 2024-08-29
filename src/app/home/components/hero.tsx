import React from 'react';

const Hero: React.FC = () => { 
    return (
        <div className="bg-gray-50">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-10 p-10">
            <div className="flex flex-col w-full md:w-1/2 items-center md:items-start">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Welcome to Ventiqo
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mt-5">
            Discover.Connect.Experience
            </p>
            <p className="text-lg md:text-xl text-gray-700 mt-5">
            Your Ticket to Memorable Moments
                </p>
            <div className="flex gap-5 mt-10">
                <button className="btn btn-primary">Get Started</button>
                <button className="btn btn-secondary">Learn More</button>
            </div>
            </div>
        </div>
        </div>
    );
}

export default Hero;

