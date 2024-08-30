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
import { Layout } from "@/components/Layouts/profile-layout/layout";
import Header from "@/components/Layouts/profile-layout/Header";
import Body from "@/components/Layouts/profile-layout/Body";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Ensure the environment variable is properly defined
const mapboxToken = process.env.NEXT_PUBLIC_MAP_BOX_ACCESS_TOKEN; // Replace with your Mapbox token or process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

if (!mapboxToken) {
  throw new Error(
    "Mapbox access token is not defined in the environment variables.",
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
          .setPopup(new mapboxgl.Popup({ offset: 25 }).setText(event.title)) // Optional: Add popup with event title
          .addTo(map);
      });

      return () => map.remove();
    }
  }, []);

  return (
    <PageContainer scrollable={true}>
      <Layout>
        <Header>
          <h6>Find Events</h6>
          <div className="ml-auto flex items-center space-x-4"></div>
        </Header>
        <Body>
          <Tabs
            orientation="vertical"
            defaultValue="overview"
            className="space-y-4"
          >
            <div className="w-full overflow-x-auto pb-2">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value='overview' className='space-y-4'>
              {/* map content of the events */}
            </TabsContent>
          </Tabs>
        </Body>
      </Layout>
    </PageContainer>
  );
};

export default User;
