import { useState, useEffect, useRef } from "react";
import { getSkiResorts } from "../api/api";
import { Resort } from "../types/hotel.types";
import { ERROR_MESSAGES } from "../constants/errorMessages.constants";

let resortsCache: Resort[] | null = null;
let resortsPromise: Promise<Resort[]> | null = null;

export const useSkiResorts = () => {
  const [resorts, setResorts] = useState<Resort[]>(resortsCache || []);
  const [loading, setLoading] = useState(!resortsCache);
  const [error, setError] = useState<string | null>(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current || resortsCache) {
      if (resortsCache) {
        setResorts(resortsCache);
        setLoading(false);
      }
      return;
    }

    hasFetched.current = true;

    if (!resortsPromise) {
      resortsPromise = getSkiResorts();
    }

    resortsPromise
      .then((data) => {
        resortsCache = data;
        setResorts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(
          err instanceof Error
            ? err.message
            : ERROR_MESSAGES.LOAD_RESORTS_FAILED
        );
        console.error("Error loading resorts:", err);
        hasFetched.current = false;
        resortsPromise = null;
      });
  }, []);

  return { resorts, loading, error };
};
