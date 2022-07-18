import {
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { FFService } from './ff.service';
import {Points} from "../points";

@Controller('ff')
export class FFController {
  constructor(private readonly ffService: FFService) {}

  @Get(':country')
  getDataForCountry(
    @Param('country') country: string,
    @Query('from') dateFrom: Date,
    @Query('to') dateTo: Date,
  ): Promise<Points | string[]> {
    if (country === 'countries') {
      return this.ffService.getCountries();
    }
    return this.ffService.getDataForCountry(
      country,
      new Date(dateFrom),
      new Date(dateTo),
    );
  }
}
