import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { BorderCountries, Country } from './app.interfaces';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/AvailableCountries')
  getAllCountries(): Observable<Country[]> {
    return this.appService.getAllCountries();
  }

  @Get('/BorderCountries/:countryCode')
  getBorderCountries(@Param('countryCode') countryCode: string): Observable<BorderCountries> {
    return this.appService.getBorderCountries(countryCode);
  }
}
