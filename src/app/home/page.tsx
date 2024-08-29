"use client";

import React from "react";

// components
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Navbar/footer";

// sections
import Hero from "./components/hero";
import SponsoredBy from "./components/sponsored-by";
import Features from "./components/features";
import EventContent from "./components/event-content";
import OurStats from "./components/our-stats";
import About from "./components/about";
import FAQ from "./components/faq";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <SponsoredBy />
      <Features />
      <EventContent />
      <OurStats />
      <About />
      <FAQ />
      <Footer />
    </>
  );
};

export default Home;


// ## Inspiration

// ## What it does

// ## How we built it

// ## Challenges we ran into

// ## Accomplishments that we're proud of

// ## What we learned

// ## What's next for GPAccess
