import { Module } from '@nestjs/common';
import { FFController } from './ff.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PhysicalFlows, PhysicalFlowsSchema } from './ff.schema';
import { FFService } from './ff.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PhysicalFlows.name, schema: PhysicalFlowsSchema },
    ]),
  ],
  controllers: [FFController],
  providers: [FFService],
  exports: [
    MongooseModule.forFeature([
      { name: PhysicalFlows.name, schema: PhysicalFlowsSchema },
    ]),
  ]
})
export class FFModule {}
