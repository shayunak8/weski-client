import axios from "axios";
import { Resort, SearchParams, Hotel, SSEMessage } from "../types/hotel.types";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const handleError = (error: unknown): Error => {
  if (axios.isAxiosError(error)) {
    return new Error(
      error.response?.data?.message || error.message || "API request failed"
    );
  }
  return error instanceof Error ? error : new Error("Unknown error occurred");
};

export const getSkiResorts = async (): Promise<Resort[]> => {
  try {
    const response = await apiClient.get<Resort[]>("/hotels/ski-resorts");
    return response.data;
  } catch (error) {
    console.error("Error fetching ski resorts:", error);
    throw handleError(error);
  }
};

export const searchHotelsStream = async (
  params: SearchParams,
  onHotel: (hotel: Hotel) => void,
  onComplete: (hotels: Hotel[]) => void,
  onError: (error: string) => void
): Promise<void> => {
  try {
    const fetchResponse = await fetch(`${API_BASE_URL}/hotels/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (!fetchResponse.ok) {
      throw new Error(`HTTP error! status: ${fetchResponse.status}`);
    }

    const reader = fetchResponse.body?.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    if (!reader) {
      throw new Error("Stream reader not available");
    }

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (line.trim() && line.startsWith("data: ")) {
          try {
            const data: SSEMessage = JSON.parse(line.slice(6));

            if (
              data.type === "hotel" &&
              data.data &&
              !Array.isArray(data.data)
            ) {
              const hotel = data.data as Hotel;
              onHotel(hotel);
            } else if (data.type === "complete" && Array.isArray(data.data)) {
              onComplete(data.data);
            } else if (data.type === "error") {
              onError(data.message || "An error occurred during search");
            }
          } catch (e) {
            console.error("Failed to parse SSE data:", e);
          }
        }
      }
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    onError(errorMessage);
  }
};

export const searchHotelsSync = async (
  params: SearchParams
): Promise<{ hotels: Hotel[]; total: number }> => {
  try {
    const response = await apiClient.post<{
      hotels: Hotel[];
      total: number;
    }>("/hotels/search/sync", params);
    return response.data;
  } catch (error) {
    console.error("Error searching hotels:", error);
    throw handleError(error);
  }
};
