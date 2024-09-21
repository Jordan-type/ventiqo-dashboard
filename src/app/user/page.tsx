"use client"; // This ensures the component is treated as a client component

import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  Calendar,
  Mail,
  Star,
  Settings,
  MapPin,
  Music,
  Camera,
  Share2,
  Heart,
} from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"; // Assuming you have dialog component
import { Layout } from "@/components/Layouts/profile-layout/layout";
import Header from "@/components/Layouts/profile-layout/Header";
import Body from "@/components/Layouts/profile-layout/Body";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EventDetailsPopup from "@/components/Forms/EventForms/EventDetailsPopup"; // Import the EventDetailsPopup component

import EventsUserViewForm from "@/components/Forms/EventForms/events-user-view-form";

// Define the type for your event
type Event = {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  price: string;
  coordinates: [number, number];
  image: string;
};

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
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // Current user's coordinates (example: Fresno, CA)
  const userCoordinates: [number, number] = [-119.4179, 36.7378];

  useEffect(() => {
    if (mapContainerRef.current) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: userCoordinates, // Centered on user's location
        zoom: 10,
      });

      // Add user's location marker (orange dot)
      new mapboxgl.Marker({
        color: "#FF6600", // Orange color for user's location
      })
        .setLngLat(userCoordinates)
        .addTo(map);

      // Add a circle around the user marker to show range
      map.on("load", () => {
        map.addSource("user-location", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: userCoordinates,
                },
                properties: {}, // Ensure properties are included, even if empty
              },
            ],
          },
        });

        map.addLayer({
          id: "user-circle",
          type: "circle",
          source: "user-location",
          paint: {
            "circle-radius": {
              stops: [
                [5, 20],
                [10, 100],
              ],
            },
            "circle-color": "#FF6600",
            "circle-opacity": 0.3,
          },
        });
      });

      // Add markers for each event using event coordinates
      events.forEach((event) => {
        const distance = calculateDistance(userCoordinates, event.coordinates);

        // Custom marker for event with icon and distance
        const el = document.createElement("div");
        el.className = "marker";
        el.innerHTML = `
            <div style="background-color: white; border-radius: 50%; padding: 5px;">
              <Music class="text-green-500" style="width: 20px; height: 20px;"/>
              <p>${distance} km</p>
            </div>
          `;

        new mapboxgl.Marker(el)
          .setLngLat(event.coordinates)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setText(
              `${event.title} - ${distance} km`,
            ),
          )
          .addTo(map);
      });

      return () => map.remove();
    }
  }, []);

  // Function to calculate distance between two points (Haversine Formula)
  const calculateDistance = (
    from: [number, number],
    to: [number, number],
  ): number => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (to[1] - from[1]) * (Math.PI / 180);
    const dLon = (to[0] - from[0]) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(from[1] * (Math.PI / 180)) *
        Math.cos(to[1] * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return Math.round(distance);
  };

  const handleCardClick = (event: Event) => {
    setSelectedEvent(event); // Set the selected event
  };

  const handleClosePopup = () => {
    setSelectedEvent(null); // Close the popup by resetting the selected event
  };

  return (
    <PageContainer scrollable={true}>
      <Layout>
        <Header>
          <h1 className="text-2xl font-bold">Find Events</h1>
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
            <TabsContent value="overview" className="space-y-4">
              {/* map content of the events */}
            </TabsContent>
            {/* <div className="grid grid-cols-3 gap-6"></div> */}
            <EventsUserViewForm />
          </Tabs>
        </Body>
      </Layout>
    </PageContainer>
  );
};

export default User;
