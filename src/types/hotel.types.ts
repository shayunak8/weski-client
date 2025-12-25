export interface Hotel {
  id: string;
  name: string;
  price: number;
  images: string[];
  amenities: string[];
  stars: number;
  rating: number;
  location: string;
  group_size: number;
}

export interface Resort {
  id: number;
  name: string;
}

export interface SearchParams {
  ski_site: number;
  from_date: string;
  to_date: string;
  group_size: number;
}

export interface SearchResponse {
  hotels: Hotel[];
  total: number;
}

export type SSEEventType = "hotel" | "complete" | "error";

export interface SSEMessage {
  type: SSEEventType;
  data?: Hotel | Hotel[];
  message?: string;
}
