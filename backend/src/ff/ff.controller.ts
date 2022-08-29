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

  @Get('countriesFrom')
  getCountriesFrom(): Promise<string[]> {
    return this.ffService.getCountriesFrom();
  }

  @Get('countriesTo')
  getCountriesTo(@Query('from') countryFrom: string): Promise<string[]> {
    return this.ffService.getCountriesTo(countryFrom);
  }

  @Get(':countryFrom/:countryTo')
  getDataForCountry(
    @Param('countryFrom') countryFrom: string,
    @Param('countryTo') countryTo: string,
    @Query('from') dateFrom: Date,
    @Query('to') dateTo: Date,
  ): Promise<Points> {
    return this.ffService.getDataForCountry(
      countryFrom,
      countryTo,
      new Date(dateFrom),
      new Date(dateTo),
    );
  }
}
