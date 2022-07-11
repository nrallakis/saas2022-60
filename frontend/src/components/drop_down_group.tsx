import {Dropdown} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton'

export interface DropDownGroupState {
    quantity: String;
    secondSelection: String;
    thirdSelection: String;
}

export type DropDownGroupProps = {
    onChange: (state: DropDownGroupState) => void;
};
export default function DropDownGroup(props: DropDownGroupProps) {
    const actualTotalLoad = 'Actual total load';
    const generationPerType = 'Generation per type';
    const crossBorderFlows = 'Cross border flows';

    const defaultOption = 'Select option';
    const initialState : DropDownGroupState = {
        quantity: actualTotalLoad,
        secondSelection: defaultOption,
        thirdSelection: defaultOption,
    }
    const [state, setState] = useState(initialState);


    // this hook will get called everytime when state has changed
    useEffect(() => {
        console.log('Updated State', state);
        props.onChange(state);
    }, [state]);


    var firstSelectionTitle = 'Quantity';
    var secondSelectionTitle = 'Country';
    var thirdSelectionTitle = '';
    switch (state.quantity) {
        case actualTotalLoad:
            secondSelectionTitle = 'Country';
            break;
        case generationPerType:
            secondSelectionTitle = 'Country';
            thirdSelectionTitle = 'Generation type';
            break;
        case crossBorderFlows:
            secondSelectionTitle = 'Country(from)';
            thirdSelectionTitle = 'Country(to)';
            break;
    }

    const firstSelectionOptions = ['Actual total load', 'Generation per type', 'Cross border flaws'];

    const showThirdSelection = state.quantity !== actualTotalLoad;

    return (
        <>
            <DropDown
                title={firstSelectionTitle}
                options={firstSelectionOptions}
                selectedValue={state.quantity}
                onSelected={(selection: String) => {
                    setState({...state, quantity: selection});
                }}
            />
            <div className='py-2'/>
            <DropDown
                title={secondSelectionTitle}
                options={['Greece', 'Cyprus', 'Germany']}
                selectedValue={state.secondSelection}
                onSelected={(selection: String) => {
                    setState({...state, secondSelection: selection});
                }}
            />
            <div className='py-2'/>
            {showThirdSelection ?
            <DropDown
                title={thirdSelectionTitle}
                options={['Natural gas', 'Petrol']}
                selectedValue={state.thirdSelection}
                onSelected={(selection: String) => {
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

