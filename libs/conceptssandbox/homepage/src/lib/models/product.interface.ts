export interface Product{
    id: number;
    name: string;
    price: number;
    quantity: number;
    origin?: string; // herkunft?
}


export interface CalendarEvent {
  date: string;
  time: string;
  note: string;
  day: string;
}




// API Interface!
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}


