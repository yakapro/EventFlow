import { Event } from "../types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, MapPinIcon, Share2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface EventCardProps {
  event?: Event;
}

function shareEvent(
  event: Event,
  platform: "twitter" | "facebook" | "linkedin" | "copy",
) {
  const eventUrl = `${window.location.origin}/event/${event.id}`;
  const text = `Check out ${event.title} - ${event.description}`;

  switch (platform) {
    case "twitter":
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(eventUrl)}`,
      );
      break;
    case "facebook":
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(eventUrl)}`,
      );
      break;
    case "linkedin":
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(eventUrl)}`,
      );
      break;
    case "copy":
      navigator.clipboard.writeText(eventUrl);
      break;
  }
}

export function EventCard({ event }: EventCardProps) {
  const defaultEvent = {
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
  };

  const displayEvent = event || defaultEvent;

  return (
    <Card className="w-full max-w-sm overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video relative overflow-hidden">
        <img
          src={displayEvent.imageUrl}
          alt={displayEvent.title}
          className="object-cover w-full h-full"
        />
      </div>
      <CardHeader>
        <div className="text-xl font-semibold">{displayEvent.title}</div>
        <div className="text-sm text-muted-foreground line-clamp-2">
          {displayEvent.description}
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <CalendarIcon className="w-4 h-4" />
          {new Date(displayEvent.date).toLocaleDateString()}
        </div>
        <div className="flex items-center gap-2 text-sm">
          <MapPinIcon className="w-4 h-4" />
          {displayEvent.location}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="font-semibold">${displayEvent.price}</div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Share2Icon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => shareEvent(displayEvent, "twitter")}
              >
                Share on Twitter
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => shareEvent(displayEvent, "facebook")}
              >
                Share on Facebook
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => shareEvent(displayEvent, "linkedin")}
              >
                Share on LinkedIn
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => shareEvent(displayEvent, "copy")}
              >
                Copy Link
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Link to={`/event/${displayEvent.id}`}>
          <Button>View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
