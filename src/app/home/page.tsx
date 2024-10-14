"use client";

import React from "react";

// components
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Navbar/footer";

// sections
import Hero from "./components/hero";
import About from "./components/about";
import OrganizerKeyFeatures from "./components/organiser-features"
import WhyChooseUs from "./components/why-choose-us"
import EventAttendees from "./components/event-attendees"
import VentiqoCTA from "./components/ventiqo-cta"; 
import OrganisersToFollow from "./components/organisers-to-follow"
import EventContent from "./components/event-content";
import SponsoredBy from "./components/sponsored-by";
import OurStats from "./components/our-stats";
import FAQ from "./components/faq";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <OrganizerKeyFeatures />
      <WhyChooseUs />
      <EventAttendees />
      <VentiqoCTA />
      <OrganisersToFollow />
            {/* <SponsoredBy /> */}
      {/* <OurStats />

      <FAQ /> */}
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
