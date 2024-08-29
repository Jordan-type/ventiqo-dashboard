"use client"; // This ensures the component is treated as a client component

import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl"; // Import Mapbox GL
import PageContainer from "@/components/Layouts/page-container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

// Ensure the environment variable is properly defined
const mapboxToken = process.env.NEXT_PUBLIC_MAP_BOX_ACCESS_TOKEN; // Replace with your Mapbox token or process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

if (!mapboxToken) {
  throw new Error(
    "Mapbox access token is not defined in the environment variables."
  );
}

mapboxgl.accessToken = mapboxToken; // Assign with a fallback check

// Dummy data for events
const events = [
  {
    id: 1,
    title: "Utah Jazz - Comman Strange",
    date: "Mar 29, 2022",
    time: "10:00 PM",
    location: "California, CA",
    price: "$27.99",
    coordinates: [-118.2437, 34.0522] as [number, number], // Los Angeles, CA
    image: "/images/cards/cards-01.png", // Replace with your image path
  },
  {
    id: 2,
    title: "The California Public Party",
    date: "Apr 01, 2022",
    time: "9:00 PM",
    location: "Los Angeles, CA",
    price: "$56.99",
    coordinates: [-118.4912, 34.0195] as [number, number], // Santa Monica, CA
    image: "/images/cards/cards-01.png", // Replace with your image path
  },
  {
    id: 3,
    title: "Electronic Sound with DJ ARMY ft Miss Lexa",
    date: "29 Mar, 2022",
    time: "10:00 PM - End",
    location: "Building Park, California State University",
    price: "$25.98 - $35.00",
    coordinates: [-118.251, 34.057] as [number, number], // Example coordinates
    image: "/images/cards/cards-01.png", // Replace with your image path
  },
];

const User = () => {
  const { data: session } = useSession();

  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapContainerRef.current) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-118.2437, 34.0522], // Coordinates of Los Angeles, CA
        zoom: 10,
      });

      // Add markers for each event using event coordinates
      events.forEach((event) => {
        console.log("Adding marker for event:", event.title, event.coordinates); // Debug log

        new mapboxgl.Marker()
          .setLngLat(event.coordinates as [number, number]) // Assert type to satisfy TypeScript
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setText(event.title)
          ) // Optional: Add popup with event title
          .addTo(map);
      });

      return () => map.remove();
    }
  }, []);

  return (
    <PageContainer scrollable={true}>
      <div className="relative">
        {/* Map Component */}
        <div ref={mapContainerRef} className="absolute inset-0" />

        {/* Popular Now Section */}
        <div className="absolute bottom-20 left-20 right-20 z-20">
          <div className="flex justify-between space-x-6">
            {events.map((event) => (
              <div
                key={event.id}
                className="w-1/3 bg-white rounded-lg shadow-lg p-4"
              >
                <Image
                  src={event.image}
                  alt={event.title}
                  width={300}
                  height={200}
                  className="rounded-lg"
                />
                <h3 className="mt-4 font-bold">{event.title}</h3>
                <p className="text-sm text-gray-600">
                  {event.date} - {event.time}
                </p>
                <p className="text-orange-500 mt-2 font-semibold">
                  {event.price}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Event Details */}
        <div className="absolute top-20 right-5 z-30 w-1/3">
          <Card className="p-6">
            <CardHeader>
              <CardTitle className="text-lg font-bold">
                Electronic Sound with DJ ARMY ft Miss Lexa
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mt-2 text-sm text-muted">
                29 Mar, Tuesday | 10:00 PM - End
              </p>
              <p className="mt-4 text-sm">
                We’re celebrating our 30th edition of the California Art
                Festival in CA this Spring, so join us at the Building Park in
                California State University from March 29 - 30, 2022...
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Get a Ticket</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};

export default User;
