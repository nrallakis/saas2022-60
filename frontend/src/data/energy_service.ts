import {Points} from "./point";

export interface EnergyService {
    fetchActualTotalLoad(countryCode: string, start: Date, end: Date): Promise<Points>
    fetchActualTotalLoadCountries(): Promise<string[]>
    fetchGenerationPerType(countryCode: string, generationType: string, start: Date, end: Date): Promise<Points>
    fetchGenerationPerTypeCountries(): Promise<string[]>
    fetchGenerationPerTypeOptions(): Promise<string[]>
    fetchCrossBorderFlows(countryCodeFrom: string, countryCodeTo: string,  start: Date, end: Date): Promise<Points>
    fetchCrossBorderFlowsCountries(): Promise<string[]>
}

const baseUrl = "http://localhost:3001";

function get(path: string) : Promise<any> {
    return fetch(baseUrl + path).then(res => res.json());
}

export class DataService implements EnergyService {
    fetchActualTotalLoad(country: string, start: Date, end: Date): Promise<Points> {
        return get(`/atl/${country}?from=${start}&to=${end}`);
    }
    fetchActualTotalLoadCountries(): Promise<string[]> {
        return get('/atl/countries/');
    }
    fetchGenerationPerType(country: string, generationType: string, start: Date, end: Date): Promise<Points> {
        return get(`/agpt/${generationType}/${country}?from=${start}&to=${end}`);
    }
    fetchGenerationPerTypeCountries(): Promise<string[]> {
        return get('/agpt/countries/');
    }
    fetchGenerationPerTypeOptions(): Promise<string[]> {
        return get('/agpt/types/');
    }
    fetchCrossBorderFlows(countryFrom: string, countryTo: string, start: Date, end: Date): Promise<Points> {
        return get(`/ff/${countryFrom}/${countryTo}?from=${start}&to=${end}`);
    }
    fetchCrossBorderFlowsCountries(): Promise<string[]> {
        return get('/ff/countries/');
    }
}

const fakeData = [[1167609600000,0.7537],[1167696000000,0.7537],[1167782400000,0.7559],[1167868800000,0.7631],[1167955200000,0.7644],[1168214400000,0.769],[1168300800000,0.7683],[1168387200000,0.77],[1168473600000,0.7703],[1168560000000,0.7757],[1168819200000,0.7728],[1168905600000,0.7721],[1168992000000,0.7748],[1169078400000,0.774],[1169164800000,0.7718],[1169424000000,0.7731],[1169510400000,0.767],[1169596800000,0.769],[1169683200000,0.7706],[1169769600000,0.7752],[1170028800000,0.774]];

export class MockDataService implements EnergyService {
    fetchActualTotalLoadCountries(): Promise<string[]> {
        throw new Error("Method not implemented.");
    }
    fetchGenerationPerTypeCountries(): Promise<string[]> {
        throw new Error("Method not implemented.");
    }
    fetchCrossBorderFlowsCountries(): Promise<string[]> {
        throw new Error("Method not implemented.");
    }
    fetchActualTotalLoad(country: string, start: Date, end: Date): Promise<Points> {
        return Promise.resolve(fakeData);
    }
    fetchGenerationPerType(country: string, generationType: string, start: Date, end: Date): Promise<Points> {
        return Promise.resolve(fakeData);
    }
    fetchCrossBorderFlows(countryFrom: string, countryTo: string,  start: Date, end: Date): Promise<Points> {
        return Promise.resolve(fakeData);
    }
    fetchGenerationPerTypeOptions(): Promise<string[]> {
        return Promise.resolve(['Gas', 'Petrol', 'Wind']);
    }
}
