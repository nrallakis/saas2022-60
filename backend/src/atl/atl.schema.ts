import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type ActualTotalLoadDocument = ActualTotalLoad & Document;

@Schema()
export class ActualTotalLoad {
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

export const ActualTotalLoadSchema = SchemaFactory.createForClass(ActualTotalLoad);