import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Country } from './app.interfaces';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/AvailableCountries')
  getAllCountries(): Observable<Country[]> {
    return this.appService.getAllCountries();
  }
}
