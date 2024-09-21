"use client";
import CountryCard from "@/components/CountryCard";
import { useCountries } from "@/service/use-countries";
import { Loader2 } from "lucide-react";
export default function Home() {
  const { useGetAllCountries } = useCountries();
  const countriesQuery = useGetAllCountries();
  if (countriesQuery.isLoading || countriesQuery.isPending) {
    return (
      <main className="flex min-h-screen flex-col items-center gap-10 p-3 lg:p-24">
        <h1 className="text-3xl font-bold ">Get Country Info App</h1>
        <Loader2 className="w-8 h-8 animate-spin" />
      </main>
    );
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-3 lg:p-24 gap-4">
      <h1 className="text-3xl font-bold ">Get Country Info App</h1>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {countriesQuery.data && countriesQuery.data.map((country) => <CountryCard country={country} key={country.countryCode} />)}
      </section>
    </main>
  );
}
