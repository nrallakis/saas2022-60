import {Points} from "./point";

export interface EnergyService {
    fetchActualTotalLoad(country: String, start: Date, end: Date): Promise<Points>
    fetchGenerationPerType(country: String, generationType: String, start: Date, end: Date): Promise<Points>
    fetchCrossBorderFlows(countryFrom: String, countryTo: String,  start: Date, end: Date): Promise<Points>
    fetchCountries(): Promise<String[]>
    fetchGenerationPerTypeOptions(): Promise<String[]>
}

const fakeData = [[1167609600000,0.7537],[1167696000000,0.7537],[1167782400000,0.7559],[1167868800000,0.7631],[1167955200000,0.7644],[1168214400000,0.769],[1168300800000,0.7683],[1168387200000,0.77],[1168473600000,0.7703],[1168560000000,0.7757],[1168819200000,0.7728],[1168905600000,0.7721],[1168992000000,0.7748],[1169078400000,0.774],[1169164800000,0.7718],[1169424000000,0.7731],[1169510400000,0.767],[1169596800000,0.769],[1169683200000,0.7706],[1169769600000,0.7752],[1170028800000,0.774]];

export class DataService implements EnergyService {
    fetchActualTotalLoad(country: String, start: Date, end: Date): Promise<Points> {
        return Promise.resolve([]);
    }
    fetchGenerationPerType(country: String, generationType: String, start: Date, end: Date): Promise<Points> {
        return Promise.resolve([]);
    }
    fetchCrossBorderFlows(countryFrom: String, countryTo: String,  start: Date, end: Date): Promise<Points> {
        return Promise.resolve([]);
    }
    fetchCountries(): Promise<String[]> {
        return Promise.resolve([]);
    }
    fetchGenerationPerTypeOptions(): Promise<String[]> {
        throw new Error("Method not implemented.");
    }
}

export class MockDataService implements EnergyService {
    fetchActualTotalLoad(country: String, start: Date, end: Date): Promise<Points> {
        return Promise.resolve(fakeData);
    }
    fetchGenerationPerType(country: String, generationType: String, start: Date, end: Date): Promise<Points> {
        return Promise.resolve(fakeData);
    }
    fetchCrossBorderFlows(countryFrom: String, countryTo: String,  start: Date, end: Date): Promise<Points> {
        return Promise.resolve(fakeData);
    }
    fetchCountries(): Promise<String[]> {
        return Promise.resolve([
            'Greece',
            'Germany',
            'Italy',
            'Sweden',
            'Bulgary',
            'Austria'
        ]);
    }
    fetchGenerationPerTypeOptions(): Promise<String[]> {
        return Promise.resolve(['Gas', 'Petrol', 'Wind']);
    }
}
