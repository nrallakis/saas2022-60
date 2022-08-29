const invert = require('lodash.invert');

export function mapCodeToCountry(mapCode: string): string {
    // @ts-ignore
    return mapCodeToCountryDict[mapCode];
}

export function mapCountryToCode(country: string): string {
    return countryToMapCodeDict[country];
}

const mapCodeToCountryDict = {
    "AL": "Albania",
    "AT": "Austria",
    "BY": "Belarus",
    "BE": "Belgium",
    "BA": "Bosnia Herzegovina",
    "BG": "Bulgaria",
    "HR": "Croatia",
    "CY": "Cyprus",
    "CZ": "Czech Republic",
    "DK": "Denmark",
    "EE": "Estonia",
    "FI": "Finland",
    "FR": "France",
    "GE": "Georgia",
    "DE": "Germany",
    "GR": "Greece",
    "HU": "Hungary",
    "IE": "Ireland",
    "IT": "Italy",
    "LV": "Latvia",
    "LT": "Lithuania",
    "LU": "Luxembourg",
    "MT": "Malta",
    "ME": "Montenegro",
    "NL": "Netherlands",
    "MK": "North Macedonia",
    "NO": "Norway",
    "PL": "Poland",
    "PT": "Portugal",
    "MD": "Republic of Moldova",
    "RO": "Romania",
    "RS": "Serbia",
    "SK": "Slovakia",
    "SI": "Slovenia",
    "ES": "Spain",
    "SE": "Sweden",
    "CH": "Switzerland",
    "TR": "Turkey",
    "UA": "Ukraine",
    "GB": "United Kingdom",
    "RU": "Russia",
    "AM": "Armenia",
    "AZ": "Azerbaijan",
    "XK": "Kosovo",
}

const countryToMapCodeDict = invert(mapCodeToCountryDict);