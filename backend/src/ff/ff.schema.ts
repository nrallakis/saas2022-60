import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

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
}


export const PhysicalFlowsSchema = SchemaFactory.createForClass(PhysicalFlows);
