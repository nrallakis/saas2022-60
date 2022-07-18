import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ActualTotalLoadDocument = ActualTotalLoad & Document;

@Schema()
export class ActualTotalLoad {
  @Prop()
  dateTime: Date;

  @Prop()
  mapCode: string;

  @Prop()
  actualDataLoad: number;

  @Prop()
  updateTime: Date;
}

export const ActualTotalLoadSchema =
  SchemaFactory.createForClass(ActualTotalLoad);
