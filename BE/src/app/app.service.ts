import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAllCountries(): string {
    return 'Hello World!';
  }
}
