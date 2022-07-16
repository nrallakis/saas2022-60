import { Injectable } from '@nestjs/common';

@Injectable()
export class AtlService {
  getDataForCountry(country: String, dateFrom: Date, dateTo: Date) {
    return ['test', 'test'];
  }
}
