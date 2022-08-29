import {
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { AgptService } from './agpt.service';
import {Points} from "../points";

@Controller('agpt')
export class AgptController {
  constructor(private readonly agptService: AgptService) {}

  @Get()
  async findAll(): Promise<void> {
    return this.agptService.add();
  }

  @Get('countries')
  getCountries(): Promise<string[]> {
    return this.agptService.getCountries();
  }

  @Get(':country/types')
  getGenerationTypes(@Param('country') country: string): Promise<string[]> {
    return this.agptService.getGenerationTypes(country);
  }

  @Get(':type/:country')
  getDataForCountry(
    @Param('type') type: string,
    @Param('country') country: string,
    @Query('from') dateFrom: Date,
    @Query('to') dateTo: Date,
  ): Promise<Points>{
    return this.agptService.getDataForCountry(
      country,
      type,
      new Date(dateFrom),
      new Date(dateTo),
    );
  }
}
