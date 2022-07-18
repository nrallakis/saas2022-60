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

  async getDataForCountry(
    country: string,
    dateFrom: Date,
    dateTo: Date,
  ): Promise<number[][]> {
    const fakeData = [
      [1167609600000, 0.7537],
      [1167696000000, 0.7537],
      [1167782400000, 0.7559],
      [1167868800000, 0.7631],
      [1167955200000, 0.7644],
      [1168214400000, 0.769],
      [1168300800000, 0.7683],
      [1168387200000, 0.77],
      [1168473600000, 0.7703],
      [1168560000000, 0.7757],
      [1168819200000, 0.7728],
      [1168905600000, 0.7721],
      [1168992000000, 0.7748],
      [1169078400000, 0.774],
      [1169164800000, 0.7718],
      [1169424000000, 0.7731],
      [1169510400000, 0.767],
      [1169596800000, 0.769],
      [1169683200000, 0.7706],
      [1169769600000, 0.7752],
      [1170028800000, 0.774],
    ];
    return fakeData.reverse();
  }
}
