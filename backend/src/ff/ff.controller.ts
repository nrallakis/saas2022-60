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
import { FFService } from './ff.service';

@Controller('atl')
export class FFController {
  constructor(private readonly ffService: FFService) {}

  @Get()
  async findAll(): Promise<void> {
    return this.ffService.add();
  }

  @Get(':country')
  getDataForCountry(
    @Param('country') country: string,
    @Query('from') dateFrom: Date,
    @Query('to') dateTo: Date,
  ) {
    return this.ffService.getDataForCountry(
      country,
      new Date(dateFrom),
      new Date(dateTo),
    );
  }
}
