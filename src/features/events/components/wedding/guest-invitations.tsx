import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Guest {
  id: string;
  name: string;
  phone: string;
  status: "pending" | "confirmed" | "declined";
}

export function GuestInvitations() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [message, setMessage] = useState(
    "You are cordially invited to our wedding celebration! Please RSVP to confirm your attendance.",
  );

  const addGuest = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;

    if (name && phone) {
      const newGuest: Guest = {
        id: Date.now().toString(),
        name,
        phone,
        status: "pending",
      };
      setGuests([...guests, newGuest]);
      event.currentTarget.reset();
    }
  };

  const sendInvitation = (guest: Guest) => {
    // Format the WhatsApp message
    const whatsappMessage = encodeURIComponent(
      `${message}\n\nRSVP Link: [Your RSVP Link Here]`,
    );
    const whatsappUrl = `https://wa.me/${guest.phone}?text=${whatsappMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const sendAllInvitations = () => {
    guests.forEach((guest) => {
      if (guest.status === "pending") {
        sendInvitation(guest);
      }
    });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={addGuest} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Guest Name</Label>
            <Input id="name" name="name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number (with country code)</Label>
            <Input id="phone" name="phone" placeholder="+1234567890" required />
          </div>
        </div>
        <Button type="submit">Add Guest</Button>
      </form>

      <div className="space-y-2">
        <Label>Invitation Message</Label>
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
        />
      </div>

      {guests.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Guest List</h3>
            <Button onClick={sendAllInvitations}>
              Send All Pending Invitations
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {guests.map((guest) => (
                <TableRow key={guest.id}>
                  <TableCell>{guest.name}</TableCell>
                  <TableCell>{guest.phone}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        guest.status === "confirmed"
                          ? "default"
                          : guest.status === "declined"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {guest.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => sendInvitation(guest)}
                    >
                      Send Invitation
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
