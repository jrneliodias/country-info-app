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

export interface PopulationData {
    error: boolean;
    msg: string;
    data: {
        country: string;
        code: string;
        iso3: string;
        populationCounts: {
            year: number,
            value: number
        }
    }
}

export type CountryData = BorderCountries & {
    code: string;
    iso3: string;
    populationCounts: {
        year: number,
        value: number
    }

}