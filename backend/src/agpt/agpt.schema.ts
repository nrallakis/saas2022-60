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
}

export const ActualGenerationPerTypeSchema = SchemaFactory.createForClass(
  ActualGenerationPerType,
);
