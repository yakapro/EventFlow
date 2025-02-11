import { Button } from "@/components/ui/button";
import { EventList } from "../components";
import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">Upcoming Events</h1>
            <p className="text-muted-foreground mt-2">
              Discover and book amazing events
            </p>
          </div>
          <div className="flex gap-2">
            <Link to="/organizer/dashboard" className="no-underline">
              <Button variant="outline">Dashboard</Button>
            </Link>
            <Link to="/create-wedding" className="no-underline">
              <Button variant="outline">Create Wedding Event</Button>
            </Link>
            <Link to="/create-event" className="no-underline">
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Event
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <Button variant="outline" className="rounded-full">
            All Events
          </Button>
          <Button variant="outline" className="rounded-full">
            Conferences
          </Button>
          <Button variant="outline" className="rounded-full">
            Workshops
          </Button>
          <Button variant="outline" className="rounded-full">
            Concerts
          </Button>
          <Button variant="outline" className="rounded-full">
            Sports
          </Button>
        </div>

        <EventList />
      </div>
    </div>
  );
}
