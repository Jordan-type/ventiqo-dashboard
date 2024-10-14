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
import EventDetailsPopup from "@/components/Forms/EventForms/event-details-popup"; // Import the EventDetailsPopup component

import EventsUserViewForm from "@/components/Forms/EventForms/events-user-view-form";
import ExploreEventsMap from "@/components/Map/ExploreEventsMap";

const User = () => {
  const { data: session } = useSession();









  return (
    <PageContainer scrollable={true}>
              <ExploreEventsMap/>
    </PageContainer>
  );
};

export default User;
