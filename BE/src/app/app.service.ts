import { HttpService } from '@nestjs/axios';
import { Body, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BorderCountries, Country, CountryData, CountryFlagData, PopulationData } from './app.interfaces';
@Injectable()
export class AppService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) { }

  private getNagerHost(): string {
    return this.configService.get<string>('API_NAGER_URL');
  }

  private getCoutriesNowHost(): string {
    return this.configService.get<string>('API_COUNTRIESNOW_URL');
  }
  getAllCountries(): Observable<Country[]> {
    const apiUrl = this.getNagerHost();
    return this.httpService
      .get<Country[]>(`${apiUrl}/AvailableCountries`)
      .pipe(
        map((response) => response.data)
      );
  }
  getCountryInfo(countryCode: string, body: { country: string }): Observable<CountryData> {

    const { country } = body

    const borderCountries = this.getBorderCoutries(countryCode)

    const populationData = this.getPopulationData(country)

    const countryFlagData = this.getCountryFlagData(countryCode)

    return forkJoin([borderCountries, populationData, countryFlagData]).pipe(
      map(([borderCountries, populationData, countryFlagData]) => {
        // Construct the final countryInfo object
        const countryInfo = {
          ...borderCountries,
          iso2: countryFlagData.data.iso2,
          iso3: populationData.data.iso3,
          code: populationData.data.code,
          flag: countryFlagData.data.flag,
          populationCounts: populationData.data.populationCounts,
        };
        return countryInfo;
      })
    );
  }


  private getBorderCoutries(countryCode: string): Observable<BorderCountries> {
    const apiNagerUrl = this.getNagerHost();
    return this.httpService
      .get<BorderCountries>(`${apiNagerUrl}/CountryInfo/${countryCode}`)
      .pipe(
        map((response) => response.data)
      );
  }
  private getPopulationData(country: string): Observable<PopulationData> {
    const apiCountriesNowUrl = this.getCoutriesNowHost();
    return this.httpService
      .post<PopulationData>(`${apiCountriesNowUrl}/population`, {
        country
      })
      .pipe(
        map((response) => response.data)
      );
  }
  private getCountryFlagData(iso2: string): Observable<CountryFlagData> {
    const apiCountriesNowUrl = this.getCoutriesNowHost();
    return this.httpService
      .post<CountryFlagData>(`${apiCountriesNowUrl}/flag/images`, {
        iso2
      })
      .pipe(
        map((response) => response.data)
      );
  }

}