import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ActualGenerationPerType,
  ActualGenerationPerTypeDocument,
} from './agpt.schema';
import {ActualTotalLoad} from "../atl/atl.schema";

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

  async getGenerationTypes(country: string) {
    return this.agptModel.find({mapCode: country}).distinct('productionType');
  }

  async getDataForCountry(
    country: string,
    productionType: string,
    dateFrom: Date,
    dateTo: Date,
  ): Promise<number[][]> {
    const data = await this.agptModel.find({
      mapCode: country,
      productionType: productionType,
      dateTime: {
        "$gt": dateFrom,
        "$lt": dateTo,
      }
    });
    return data.map(function (point: ActualGenerationPerType) {
      return [point.dateTime.valueOf(), point.actualGenerationOutput];
    });
  }
}
