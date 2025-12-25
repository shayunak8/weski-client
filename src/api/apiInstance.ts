import axios, { AxiosInstance } from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const getApiBaseUrl = (): string => API_BASE_URL;

export const apiInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const handleApiError = (error: unknown): Error => {
  if (axios.isAxiosError(error)) {
    return new Error(
      error.response?.data?.message || error.message || "API request failed"
    );
  }
  return error instanceof Error ? error : new Error("Unknown error occurred");
};

