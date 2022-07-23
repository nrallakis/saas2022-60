import {Dropdown} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton'
import {DataService, EnergyService} from '../data/energy_service';
import {mapCodeToCountry, mapCountryToCode} from "../countries";
import {quantityTypeToString, mapStringToQuantityType, QuantityType, quantityTypesLabels} from "../quantity";

export interface DropDownGroupState {
    quantity: QuantityType;
    secondSelection: string;
    thirdSelection: string;
    secondOptions: string[];
    thirdOptions: string[];
    secondSelectionTitle: string,
    thirdSelectionTitle: string,
}

export interface DropDownChangeListener {
    quantity: QuantityType;
    secondSelection: string;
    thirdSelection: string;
}


export type DropDownGroupProps = {
    onChange: (state: DropDownChangeListener) => void;
};
export default function DropDownGroup(props: DropDownGroupProps) {
    const service: EnergyService = new DataService();

    const defaultOption = 'Select option';
    const initialState: DropDownGroupState = {
        quantity: QuantityType.actualTotalLoad,
        secondSelectionTitle: 'Country',
        secondSelection: defaultOption,
        secondOptions: [],
        thirdSelectionTitle: '',
        thirdSelection: defaultOption,
        thirdOptions: [],
    }
    const [state, setState] = useState(initialState);

    // this hook will get called everytime when state has changed
    useEffect(() => {
        // console.log('Updated State', state);
        props.onChange(state);
    }, [state]);

    const fetchAndSetOptions = async () => {
        if (state.quantity == QuantityType.actualTotalLoad) {
            let countryCodes = await service.fetchActualTotalLoadCountries()
            let countries = countryCodes.map((code) => mapCodeToCountry(code));
            setState({
                ...state,
                secondSelectionTitle: 'Country',
                thirdSelectionTitle: '',
                secondOptions: countries,
                thirdOptions: [],
            });
        } else if (state.quantity == QuantityType.generationPerType) {
            let countryCodes = await service.fetchGenerationPerTypeCountries();
            let countries = countryCodes.map((code) => mapCodeToCountry(code));
            let selectedCountryCode = mapCountryToCode(state.secondSelection);
            let generationTypes = await service.fetchGenerationPerTypeOptions(selectedCountryCode);
            setState({
                ...state,
                secondSelectionTitle: 'Country',
                thirdSelectionTitle: 'Generation type',
                secondOptions: countries,
                thirdOptions: generationTypes,
            });
        } else if (state.quantity == QuantityType.crossBorderFlows) {
            let countryCodes = await service.fetchCrossBorderFlowsCountriesFrom()
            let countries = countryCodes.map((code) => mapCodeToCountry(code));
            setState({
                ...state,
                secondSelectionTitle: 'Country(from)',
                thirdSelectionTitle: 'Country(to)',
                secondOptions: countries,
                thirdOptions: countries,
            });
        }
    }

    useEffect(() => {
        fetchAndSetOptions();
    }, [state.quantity]);


    const showThirdSelection = state.quantity !== QuantityType.actualTotalLoad;

    const onFirstSelectionChanged = (selection: string) => {
        let quantityType = mapStringToQuantityType(selection);
        setState({...state, quantity: quantityType});
    }

    const onSecondSelectionChanged = async (country: string) => {
        if (state.quantity === QuantityType.generationPerType) {
            let countryCode = mapCountryToCode(country);
            let typesAvailableForCountry = await service.fetchGenerationPerTypeOptions(countryCode);
            setState({...state, secondSelection: country, thirdOptions: typesAvailableForCountry});
        } else if (state.quantity === QuantityType.crossBorderFlows) {
            let countryFromCode = mapCountryToCode(country);
            let countriesToCodes = await service.fetchCrossBorderFlowsCountriesTo(countryFromCode);
            let countriesTo = countriesToCodes.map((code) => mapCodeToCountry(code));
            setState({...state, secondSelection: country, thirdOptions: countriesTo});
        } else {
            setState({...state, secondSelection: country});
        }
    }

    const onThirdSelectionChanged = (selection: string) => {
        setState({...state, thirdSelection: selection});
    }

    return (
        <>
            <DropDown
                title='Quantity'
                options={quantityTypesLabels}
                selectedValue={quantityTypeToString(state.quantity)}
                onSelected={onFirstSelectionChanged}
            />
            <div className='py-2'/>
            <DropDown
                title={state.secondSelectionTitle}
                options={state.secondOptions}
                selectedValue={state.secondSelection}
                onSelected={onSecondSelectionChanged}
            />
            <div className='py-2'/>
            {showThirdSelection ?
                <DropDown
                    title={state.thirdSelectionTitle}
                    options={state.thirdOptions}
                    selectedValue={state.thirdSelection}
                    onSelected={onThirdSelectionChanged}
                /> : null}
        </>
    )
}

function DropDown(props: any) {
    return (
        <div>
            <h5>{props.title}</h5>
            <DropdownButton
                onSelect={props.onSelected}
                title={props.selectedValue}
                id="dropdown-button-dark"
                variant="dark"
                menuVariant="dark"
                className="mt-2"
            >
                {props.options.map(
                    (option: any) => <Dropdown.Item key={option} eventKey={option}>{option}</Dropdown.Item>
                )}
            </DropdownButton>
        </div>
    );
}

