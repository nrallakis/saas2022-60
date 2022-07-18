import { ActualGenerationPerType } from "../agpt/agpt.schema";
import { PhysicalFlows } from "../ff/ff.schema";
import { ActualTotalLoad } from "../atl/atl.schema";


export interface KafkaDataMessage {
  type: string;
  insertions: any;
  updates: any;
}

function parseActualTotalLoadJson(json: any): ActualTotalLoad {
  return new ActualTotalLoad(
    new Date(json.dateTime),
    json.mapCode,
    Number(json.actualTotalLoad),
    new Date(json.updateTime)
  );
}

export function kafkaToActualTotalLoad(message: KafkaDataMessage): [ActualTotalLoad[], ActualTotalLoad[]] {
  let insertions = message.insertions.map(
    (insert) => parseActualTotalLoadJson(insert)
  );

  let updates = message.updates.map(
    (update) => parseActualTotalLoadJson(update)
  );

  return [insertions, updates];
}

function parseActualGenerationPerTypeJson(json: any): ActualGenerationPerType {
  return new ActualGenerationPerType(
    new Date(json.dateTime),
    json.mapCode,
    json.productionType,
    Number(json.actualGenerationOutput),
    Number(json.actualConsumption),
    new Date(json.updateTime)
  );
}

export function kafkaToActualGenerationPerType(
  message: KafkaDataMessage
): [ActualGenerationPerType[], ActualGenerationPerType[]] {
  let insertions = message.insertions.map(
    (insert) => parseActualGenerationPerTypeJson(insert)
  );

  let updates = message.updates.map(
    (update) => parseActualGenerationPerTypeJson(update)
  );

  return [insertions, updates];
}

function parsePhysicalFlowsJson(json: any): PhysicalFlows  {
  return new PhysicalFlows(
    new Date(json.dateTime),
    json.outMapCode,
    json.inMapCode,
    Number(json.flowValue),
    new Date(json.updateTime)
  );
}

export function kafkaToPhysicalFlows(message: KafkaDataMessage): [PhysicalFlows[], PhysicalFlows[]] {
  let insertions = message.insertions.map(
    (insert) => parsePhysicalFlowsJson(insert)
  );

  let updates = message.updates.map(
    (update) => parsePhysicalFlowsJson(update)
  );

  return [insertions, updates];
}
