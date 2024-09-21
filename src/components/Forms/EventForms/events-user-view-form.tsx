import React, { useState, useEffect } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EventDetailsPopup from "@/components/Forms/EventForms/EventDetailsPopup";
import OrderFormPopup from "../OrderForms/OrderFormPopup"; // Import the popup component
import PaymentMethodForm from "../PaymentsForms/payment-methods-form";
import { getAllEvents } from "@/config/eventsAPI";

type Ticket = {
  name: string;
  description: string;
  price: number;
  quantity: number;
  status: string;
};

type Event = {
  id: string;
  title: string;
  date: string;
  location: string;
  price: string;
  startTime: string; // Add this
  endTime: string;   // Add this
  aboutEvent: string; // Add this
  venueName: string; // Add this
  tickets: Ticket[]; // Add this
  coordinates: [number, number];
  image: string;
};

export default function EventsUserViewForm() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showOrderForm, setShowOrderForm] = useState<boolean>(false);
  const [selectedTicketType, setSelectedTicketType] = useState<string | null>(null); // Use string instead of Event
  const [selectedEventForOrder, setSelectedEventForOrder] = useState<Event | null>(null);


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getAllEvents();
        if (response && response.events && response.events.data) {
          const mappedEvents = response.events.data.map((event: any) => {
            const longitude = event.coordinates?.longitude ?? 0;
            const latitude = event.coordinates?.latitude ?? 0;
  
            return {
              id: event._id,
              title: event.title,
              date: new Date(event.date).toLocaleDateString(), // Convert to a readable date format
              startTime: event.startTime, // Ensure this is mapped
              endTime: event.endTime,     // Ensure this is mapped
              aboutEvent: event.aboutEvent, // Ensure this is mapped
              venueName: event.venueName,   // Ensure this is mapped
              location: `${event.venueName}, ${event.subCounty}, ${event.county}, ${event.country}`, // Construct location string
              price: event.tickets && event.tickets.length > 0
                ? `$${event.tickets[0].price}`
                : "N/A",
              tickets: event.tickets, // Ensure this is mapped
              coordinates: [longitude, latitude] as [number, number],
              image: event.image || '/images/default-event-image.png',
            };
          });
          setEvents(mappedEvents);
        }
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchEvents();
  }, []);
  

  
  const handleCardClick = (event: Event) => {
    setSelectedEvent(event); // Show event details in the popup
  };

  const handleClosePopup = () => {
    setSelectedEvent(null); // Close the popup
  };

  const handleGetTicketClick = (event: Event, ticketType: string) => { // Accepts ticketType as a string
    setSelectedEventForOrder(event);
    setSelectedTicketType(ticketType);
    setShowOrderForm(true);
  };

  const handleCloseOrderForm = () => {
    setShowOrderForm(false);
  };

  if (loading) {
    return <div>Loading events...</div>;
  }

  return (
    <div className="mt-6">
      <h2 className="mb-4 text-xl font-semibold">Popular Now</h2>
      <div className="grid grid-cols-3 gap-6">
        {events.map((event) => (
          <Card key={event.id} onClick={() => handleCardClick(event)}>
            {/* Image at the top */}
            <div className="relative">
              <Image
                className="h-32 w-full rounded-tl-lg rounded-tr-lg object-cover"
                src={event.image}
                alt={event.title}
                width={50}
                height={50}
                layout="responsive"
              />
            </div>
            {/* Event details */}
            <CardContent className="px-4 py-2">
              <div className="flex items-center justify-between text-xs">
                <p>{event.date}</p>
                <p>{event.startTime} - {event.endTime}</p>
              </div>
              <CardTitle className="mt-1 text-base font-semibold text-gray-900">
                {event.title}
              </CardTitle>
              <div className="mt-1 flex items-center text-sm">
                <MapPin className="mr-1 h-4 w-4" />
                <p>{event.location}</p>
              </div>
            </CardContent>
            {/* Price section */}
            <CardFooter className="flex items-center justify-between border-t px-4 py-2">
              <div className="text-sm font-semibold text-orange-500">
                {event.price}
              </div>
              <Button size="sm" className="rounded-md bg-orange-500 text-white"  onClick={(e) => {e.stopPropagation();  handleGetTicketClick(event, event.tickets[0].name); }}>
                Get a Ticket
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {/* Event details popup */}
      {selectedEvent && (
        <EventDetailsPopup event={selectedEvent as Event} onClose={handleClosePopup} onGetTicket={(ticketType) => handleGetTicketClick(selectedEvent, ticketType)} />
      )}
            {/* Order Form Popup */}
            {showOrderForm && selectedEventForOrder && (
        <OrderFormPopup
          eventId={selectedEventForOrder.id}
          tickets={selectedEventForOrder.tickets}
          onClose={handleCloseOrderForm}
        />
      )}

    </div>
  );
}
