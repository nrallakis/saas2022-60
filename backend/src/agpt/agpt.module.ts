import { Module } from '@nestjs/common';
import { AgptService } from './agpt.service';
import { AgptController } from './agpt.controller';

@Module({
  controllers: [AgptController],
  providers: [AgptService]
})
export class AgptModule {}
