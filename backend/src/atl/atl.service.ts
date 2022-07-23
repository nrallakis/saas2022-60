import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {ActualTotalLoad, ActualTotalLoadDocument} from './atl.schema';

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
    const data = await this.atlModel.find({
      mapCode: country,
      dateTime: {
        "$gt": dateFrom,
        "$lt": dateTo,
      }
    });
    return data.map(function (point: ActualTotalLoad) {
      return [point.dateTime.valueOf(), point.actualDataLoad];
    });
  }

  async getCountries(): Promise<string[]> {
    return this.atlModel.distinct('mapCode');
  }
}
