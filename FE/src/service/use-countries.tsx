"use client";
import { useQuery } from "@tanstack/react-query";

const apiUrl = "http://localhost:4000";

export const useCountries = () => {
  const useGetAllCountries = () => {
    return useQuery({
      queryKey: ["countries"],
      queryFn: async () => {
        const response = await fetch(`${apiUrl}/AvailableCountries`);
        return response.json();
      },
    });
  };
  return {
    useGetAllCountries,
  };
};
