export enum QuantityType {
    actualTotalLoad, generationPerType, crossBorderFlows
}

export const quantityTypesLabels = [
    'Actual total load',
    'Generation per type',
    'Cross border flows'
];

export function quantityTypeToString(type: QuantityType): string {
    if (type === QuantityType.actualTotalLoad) return quantityTypesLabels[0];
    if (type === QuantityType.generationPerType) return quantityTypesLabels[1];
    if (type === QuantityType.crossBorderFlows) return quantityTypesLabels[2];
    return 'could not map quantity type';
}

export function mapStringToQuantityType(text: string): QuantityType {
    if (text === quantityTypesLabels[0]) return QuantityType.actualTotalLoad;
    if (text === quantityTypesLabels[1]) return QuantityType.generationPerType;
    if (text === quantityTypesLabels[2]) return QuantityType.crossBorderFlows;
    return QuantityType.actualTotalLoad;
}