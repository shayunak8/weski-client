import { Resort, SearchParams, Hotel, SSEMessage } from "../types/hotel.types";
import { apiInstance, handleApiError, getApiBaseUrl } from "./apiInstance";
import { ERROR_MESSAGES } from "../constants/errorMessages.constants";

export const getSkiResorts = async (): Promise<Resort[]> => {
  try {
    const response = await apiInstance.get<Resort[]>("/hotels/ski-resorts");
    return response.data;
  } catch (error) {
    console.error("Error fetching ski resorts:", error);
    throw handleApiError(error);
  }
};

export const searchHotelsStream = async (
  params: SearchParams,
  onHotel: (hotel: Hotel) => void,
  onComplete: (hotels: Hotel[]) => void,
  onError: (error: string) => void
): Promise<void> => {
  try {
    const url = `${getApiBaseUrl()}/hotels/search`;
    const headers = apiInstance.defaults.headers.common;

    const fetchResponse = await fetch(url, {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      } as HeadersInit,
      body: JSON.stringify(params),
    });

    if (!fetchResponse.ok) {
      throw new Error(`HTTP error! status: ${fetchResponse.status}`);
    }

    const reader = fetchResponse.body?.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    if (!reader) {
      throw new Error(ERROR_MESSAGES.STREAM_READER_UNAVAILABLE);
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
              onError(data.message || ERROR_MESSAGES.SEARCH_ERROR);
            }
          } catch (e) {
            console.error("Failed to parse SSE data:", e);
          }
        }
      }
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : ERROR_MESSAGES.UNKNOWN_ERROR;
    onError(errorMessage);
  }
};

export const searchHotelsSync = async (
  params: SearchParams
): Promise<{ hotels: Hotel[]; total: number }> => {
  try {
    const response = await apiInstance.post<{
      hotels: Hotel[];
      total: number;
    }>("/hotels/search/sync", params);
    return response.data;
  } catch (error) {
    console.error("Error searching hotels:", error);
    throw handleApiError(error);
  }
};
