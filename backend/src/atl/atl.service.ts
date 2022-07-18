import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ActualTotalLoad, ActualTotalLoadDocument } from './atl.schema';

@Injectable()
export class AtlService {
  constructor(
    @InjectModel(ActualTotalLoad.name)
    private readonly atlModel: Model<ActualTotalLoadDocument>,
  ) {}

  async add(): Promise<void> {
    let fakeData: ActualTotalLoad = {
      dateTime: new Date('2021-05-20T10:24:51.303Z'),
      mapCode: 'AB',
      actualDataLoad: 100,
      updateTime: new Date('2022-01-31 01:01:01.000'),
    };
    await this.atlModel.create(fakeData);
  }

  async getDataForCountry(
    country: string,
    dateFrom: Date,
    dateTo: Date,
  ): Promise<number[][]> {
    return this.atlModel.find({
      country: country,
      dateTime: {
        "$gt": dateFrom,
        "$lt": dateTo,
      }
    });
  }

  async getCountries(): Promise<string[]> {
    return this.atlModel.distinct('mapCode');
  }
}
