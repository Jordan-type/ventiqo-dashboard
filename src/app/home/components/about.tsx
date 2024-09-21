import React from 'react';

const About: React.FC = () => {
    return (
        <div className="bg-gray-100">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-10 p-10">
                <div className="flex flex-col w-full md:w-1/2 items-center md:items-start">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                        About Ventiqo
                    </h1>
                    <p className="text-lg md:text-xl text-gray-700 mt-5">
                        Discover, connect, and experience memorable moments with Ventiqo. As a leading event ticketing platform, we are committed to revolutionizing the way people find, attend, and enjoy events.
                    </p>
                    <p className="text-lg md:text-xl text-gray-700 mt-3">
                        With a diverse range of events across categories like music, sports, arts, and more, Ventiqo offers personalized recommendations and seamless ticketing to ensure every user finds the perfect event for them.
                    </p>
                    <div className="flex gap-5 mt-10">
                        <button className="btn btn-primary">Get Started</button>
                        <button className="btn btn-secondary">Learn More</button>
                    </div>
                </div>
                <div className="w-full md:w-1/2">
                    <img
                        src="/images/cards/cards-01.png"
                        alt="hero"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
}

export default About;
