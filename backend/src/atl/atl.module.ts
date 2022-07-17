import { Module } from '@nestjs/common';
import { AtlService } from './atl.service';
import { AtlController } from './atl.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ActualTotalLoadSchema, ActualTotalLoad } from './atl.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: ActualTotalLoad.name, schema: ActualTotalLoadSchema}])],
  controllers: [AtlController],
  providers: [AtlService]
})
export class AtlModule {}
