import {Dropdown} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton'
import { DataService, EnergyService } from '../data/energy_service';

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

export enum QuantityType {
    actualTotalLoad, generationPerType, crossBorderFlows   
}

const quantityTypesLabels = [
    'Actual total load',
    'Generation per type',
    'Cross border flows'
];

function quantityTypeToString(type: QuantityType): string {
    if (type == QuantityType.actualTotalLoad) return quantityTypesLabels[0];
    if (type == QuantityType.generationPerType) return quantityTypesLabels[1];
    if (type == QuantityType.crossBorderFlows) return quantityTypesLabels[2];
    return 'could not map quantity type';
}

function mapStringToQuantityType(text: string): QuantityType {
    if (text === quantityTypesLabels[0]) return QuantityType.actualTotalLoad;
    if (text === quantityTypesLabels[1]) return QuantityType.generationPerType;
    if (text === quantityTypesLabels[2]) return QuantityType.crossBorderFlows;
    return QuantityType.actualTotalLoad;
}

export type DropDownGroupProps = {
    onChange: (state: DropDownChangeListener) => void;
};
export default function DropDownGroup(props: DropDownGroupProps) {
    const service: EnergyService = new DataService();

    const defaultOption = 'Select option';
    const initialState : DropDownGroupState = {
        quantity: QuantityType.actualTotalLoad,
        secondSelection: defaultOption,
        thirdSelection: defaultOption,
        secondOptions: [],
        thirdOptions: [],
        secondSelectionTitle: 'Country',
        thirdSelectionTitle: '', 
    }
    const [state, setState] = useState(initialState); 

    // this hook will get called everytime when state has changed
    useEffect(() => {
        // console.log('Updated State', state);
        props.onChange(state);
    }, [state]);

    useEffect(() => {
        const setOptions = async () => {
            switch (state.quantity) {
                case QuantityType.actualTotalLoad:
                    setState({
                        ...state,
                        secondSelectionTitle: 'Country',
                        thirdSelectionTitle: '',
                        secondOptions: await service.fetchCountries()
                    });
                    break;
                case QuantityType.generationPerType:
                    setState({
                        ...state,
                        secondSelectionTitle: 'Country',
                        thirdSelectionTitle: 'Generation type',
                        secondOptions: await service.fetchCountries(),
                        thirdOptions: await service.fetchGenerationPerTypeOptions()
                    });
                    break;
                case QuantityType.crossBorderFlows:
                    setState({
                        ...state,
                        secondSelectionTitle: 'Country(from)',
                        thirdSelectionTitle: 'Country(to)',
                        secondOptions: await service.fetchCountries(),
                        thirdOptions: await service.fetchCountries()
                    });
                    break;
            }
        }

        setOptions();
    }, [state.quantity]);

    const showThirdSelection = state.quantity !== QuantityType.actualTotalLoad;

    return (
        <>
            <DropDown
                title='Quantity'
                options={quantityTypesLabels}
                selectedValue={quantityTypeToString(state.quantity)}
                onSelected={(selection: string) => {
                    setState({...state, quantity: mapStringToQuantityType(selection)});
                }}
            />
            <div className='py-2'/>
            <DropDown
                title={state.secondSelectionTitle}
                options={state.secondOptions}
                selectedValue={state.secondSelection}
                onSelected={(selection: string) => {
                    setState({...state, secondSelection: selection});
                }}
            />
            <div className='py-2'/>
            {showThirdSelection ?
            <DropDown
                title={state.thirdSelectionTitle}
                options={state.thirdOptions}
                selectedValue={state.thirdSelection}
                onSelected={(selection: string) => {
                    setState({...state, thirdSelection: selection});
                }}
            /> : null }
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

