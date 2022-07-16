import { Module } from '@nestjs/common';
import { AtlService } from './atl.service';
import { AtlController } from './atl.controller';

@Module({
  controllers: [AtlController],
  providers: [AtlService]
})
export class AtlModule {}
