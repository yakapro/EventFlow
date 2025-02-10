import { Event } from "../types";
import { Button } from "@/components/ui/button";
import { CalendarIcon, MapPinIcon, Users } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

interface EventDetailsProps {
  event?: Event;
}

export function EventDetails({ event }: EventDetailsProps) {
  const [ticketCount, setTicketCount] = useState(1);

  const defaultEvent = {
    id: "1",
    title: "Tech Conference 2024",
    description:
      "Join us for an amazing tech conference featuring industry leaders, innovative workshops, and networking opportunities. Learn about the latest technologies and trends shaping the future of tech.",
    date: "2024-06-15T09:00",
    location: "San Francisco Convention Center, CA",
    price: 299,
    capacity: 500,
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
    organizerId: "1",
    category: "conference",
  };

  const displayEvent = event || defaultEvent;

  return (
    <div className="max-w-4xl mx-auto bg-card p-6 rounded-lg shadow-lg">
      <div className="aspect-video relative overflow-hidden rounded-lg mb-8">
        <img
          src={displayEvent.imageUrl}
          alt={displayEvent.title}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">{displayEvent.title}</h1>
          <p className="text-muted-foreground">{displayEvent.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              <div>
                <div className="font-semibold">Date & Time</div>
                <div>{new Date(displayEvent.date).toLocaleString()}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <MapPinIcon className="w-5 h-5" />
              <div>
                <div className="font-semibold">Location</div>
                <div>{displayEvent.location}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <div>
                <div className="font-semibold">Capacity</div>
                <div>{displayEvent.capacity} attendees</div>
              </div>
            </div>
          </div>

          <div className="bg-muted p-6 rounded-lg space-y-4">
            <div className="text-2xl font-bold">${displayEvent.price}</div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full">Book Tickets</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Book Tickets</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">Tickets</div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          setTicketCount(Math.max(1, ticketCount - 1))
                        }
                      >
                        -
                      </Button>
                      <div className="w-12 text-center">{ticketCount}</div>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setTicketCount(ticketCount + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between font-semibold">
                    <div>Total</div>
                    <div>${displayEvent.price * ticketCount}</div>
                  </div>
                  <Button className="w-full">Proceed to Payment</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}
