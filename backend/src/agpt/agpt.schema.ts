import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ActualGenerationPerTypeDocument = ActualGenerationPerType &
  Document;

@Schema()
export class ActualGenerationPerType {
  @Prop()
  dateTime: Date;

  @Prop()
  mapCode: string;

  @Prop()
  productionType: string;

  @Prop()
  actualGenerationOutput: number;

  @Prop()
  actualConsumption: number;

  @Prop()
  updateTime: Date;

  constructor(dateTime: Date, mapCode: string, productionType: string, actualGenerationOutput: number, actualConsumption: number, updateTime: Date) {
    this.dateTime = dateTime;
    this.mapCode = mapCode;
    this.productionType = productionType;
    this.actualGenerationOutput = actualGenerationOutput;
    this.actualConsumption = actualConsumption;
    this.updateTime = updateTime;
  }
}

export const ActualGenerationPerTypeSchema = SchemaFactory.createForClass(
  ActualGenerationPerType,
);
