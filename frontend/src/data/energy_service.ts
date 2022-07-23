import {Points} from "./point";

export interface EnergyService {
    fetchActualTotalLoad(countryCode: string, start: Date, end: Date): Promise<Points>
    fetchActualTotalLoadCountries(): Promise<string[]>
    fetchGenerationPerType(countryCode: string, generationType: string, start: Date, end: Date): Promise<Points>
    fetchGenerationPerTypeCountries(): Promise<string[]>
    fetchGenerationPerTypeOptions(country: string): Promise<string[]>
    fetchCrossBorderFlows(countryCodeFrom: string, countryCodeTo: string,  start: Date, end: Date): Promise<Points>
    fetchCrossBorderFlowsCountriesFrom(): Promise<string[]>
    fetchCrossBorderFlowsCountriesTo(countryFromCode: string): Promise<string[]>
}

const baseUrl = "http://localhost:3001";

function get(path: string) : Promise<any> {
    return fetch(baseUrl + path).then(res => res.json());
}

export class DataService implements EnergyService {
    fetchActualTotalLoad(countryCode: string, start: Date, end: Date): Promise<Points> {
        return get(`/atl/${countryCode}?from=${start}&to=${end}`);
    }
    fetchActualTotalLoadCountries(): Promise<string[]> {
        return get('/atl/countries/');
    }
    fetchGenerationPerType(countryCode: string, generationType: string, start: Date, end: Date): Promise<Points> {
        return get(`/agpt/${generationType}/${countryCode}?from=${start}&to=${end}`);
    }
    fetchGenerationPerTypeCountries(): Promise<string[]> {
        return get('/agpt/countries/');
    }
    fetchGenerationPerTypeOptions(countryCode: string): Promise<string[]> {
        return get(`/agpt/${countryCode}/types/`);
    }
    fetchCrossBorderFlows(countryCodeFrom: string, countryCodeTo: string, start: Date, end: Date): Promise<Points> {
        return get(`/ff/${countryCodeFrom}/${countryCodeTo}?from=${start}&to=${end}`);
    }
    fetchCrossBorderFlowsCountriesFrom(): Promise<string[]> {
        return get('/ff/countriesFrom/');
    }
    fetchCrossBorderFlowsCountriesTo(countryFromCode: string): Promise<string[]> {
        return get(`/ff/countriesTo?from=${countryFromCode}`);
    }
}

const fakeData = [[1167609600000,0.7537],[1167696000000,0.7537],[1167782400000,0.7559],[1167868800000,0.7631],[1167955200000,0.7644],[1168214400000,0.769],[1168300800000,0.7683],[1168387200000,0.77],[1168473600000,0.7703],[1168560000000,0.7757],[1168819200000,0.7728],[1168905600000,0.7721],[1168992000000,0.7748],[1169078400000,0.774],[1169164800000,0.7718],[1169424000000,0.7731],[1169510400000,0.767],[1169596800000,0.769],[1169683200000,0.7706],[1169769600000,0.7752],[1170028800000,0.774]];
const fakeCountries = ['GR', 'AT', 'BR', 'CN']
export class MockDataService implements EnergyService {
    fetchActualTotalLoad(country: string, start: Date, end: Date): Promise<Points> {
        return Promise.resolve(fakeData);
    }
    fetchActualTotalLoadCountries(): Promise<string[]> {
        return Promise.resolve(fakeCountries);
    }
    fetchGenerationPerType(country: string, generationType: string, start: Date, end: Date): Promise<Points> {
        return Promise.resolve(fakeData);
    }
    fetchGenerationPerTypeCountries(): Promise<string[]> {
        return Promise.resolve(fakeCountries);
    }
    fetchGenerationPerTypeOptions(): Promise<string[]> {
        return Promise.resolve(['Gas', 'Petrol', 'Wind']);
    }
    fetchCrossBorderFlows(countryFrom: string, countryTo: string,  start: Date, end: Date): Promise<Points> {
        return Promise.resolve(fakeData);
    }
    fetchCrossBorderFlowsCountriesFrom(): Promise<string[]> {
        return Promise.resolve(fakeCountries);
    }
    fetchCrossBorderFlowsCountriesTo(countryFromCode: string): Promise<string[]> {
        return get(`/ff/countriesTo?from=${countryFromCode}`);
    }
}
