export interface Country {
    id: string;
    name: string;
}

export interface BorderCountries {
    commonName: string;
    officialName: string;
    countryCode: string;
    region: string;
    borders: CountryInfo[];
}

export interface CountryInfo {
    commonName: string;
    officialName: string;
    countryCode: string;
    region: string;
    borders: null;
}