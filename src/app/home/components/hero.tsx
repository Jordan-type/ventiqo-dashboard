import React from 'react';
import { Button } from "@/components/ui/button"; // Assuming you have a Button component from Shadcn
import { cn } from "@/lib/utils"; // Utility for conditional class names

const Hero: React.FC = () => {
  return (
    <section className="relative bg-white py-20">
      <div className="container mx-auto px-6 flex flex-col-reverse md:flex-row items-center justify-between">
        {/* Left Side - Text Content */}
        <div className="flex flex-col w-full md:w-1/2 space-y-5">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900">
            Discover, Connect, Experience
          </h1>
          <p className="text-lg md:text-xl text-gray-700">
            Your Ticket to Memorable Moments
          </p>
          <p className="text-lg md:text-xl text-gray-700">
            Explore diverse events, tailored recommendations, and more.
          </p>
          <div className="flex gap-4 mt-6">
            <Button variant="default" size="lg">Get Started</Button>
            <Button variant="secondary" size="lg">Learn More</Button>
          </div>
        </div>

        {/* Right Side - Image/Visual */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <img
            src="/images/cards/cards-01.png" // Replace with your hero image path
            alt="Ventiqo Events"
            className="w-full max-w-lg rounded-md shadow-lg"
          />
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-teal-500 rounded-full opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-yellow-500 rounded-full opacity-50"></div>
    </section>
  );
};

export default Hero;
