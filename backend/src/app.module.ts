import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AtlModule } from './atl/atl.module';
import { KafkaModule } from './kafka/kafka.module';
import { AgptModule } from './agpt/agpt.module';
import { FFModule } from './ff/ff.module';
import { ConsumerRunner } from "./kafka.runner";

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/saas'),
    AtlModule,
    KafkaModule,
    FFModule,
    AgptModule,
  ],
  providers: [ConsumerRunner],
})
export class AppModule {}
