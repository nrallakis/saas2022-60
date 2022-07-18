import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ActualTotalLoad, ActualTotalLoadDocument } from './atl/atl.schema';
import { ConsumerService } from './kafka/consumer.service';

@Injectable()
export class ConsumerRunner implements OnModuleInit {
  constructor(
    private readonly consumerService: ConsumerService,
    @InjectModel(ActualTotalLoad.name)
    private readonly atlModel: Model<ActualTotalLoadDocument>,
    @InjectModel(ActualTotalLoad.name)
    private readonly gptModel: Model<ActualTotalLoadDocument>,
    @InjectModel(ActualTotalLoad.name)
    private readonly ffModel: Model<ActualTotalLoadDocument>,
  ) {}

  async onModuleInit() {
    await this.consumerService.consume(
      {
        topics: [
          'actual-generation-per-type',
          'actual-total-load',
          'physical-flow',
        ],
      },
      {
        eachMessage: async ({ topic, partition, message }) => {
          console.log(message);
          switch (topic) {
            case 'atl':
              // this.atlModel.insertMany();
              //Map kafka message to atl mongodb json
              //Insert and update to mongodb
              break;
            case 'gpt':
              //Map kafka message to gpt mongodb json
              //Insert and update to mongodb
              break;
            case 'ff':
              //Map kafka message to ff mongodb json
              //Insert and update to mongodb
              break;
          }
        },
      },
    );
  }
}
