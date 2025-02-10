export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  price: number;
  capacity: number;
  imageUrl: string;
  organizerId: string;
  category: string;
}

export interface CreateEventFormData {
  title: string;
  description: string;
  date: string;
  location: string;
  price: number;
  capacity: number;
  imageUrl: string;
  category: string;
}
