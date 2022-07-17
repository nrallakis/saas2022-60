import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AtlModule } from './atl/atl.module';
import { KafkaModule } from './kafka/kafka.module';
import { GptModule } from './gpt/gpt.module';
import { FfModule } from './ff/ff.module';
import { AgptModule } from './agpt/agpt.module';
import { FfModule } from './ff/ff.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/saas'),
    AtlModule,
    KafkaModule,
    GptModule,
    FfModule,
    AgptModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
