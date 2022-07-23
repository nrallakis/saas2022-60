import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ActualTotalLoad, ActualTotalLoadDocument } from './atl/atl.schema';
import { ConsumerService } from './kafka/consumer.service';
import { ActualGenerationPerType, ActualGenerationPerTypeDocument } from "./agpt/agpt.schema";
import { PhysicalFlows, PhysicalFlowsDocument } from "./ff/ff.schema";
import {
  KafkaDataMessage,
  kafkaToActualGenerationPerType,
  kafkaToActualTotalLoad, kafkaToPhysicalFlows
} from "./mappers/kafka_message_mapper";


@Injectable()
export class ConsumerRunner implements OnModuleInit {
  constructor(
    private readonly consumerService: ConsumerService,
    @InjectModel(ActualTotalLoad.name)
    private readonly atlModel: Model<ActualTotalLoadDocument>,
    @InjectModel(ActualGenerationPerType.name)
    private readonly agptModel: Model<ActualGenerationPerTypeDocument>,
    @InjectModel(PhysicalFlows.name)
    private readonly ffModel: Model<PhysicalFlowsDocument>,
  ) {}

  async onModuleInit() {
    console.log('Start');
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
          let parsedMessage: KafkaDataMessage = JSON.parse(JSON.parse(message.value.toString()));
          console.log(parsedMessage);
          switch (topic) {
            case 'actual-generation-per-type':
              let [agptInserts, agptUpdates] = kafkaToActualGenerationPerType(parsedMessage);
              await this.agptModel.insertMany(agptInserts);
              await this.agptModel.bulkWrite(
                agptUpdates.map(agpt => ({
                  updateOne: {
                    filter: {
                      dateTime: agpt.dateTime,
                      mapCode: agpt.mapCode,
                    },
                    update: agpt,
                  }
                }))
              );
              break;
            case 'actual-total-load':
              let [atlInserts, atlUpdates] = kafkaToActualTotalLoad(parsedMessage);
              await this.atlModel.insertMany(atlInserts);
              await this.atlModel.bulkWrite(
                atlUpdates.map(atl => ({
                  updateOne: {
                    filter: {
                      dateTime: atl.dateTime,
                      mapCode: atl.mapCode,
                    },
                    update: atl,
                  }
                }))
              );
              break;
            case 'physical-flow':
              let [ffInserts, ffUpdates] = kafkaToPhysicalFlows(parsedMessage);
              await this.ffModel.insertMany(ffInserts);
              await this.ffModel.bulkWrite(
                ffUpdates.map(ff => ({
                  updateOne: {
                    filter: {
                      dateTime: ff.dateTime,
                      outMapCode: ff.outMapCode,
                      inMapCode: ff.inMapCode,
                    },
                    update: ff,
                  }
                }))
              );
              break;
          }
        },
      },
    );
  }
}
