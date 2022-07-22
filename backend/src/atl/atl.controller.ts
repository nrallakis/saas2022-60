import {
    Controller,
    Get,
    Param,
    Query,
} from '@nestjs/common';
import {AtlService} from './atl.service';
import {Points} from "../points";

@Controller('atl')
export class AtlController {
    constructor(private readonly atlService: AtlService) {}

    @Get()
    async findAll(): Promise<void> {
        return this.atlService.add();
    }

    @Get('countries')
    getCountries(): Promise<string[]> {
        return this.atlService.getCountries();
    }

    @Get(':country')
    async getDataForCountry(
        @Param('country') country: string,
        @Query('from') dateFrom: string,
        @Query('to') dateTo: string,
    ): Promise<Points> {
        return this.atlService.getDataForCountry(
            country,
            new Date(dateFrom),
            new Date(dateTo),
        );
    }
}
