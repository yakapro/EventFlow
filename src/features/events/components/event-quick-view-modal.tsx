import { Event } from "../types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CalendarIcon, MapPinIcon, Users2Icon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface EventQuickViewModalProps {
  event?: Event;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onBookNow?: (event: Event) => void;
}

export default function EventQuickViewModal({
  event,
  open = true,
  onOpenChange,
  onBookNow,
}: EventQuickViewModalProps) {
  const defaultEvent: Event = {
    id: "1",
    title: "Tech Conference 2024",
    description:
      "Join us for an amazing tech conference featuring industry leaders and innovative discussions about the future of technology. Network with peers and learn about the latest trends in software development, AI, and cloud computing.",
    date: "2024-06-15T09:00",
    location: "San Francisco Convention Center, CA",
    price: 299,
    capacity: 500,
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
    organizerId: "1",
    category: "conference",
  };

  const displayEvent = event || defaultEvent;

  const handleBookNow = () => {
    if (onBookNow) {
      onBookNow(displayEvent);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-background">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {displayEvent.title}
          </DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">
            Event Details
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-lg">
            <img
              src={displayEvent.imageUrl}
              alt={displayEvent.title}
              className="object-cover w-full h-full"
            />
          </AspectRatio>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold">About the Event</h3>
                <p className="text-muted-foreground">
                  {displayEvent.description}
                </p>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-muted-foreground" />
                  <span>
                    {new Date(displayEvent.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <MapPinIcon className="w-5 h-5 text-muted-foreground" />
                  <span>{displayEvent.location}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Users2Icon className="w-5 h-5 text-muted-foreground" />
                  <span>{displayEvent.capacity} attendees max</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <div className="text-2xl font-bold">${displayEvent.price}</div>
                <div className="text-sm text-muted-foreground">per ticket</div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <h4 className="font-semibold">What's included:</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Full event access</li>
                    <li>• Networking opportunities</li>
                    <li>• Event materials</li>
                    <li>• Refreshments</li>
                  </ul>
                </div>

                <Button
                  className="w-full mt-4"
                  size="lg"
                  onClick={handleBookNow}
                >
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
