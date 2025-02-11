import { Event } from "../types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface BookingModalProps {
  event?: Event;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onConfirm?: (ticketCount: number) => void;
}

export default function BookingModal({
  event,
  open = false,
  onOpenChange,
  onConfirm,
}: BookingModalProps) {
  const [ticketCount, setTicketCount] = useState(1);

  const defaultEvent: Event = {
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
  const total = displayEvent.price * ticketCount;

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm(ticketCount);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Book Tickets</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-4">
            <div>
              <Label>Event</Label>
              <div className="font-medium">{displayEvent.title}</div>
              <div className="text-sm text-muted-foreground">
                {new Date(displayEvent.date).toLocaleDateString()}
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Number of Tickets</Label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                >
                  -
                </Button>
                <Input
                  type="number"
                  value={ticketCount}
                  onChange={(e) =>
                    setTicketCount(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="w-20 text-center"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setTicketCount(ticketCount + 1)}
                >
                  +
                </Button>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Price Details</Label>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Ticket Price x {ticketCount}
                  </span>
                  <span>${displayEvent.price * ticketCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service Fee</span>
                  <span>${Math.floor(total * 0.1)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${Math.floor(total * 1.1)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Button onClick={handleConfirm}>Confirm Booking</Button>
          <Button variant="outline" onClick={() => onOpenChange?.(false)}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
