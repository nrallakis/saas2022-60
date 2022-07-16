import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AtlService } from './atl.service';

@Controller('atl')
export class AtlController {
  constructor(private readonly atlService: AtlService) {}

  @Get()
  findAll() {
    return 'Service running';
  }

  @Get(':country')
  getDataForCountry(@Param('country') country: String, @Query('from') dateFrom: Date, @Query('to') dateTo: Date) {
    return this.atlService.getDataForCountry(country, new Date(dateFrom), new Date(dateTo));
  }
}
