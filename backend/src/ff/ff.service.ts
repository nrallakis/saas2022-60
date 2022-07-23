import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PhysicalFlows, PhysicalFlowsDocument } from './ff.schema';

@Injectable()
export class FFService {
  constructor(
    @InjectModel(PhysicalFlows.name)
    private readonly ffModel: Model<PhysicalFlowsDocument>,
  ) {}

  async getCountries() {
    return this.ffModel.distinct('inMapCode');
  }

  async getDataForCountry(
    countryFrom: string,
    countryTo: string,
    dateFrom: Date,
    dateTo: Date,
  ): Promise<number[][]> {
    const data = await this.ffModel.find({
      outMapCode: countryFrom,
      inMapCode: countryTo,
      dateTime: {
        "$gt": dateFrom,
        "$lt": dateTo,
      }
    });
    return data.map(function (point: PhysicalFlows) {
      return [point.dateTime.valueOf(), point.flowValue];
    });
  }
}
