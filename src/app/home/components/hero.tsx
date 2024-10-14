import React from "react";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component from Shadcn
import { cn } from "@/lib/utils"; // Utility for conditional class names

const Hero: React.FC = () => {
  return (
    <section>
      <div className="container">
        {/* Left Side - Text Content */}
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-center py-32 text-center lg:mx-auto lg:items-start lg:px-0 lg:text-left">
          <h1 className="my-6 text-pretty text-4xl font-bold lg:text-6xl">
              Ventiqo: Your Ultimate Event Hub
            </h1>
            <h6 className="my-6 text-pretty text-4xl lg:text-6xl">
              Discover, Connect, Experience
            </h6>
            <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">
            Discover, Plan, and Elevate Events with Ventiqo. From tailored recommendations for attendees to streamlined event management for organizers, we enhance every experience.
            </p>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              <Button variant="default" size="lg">
                Get Started
              </Button>
              <Button variant="secondary" size="lg">
                Explore Events
              </Button>
            </div>
          </div>

          {/* Right Side - Image/Visual */}
          <div className="relative aspect-[3/4]">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                viewBox="0 0 800 800"
                className="size-full text-muted-foreground opacity-20"
              >
                {Array.from(Array(720).keys()).map((dot, index, array) => {
                  const angle = 0.2 * index;
                  const scalar = 40 + index * (360 / array.length);
                  const x = Math.round(Math.cos(angle) * scalar);
                  const y = Math.round(Math.sin(angle) * scalar);

                  return (
                    <circle
                      key={index}
                      r={(3 * index) / array.length}
                      cx={400 + x}
                      cy={400 + y}
                      opacity={1 - Math.sin(angle)}
                    />
                  );
                })}
              </svg>
            </div>
            <div className="absolute left-[8%] top-[10%] flex aspect-[5/6] w-[38%] justify-center rounded-lg border border-border bg-accent"></div>
            <div className="absolute right-[12%] top-[20%] flex aspect-square w-1/5 justify-center rounded-lg border border-border bg-teal-500"></div>
            <div className="absolute bottom-[24%] right-[24%] flex aspect-[5/6] w-[38%] justify-center rounded-lg border border-border bg-yellow-500"></div>
          </div>
          {/* Decorative Elements */}
          <div className="absolute left-0 top-0 h-32 w-32 rounded-full bg-teal-500 opacity-50"></div>
          <div className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-yellow-500 opacity-50"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
