import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Country } from './app.interfaces';
@Injectable()
export class AppService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) { }

  getNagerHost(): string {
    return this.configService.get<string>('API_NAGER_URL');
  }
  getAllCountries(): Observable<Country[]> {
    const apiUrl = this.getNagerHost();
    return this.httpService
      .get<Country[]>(`${apiUrl}/AvailableCountries`)
      .pipe(
        map((response) => response.data)
      );
  }
}
