"use client";
import BorderCountriesCard from "@/components/BorderCountriesCard";
import PopulationChart from "@/components/populationChart";
import { useCountries } from "@/service/use-countries";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import React from "react";

const ContryPage = ({ params }: { params: { countryName: string; countryCode: string } }) => {
  const { useGetCountryInfo } = useCountries();
  const countriesQuery = useGetCountryInfo(params);
  if (countriesQuery.isLoading || countriesQuery.isPending) {
    return (
      <main className="flex min-h-screen flex-col items-center gap-10 p-24">
        <Loader2 className="w-8 h-8 animate-spin" />
      </main>
    );
  }

  if (countriesQuery.isError) {
    return <main className="flex min-h-screen flex-col items-center gap-10 p-24">This country does not available yet.</main>;
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-3 lg:p-24">
      <section className="grid md:grid-cols-2 w-full gap-5">
        <div>
          <h1 className="text-4xl lg:text-6xl font-bold ">{countriesQuery.data?.commonName}</h1>
          <h2 className="text-xl font-bold"> {countriesQuery.data?.officialName}</h2>
        </div>
        {countriesQuery.data?.flag && <Image src={countriesQuery.data?.flag} alt={countriesQuery.data?.commonName} width={200} height={200} className="lg:place-self-end rounded-lg object-cover " />}
        <article className="col-span-2 ">
          <h2 className="text-xl lg:text-4xl font-bold">Country Population</h2>
          <PopulationChart populationData={countriesQuery.data?.populationCounts} />
        </article>
        <article className="col-span-2 space-y-5 ">
          <h2 className="text-xl lg:text-4xl font-bold">Border Countries</h2>
          <div className="grid lg:grid-cols-3 gap-5">
            {countriesQuery.data?.borders.map((border) => (
              <BorderCountriesCard borderCountry={border} key={border.countryCode} />
            ))}
          </div>
        </article>
      </section>
    </main>
  );
};

export default ContryPage;
