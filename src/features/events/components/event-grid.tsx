import { Event } from "../types";
import { EventCard } from "./event-card";

interface EventGridProps {
  events?: Event[];
  loading?: boolean;
}

export default function EventGrid({ events, loading = false }: EventGridProps) {
  const defaultEvents: Event[] = [
    {
      id: "1",
      title: "Tech Conference 2024",
      description: "Join us for an amazing tech conference",
      date: "2024-06-15T09:00",
      location: "San Francisco, CA",
      price: 299,
      capacity: 500,
      imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
      organizerId: "1",
      category: "conference",
    },
    {
      id: "2",
      title: "Music Festival 2024",
      description: "A weekend of amazing music and performances",
      date: "2024-07-20T10:00",
      location: "Los Angeles, CA",
      price: 199,
      capacity: 1000,
      imageUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea",
      organizerId: "2",
      category: "concert",
    },
    {
      id: "3",
      title: "Design Workshop",
      description: "Learn the latest design trends and techniques",
      date: "2024-08-10T13:00",
      location: "New York, NY",
      price: 149,
      capacity: 50,
      imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978",
      organizerId: "3",
      category: "workshop",
    },
  ];

  const displayEvents = events || defaultEvents;

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-background p-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="h-[400px] bg-muted animate-pulse rounded-lg"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-background p-4">
      {displayEvents.map((event) => (
        <div key={event.id} className="flex justify-center">
          <EventCard event={event} />
        </div>
      ))}
    </div>
  );
}
