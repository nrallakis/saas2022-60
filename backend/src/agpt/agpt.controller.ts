import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AgptService } from './agpt.service';

@Controller('atl')
export class AgptController {
  constructor(private readonly agptService: AgptService) {}

  @Get()
  async findAll(): Promise<void> {
    return this.agptService.add();
  }

  @Get(':country')
  getDataForCountry(
    @Param('country') country: string,
    @Query('from') dateFrom: Date,
    @Query('to') dateTo: Date,
  ) {
    return this.agptService.getDataForCountry(
      country,
      new Date(dateFrom),
      new Date(dateTo),
    );
  }
}
