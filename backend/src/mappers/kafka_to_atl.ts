import { ActualGenerationPerType } from "src/agpt/agpt.schema";
import { ActualTotalLoad } from "src/atl/atl.schema";
import { PhysicalFlows } from "src/ff/ff.schema";

interface KafkaDateMessage {
    type: string;
    insertions: ActualTotalLoad[] | ActualGenerationPerType[];
    updates: ActualTotalLoad[] | ActualGenerationPerType[];
    
}

function kafkaToActualTotalLoad(message: KafkaDateMessage): ActualTotalLoad {
    //TODO: implement and test
    return {
        "dateTime":new Date("2021-05-20T10:24:51.303Z"),
        "mapCode":"AB",
        "actualTotalLoad":100,
        "updateTime":new Date("2022-01-31 01:01:01.000"),
    };
}

function kafkaToActualGenerationPerType(message: KafkaDateMessage): ActualGenerationPerType {
    //TODO: implement and test
    return {
        "dateTime":new Date("2021-05-20T10:24:51.303Z"),
        "mapCode":"BE",
        "productionType":"BE",
        "actualGenerationOutput":100,
        "actualConsumption":100,
        "updateTime":new Date("2022-01-31 01:01:01.000"),
    }
}

function kafkaToPhysicalFlows(message: KafkaDateMessage): PhysicalFlows {
    //TODO: implement and test
    return {
        "dateTime": new Date("2021-05-20T10:24:51.303Z"),
        "outMapCode":"AB",
        "inMapCode":"AB",
        "flowValue":100,
        "updateTime":new Date("2022-01-31 01:01:01.000"),
    }
}