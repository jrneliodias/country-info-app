"use client";
import { Country, CountryData } from "@/interfaces";
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

  const useGetCountryInfo = ({ countryName, countryCode }: { countryName: string; countryCode: string }) => {
    return useQuery<CountryData, Error>({
      retry: 1,
      queryKey: ["country", countryName, countryCode],
      queryFn: async () => {
        const response = await fetch(`${apiUrl}/CountryInfo/${countryCode}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            country: countryName,
          }),
        });
        if (response.status === 500) {
          throw new Error("Something went wrong");
        }
        return response.json();
      },
    });
  };
  return {
    useGetAllCountries,
    useGetCountryInfo,
  };
};
