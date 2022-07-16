import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getCountries() : string[] {
    return [
      'Greece',
      'Germany',
      'Italy',
      'Sweden',
      'Bulgary',
      'Austria'
    ];
  }

  getGenerationPerTypeOptions() : string[] {
    return [
      'Gas',
      'Petrol',
      'Wind',
      'Solar'
    ]
  }
}
