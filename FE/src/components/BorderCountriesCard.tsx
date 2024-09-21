import { CountryInfo } from "@/interfaces";
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";

const BorderCountriesCard = ({ borderCountry }: { borderCountry: CountryInfo }) => {
  return (
    <Card>
      <Link href={`/country/${borderCountry.commonName}/${borderCountry.countryCode}`}>
        <CardHeader>
          <CardTitle className="text-lg">{borderCountry.officialName}</CardTitle>
          <CardDescription></CardDescription>
          <CardContent className="grid grid-cols-[auto_1fr] gap-3">
            <h4 className="text-muted-foreground">Common Name</h4>
            <p>{borderCountry.commonName}</p>
            <h4 className="text-muted-foreground">Official Name</h4>
            <p>{borderCountry.officialName}</p>
            <h4 className="text-muted-foreground">Country Code</h4>
            <p>{borderCountry.countryCode}</p>
            <h4 className="text-muted-foreground">Region</h4>
            <p>{borderCountry.region}</p>
          </CardContent>
        </CardHeader>
      </Link>
    </Card>
  );
};

export default BorderCountriesCard;
