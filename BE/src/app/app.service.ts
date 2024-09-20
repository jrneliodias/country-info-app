import { HttpService } from '@nestjs/axios';
import { Body, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BorderCountries, Country, CountryData, PopulationData } from './app.interfaces';
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
  getCountryInfo(countryCode: string, country: string): Observable<CountryData> {

    const borderCountries = this.getBorderCoutries(countryCode)

    const populationData = this.getPopulationData(country)

    return forkJoin([borderCountries, populationData]).pipe(
      map(([borderCountries, populationData]) => {
        // Construct the final countryInfo object
        const countryInfo = {
          ...borderCountries,
          iso3: populationData.data.iso3,
          code: populationData.data.code,
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

}