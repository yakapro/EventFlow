import { Event } from "./event";

export interface WeddingDetails {
  brideName: string;
  groomName: string;
  weddingDate: string;
  venue: string;
  guestCount: number;
  additionalServices: {
    catering: boolean;
    photography: boolean;
    decoration: boolean;
    music: boolean;
  };
  specialRequirements?: string;
}

export interface WeddingEvent extends Event {
  type: "wedding";
  weddingDetails: WeddingDetails;
}
