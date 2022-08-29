import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type PhysicalFlowsDocument = PhysicalFlows & Document;

@Schema()
export class PhysicalFlows {
  @Prop()
  dateTime: Date;

  @Prop()
  outMapCode: string;

  @Prop()
  inMapCode: string;

  @Prop()
  flowValue: number;

  @Prop()
  updateTime: Date;

  constructor(dateTime: Date, outMapCode: string, inMapCode: string, flowValue: number, updateTime: Date) {
    this.dateTime = dateTime;
    this.outMapCode = outMapCode;
    this.inMapCode = inMapCode;
    this.flowValue = flowValue;
    this.updateTime = updateTime;
  }
}

export const PhysicalFlowsSchema = SchemaFactory.createForClass(PhysicalFlows);
