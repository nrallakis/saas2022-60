import { ActualTotalLoad } from "../atl/atl.schema";
import {
  KafkaDataMessage,
  kafkaToActualGenerationPerType,
  kafkaToActualTotalLoad,
  kafkaToPhysicalFlows
} from "./kafka_message_mapper";
import { ActualGenerationPerType } from "../agpt/agpt.schema";
import { PhysicalFlows } from "../ff/ff.schema";

describe("maps kafka message to typed insertions & updates", () => {

  const atlMessage = '{"type": "ATL", "insertions": [{"dateTime": "2000-01-31 00:00:00.000", "mapCode": "BE", "actualTotalLoad": 200, "updateTime": "2023-01-31 01:01:01.000"}, {"dateTime": "2000-01-31 00:00:00.000", "mapCode": "BE", "actualTotalLoad": 200, "updateTime": "2023-01-31 01:01:01.000"}], "updates": []}';
  it("parses KafkaMessage", () => {
    let kafkaMessage: KafkaDataMessage = JSON.parse(atlMessage);
    console.log(kafkaMessage);
    console.log(kafkaMessage.insertions);
  });

  it("map kafka message to ActualTotalLoad insertions & updates", () => {
    let kafkaMessage: KafkaDataMessage = JSON.parse(atlMessage);
    console.log(kafkaMessage.insertions);
    console.log(kafkaMessage.type);
    let expectedInsertions: ActualTotalLoad[] = [
      {
        dateTime: new Date("2000-01-31 00:00:00.000"),
        mapCode: "BE",
        actualDataLoad: 200,
        updateTime: new Date("2023-01-31 01:01:01.000")
      },
      {
        dateTime: new Date("2000-01-31 00:00:00.000"),
        mapCode: "BE",
        actualDataLoad: 200,
        updateTime: new Date("2023-01-31 01:01:01.000")
      }
    ];
    let expectedUpdates: ActualTotalLoad[] = [];

    let [actualInsertions, actualUpdates] = kafkaToActualTotalLoad(kafkaMessage);
    expect(actualInsertions).toEqual(expectedInsertions);
    expect(actualUpdates).toEqual(expectedUpdates);
  });

  const agptMessage = '{"type": "AGPT", "insertions": [{"dateTime": "2022-01-31 00:00:00.000", "mapCode": "BE", "productionType": "Gas", "actualGenerationOutput": 200, "actualConsumption": 200, "updateTime": "2024-01-31 01:01:01.000"}], "updates": []}';
  it("map kafka message to ActualGenerationPerType insertions & updates", () => {
    let kafkaMessage: KafkaDataMessage = JSON.parse(agptMessage);
    let expectedInsertions: ActualGenerationPerType[] = [
      {
        dateTime: new Date("2022-01-31 00:00:00.000"),
        mapCode: "BE",
        productionType: "Gas",
        actualConsumption: 200,
        actualGenerationOutput: 200,
        updateTime: new Date("2024-01-31 01:01:01.000")
      }
    ];
    let expectedUpdates: ActualGenerationPerType[] = [];

    let [actualInsertions, actualUpdates] = kafkaToActualGenerationPerType(kafkaMessage);
    expect(actualInsertions).toEqual(expectedInsertions);
    expect(actualUpdates).toEqual(expectedUpdates);
  });

  const ffMessage = '{"type": "FF", "insertions": [{"dateTime": "2022-01-31 00:00:00.000", "outMapCode": "AB", "inMapCode": "AB", "flowValue": 100, "updateTime": "2022-01-31 01:01:01.000"}], "updates": []}';
  it("map kafka message to PhysicalFlows insertions & updates", () => {
    let kafkaMessage: KafkaDataMessage = JSON.parse(ffMessage);
    let expectedInsertions: PhysicalFlows[] = [
      {
        dateTime: new Date("2022-01-31 00:00:00.000"),
        outMapCode: "AB",
        inMapCode: "AB",
        flowValue: 100,
        updateTime: new Date("2022-01-31 01:01:01.000")
      }
    ];
    let expectedUpdates: PhysicalFlows[] = [];

    let [actualInsertions, actualUpdates] = kafkaToPhysicalFlows(kafkaMessage);
    expect(actualInsertions).toEqual(expectedInsertions);
    expect(actualUpdates).toEqual(expectedUpdates);
  });

});
