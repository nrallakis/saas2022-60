import { Module } from '@nestjs/common';
import { AtlService } from './atl.service';
import { AtlController } from './atl.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ActualTotalLoadSchema, ActualTotalLoad } from './atl.schema';
import { ConsumerRunner } from "../kafka.runner";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ActualTotalLoad.name, schema: ActualTotalLoadSchema },
    ]),
  ],
  controllers: [AtlController],
  providers: [AtlService],
  exports: [
    MongooseModule.forFeature([
      { name: ActualTotalLoad.name, schema: ActualTotalLoadSchema },
    ]),
  ]
})
export class AtlModule {}
