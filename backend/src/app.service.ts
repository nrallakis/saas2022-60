import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getGenerationPerTypeOptions() : string[] {
    return [
      'Gas',
      'Petrol',
      'Wind',
      'Solar'
    ]
  }
}
