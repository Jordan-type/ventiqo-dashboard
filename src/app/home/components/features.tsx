import React from "react";

const Features: React.FC = () => {
  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Text Section */}
        <div className="flex flex-col w-full md:w-1/2 items-center md:items-start text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Features
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-6">
            A modern solution for your business needs. Streamline your workflow,
            enhance collaboration, and improve efficiency with our innovative platform.
          </p>
          <div className="flex gap-4 mt-4">
            <button className="btn btn-primary px-6 py-3 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition duration-300">
              Get Started
            </button>
            <button className="btn btn-secondary px-6 py-3 rounded-md text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white transition duration-300">
              Learn More
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="/images/cards/cards-01.png"
            alt="hero"
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Feature Icons Section */}
      <div className="container mx-auto px-6 md:px-12 mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <img
            src="/images/icons/icon-01.svg"
            alt="Feature 1"
            className="w-16 h-16 mx-auto mb-4"
          />
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Feature One</h3>
          <p className="text-gray-600">
            Description of Feature One. It provides excellent value and performance.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <img
            src="/images/icons/icon-02.svg"
            alt="Feature 2"
            className="w-16 h-16 mx-auto mb-4"
          />
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Feature Two</h3>
          <p className="text-gray-600">
            Description of Feature Two. Enhance productivity and efficiency.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <img
            src="/images/icons/icon-03.svg"
            alt="Feature 3"
            className="w-16 h-16 mx-auto mb-4"
          />
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Feature Three</h3>
          <p className="text-gray-600">
            Description of Feature Three. Improve collaboration and communication.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
