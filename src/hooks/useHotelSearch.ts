import { useState, useCallback } from "react";
import { SearchParams, Hotel } from "../types/hotel.types";
import { searchHotelsStream } from "../api/api";
import { ERROR_MESSAGES } from "../constants/errorMessages.constants";

export const useHotelSearch = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchHotels = useCallback(async (params: SearchParams) => {
    setLoading(true);
    setError(null);
    setHotels([]);

    try {
      await searchHotelsStream(
        params,
        (hotel: Hotel) => {
          setHotels((prevHotels) => {
            const exists = prevHotels.some((h) => h.id === hotel.id);
            if (exists) return prevHotels;
            const updated = [...prevHotels, hotel];
            return updated.sort((a, b) => a.price - b.price);
          });
        },
        (finalHotels: Hotel[]) => {
          setHotels(finalHotels);
          setLoading(false);
        },
        (errorMessage: string) => {
          setError(errorMessage);
          setLoading(false);
        }
      );
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : ERROR_MESSAGES.UNKNOWN_ERROR;
      setError(errorMessage);
      setLoading(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setHotels([]);
    setError(null);
    setLoading(false);
  }, []);

  return {
    hotels,
    loading,
    error,
    searchHotels,
    clearResults,
  };
};
