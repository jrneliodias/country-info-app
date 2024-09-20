import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { BorderCountries, Country, CountryData } from './app.interfaces';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/AvailableCountries')
  getAllCountries(): Observable<Country[]> {
    return this.appService.getAllCountries();
  }

  @Post('/BorderCountries/:countryCode')
  getBorderCountries(@Param('countryCode') countryCode: string, @Body() body: { country: string }): Observable<CountryData> {

    return this.appService.getCountryInfo(countryCode, body);
  }
}
