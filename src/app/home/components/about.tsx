import React from 'react';
import Image from "next/image";
import { Button } from "@/components/ui/button";

const About: React.FC = () => {
    return (
      <div className="bg-blue-100 py-10">
        <div className="container mx-auto flex flex-col md:flex-row items-start justify-start gap-10">
          
{/* Sidebar "ABOUT US" Text */}
<div className="w-1/5 flex items-center justify-center">
  <div className="text-center">
    <h1 
      className="text-5xl font-bold text-teal-600"
      style={{ writingMode: 'vertical-lr', textOrientation: 'upright' }}>
      ABOUT US
    </h1>
  </div>
</div>





          {/* Text Section */}
          <div className="flex flex-col w-full md:w-1/2 items-start">
            <h1 className="text-3xl font-bold text-gray-900 mb-5">
              Welcome to <strong>Ventiqo</strong>
            </h1>
            <p className="text-md md:text-lg text-gray-800 mb-4 leading-relaxed">
              Welcome to <strong>Ventiqo</strong>, your all-in-one destination for unlocking the full potential of events! Whether you&apos;re an 
              <strong> event organizer</strong> looking to craft unforgettable experiences or an 
              <strong> event enthusiast</strong> seeking thrilling adventures, Ventiqo is here to make your event journey extraordinary.
            </p>
            <p className="text-md md:text-lg text-gray-800 mb-4 leading-relaxed">
              Join us on this journey of <strong>discovery</strong>, <strong>connection</strong>, and <strong>experience</strong>. Together, we&apos;ll create and enjoy events that make life more vibrant.
            </p>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Welcome to Ventiqo – <em>Where Every Event is an Adventure!</em>
            </h2>
            <div className="flex gap-5 mt-4">
              <Button className="bg-yellow-500 text-white px-6 py-2 hover:bg-yellow-500 transition" size="lg">Get Started</Button>
              <Button variant="secondary" className="border px-6 py-2" size="lg">Explore Events</Button>
            </div>
          </div>

          {/* Image Section */}
          <div className="w-full md:w-1/3 flex flex-col space-y-4">
            <Image
              src="/images/logo/vibes.png" // Replace with the actual path
              alt="Event Vibes 1"
              width={500}
              height={300}
              className="responsive"
            />
          </div>
        </div>
      </div>
    );
};

export default About;
