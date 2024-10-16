import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/cta-button";

const About: React.FC = () => {
  return (
    <div className="bg-blue-100 py-10">
      <div className="container mx-auto flex flex-col items-start justify-start gap-10 md:flex-row">
        {/* Sidebar "ABOUT US" Text */}
        <div className="flex w-1/5 items-center justify-center">
          <div className="text-center">
            <h1
              className="text-5xl font-bold text-teal-600"
              style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
            >
              ABOUT US
            </h1>
          </div>
        </div>

        {/* Text Section */}
        <div className="flex w-full flex-col items-start md:w-1/2">
          <h1 className="mb-5 text-3xl font-bold text-gray-900">
            Welcome to <strong>Ventiqo</strong>
          </h1>
          <p className="text-md mb-4 leading-relaxed text-gray-800 md:text-lg">
            Welcome to <strong>Ventiqo</strong>, your all-in-one destination for
            unlocking the full potential of events! Whether you&apos;re an
            <strong> event organizer</strong> looking to craft unforgettable
            experiences or an
            <strong> event enthusiast</strong> seeking thrilling adventures,
            Ventiqo is here to make your event journey extraordinary.
          </p>
          <p className="text-md mb-4 leading-relaxed text-gray-800 md:text-lg">
            Join us on this journey of <strong>discovery</strong>,{" "}
            <strong>connection</strong>, and <strong>experience</strong>.
            Together, we&apos;ll create and enjoy events that make life more
            vibrant.
          </p>
          <h2 className="mb-4 text-lg font-semibold text-gray-800">
            Welcome to Ventiqo – <em>Where Every Event is an Adventure!</em>
          </h2>
          <div className="mt-4 flex gap-5">
            <Button
              className="bg-yellow-500 px-6 py-2 text-white transition hover:bg-yellow-500"
              size="lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}>
              Get Started
            </Button>
            <Button variant="secondary" className="border px-6 py-2" size="lg">
              Explore Events
            </Button>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex w-full flex-col space-y-4 md:w-1/3">
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
