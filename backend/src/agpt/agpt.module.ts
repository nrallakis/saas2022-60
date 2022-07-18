import { Module } from '@nestjs/common';
import { AgptService } from './agpt.service';
import { AgptController } from './agpt.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ActualGenerationPerType,
  ActualGenerationPerTypeSchema,
} from './agpt.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ActualGenerationPerType.name,
        schema: ActualGenerationPerTypeSchema,
      },
    ]),
  ],
  controllers: [AgptController],
  providers: [AgptService],
})
export class AgptModule {}
