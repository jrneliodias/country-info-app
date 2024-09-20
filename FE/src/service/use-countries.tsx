"use client";
import { Country } from "@/interfaces";
import { useQuery } from "@tanstack/react-query";

const apiUrl = "http://localhost:4000";

export const useCountries = () => {
  const useGetAllCountries = () => {
    return useQuery<Country[], Error>({
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
