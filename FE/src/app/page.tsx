"use client";
import { useCountries } from "@/service/use-countries";
export default function Home() {
  const { useGetAllCountries } = useCountries();
  const countriesQuery = useGetAllCountries();
  if (countriesQuery.isLoading || countriesQuery.isPending) {
    return <main className="flex min-h-screen flex-col items-center justify-between p-24">Loading...</main>;
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-3xl font-bold ">Get Country Info App</h1>
      {countriesQuery.data && <pre>{JSON.stringify(countriesQuery.data, null, 2)}</pre>}
    </main>
  );
}
