import { Country } from "@/interfaces";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const CountryCard = ({ country }: { country: Country }) => {
  return (
    <Button className="hover:bg-slate-900" key={country.countryCode} asChild>
      <Link href={`/country/${country.name}/${country.countryCode}`}>{country.name}</Link>
    </Button>
  );
};

export default CountryCard;
