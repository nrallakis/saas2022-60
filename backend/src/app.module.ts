import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AtlModule } from './atl/atl.module';
import { KafkaModule } from './kafka/kafka.module';
import { AgptModule } from './agpt/agpt.module';
import { FFModule } from './ff/ff.module';
import { ConsumerRunner } from "./kafka.runner";
import { ActualTotalLoad } from "./atl/atl.schema";

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/saas'),
    AtlModule,
    KafkaModule,
    FFModule,
    AgptModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConsumerRunner],
})
export class AppModule {}
