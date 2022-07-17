import { Module } from '@nestjs/common';
import { FfService } from './ff.service';
import { FfController } from './ff.controller';

@Module({
  controllers: [FfController],
  providers: [FfService]
})
export class FfModule {}
