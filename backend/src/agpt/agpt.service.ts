import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ActualGenerationPerType,
  ActualGenerationPerTypeDocument,
} from './agpt.schema';

@Injectable()
export class AgptService {
  constructor(
    @InjectModel(ActualGenerationPerType.name)
    private readonly agptModel: Model<ActualGenerationPerTypeDocument>,
  ) {}

  async add(): Promise<void> {
    await this.agptModel.create({
      dateTime: new Date('2021-05-20T10:24:51.303Z'),
      mapCode: 'BE',
      productionType: 'BE',
      actualGenerationOutput: 100,
      actualConsumption: 100,
      updateTime: '2022-01-31 01:01:01.000',
    });
  }

  async getCountries() {
    return this.agptModel.distinct('mapCode');
  }

  async getDataForCountry(
    country: string,
    dateFrom: Date,
    dateTo: Date,
  ): Promise<number[][]> {
    return this.agptModel.find({
      country: country,
      dateTime: {$gt: dateFrom, $lt: dateTo}
    });
  }
}
