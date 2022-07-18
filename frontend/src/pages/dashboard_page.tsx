import Header from "../components/header";
import DropDownGroup, {DropDownChangeListener, QuantityType} from "../components/drop_down_group";
import {useEffect, useState} from "react";
import {Points} from "../data/point";
import {DataService, EnergyService} from "../data/energy_service";
import {Button} from "react-bootstrap";
import {Chart} from "../components/chart";
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import {mapCountryToCode} from "../countries";

interface DashboardState {
    loading: Boolean;
    data?: Points | null;
    dateFrom?: Date | null;
    dateTo?: Date | null;
    dropDownSelections?: DropDownChangeListener | null;
}

function DashboardPage() {
    let service: EnergyService = new DataService();

    //TODO: connect to websocket to listen to updates
    //TODO: onDataUpdate(): if data == the same with the filtered, refresh

    // Component did mount
    useEffect(() => {}, []);

    const initialState : DashboardState = {
        data: [[1,1], [1,2], [2,3]],
        dateFrom: new Date(),
        dateTo: new Date(),
        dropDownSelections: null,
        loading: false
    }
    const [state, setState] = useState(initialState);

    useEffect(() => {
        console.log(state);
    }, [state]);

    function onDateChange(dates: any) {
        let [start, end] = dates;
        setState({
            ...state,
            dateFrom: start,
            dateTo: end,
        })
        console.log(start);
        console.log(end);
    }

    function onDropDownChange(dropDownSelections: DropDownChangeListener) {
        setState({
            ...state,
            dropDownSelections: dropDownSelections
        });
    }

    async function onFilterClicked(): Promise<void> {
        //setState({...state, loading: true});
        const quantity = state.dropDownSelections?.quantity;
        const dateStart = state.dateFrom!;
        const dateEnd = state.dateTo!;
        console.log(dateStart);
        if (quantity === QuantityType.actualTotalLoad) {
            let country = state.dropDownSelections?.secondSelection!;
            let countryCode = mapCountryToCode(country);
            console.log(dateStart);
            setState({
                ...state,
                data: await service.fetchActualTotalLoad(countryCode, dateStart, dateEnd)
            });
        } else if (quantity === QuantityType.generationPerType) {
            let country = state.dropDownSelections?.secondSelection!;
            let countryCode = mapCountryToCode(country);
            const generationType = state.dropDownSelections?.thirdSelection!;
            setState({
                ...state,
                data: await service.fetchGenerationPerType(countryCode, generationType, dateStart, dateEnd)
            });
        } else if (quantity === QuantityType.crossBorderFlows) {
            const countryFrom = state.dropDownSelections?.secondSelection!;
            let countryCodeFrom = mapCountryToCode(countryFrom);
            const countryTo = state.dropDownSelections?.thirdSelection!;
            let countryCodeTo = mapCountryToCode(countryTo);
            setState({
                ...state,
                data: await service.fetchCrossBorderFlows(countryCodeFrom, countryCodeTo, dateStart, dateEnd)
            });
        }
        //setState({...state, loading: false});
    }

    return (
        <>
            <Header/>
            <div className="container pt-4">
                <div className="row">
                    <div className="col-4" >
                        <h5>Date range</h5>
                        <DateRangePicker onChange={onDateChange} format="dd-MM-y" value={[state.dateFrom!, state.dateTo!]} />
                        <div className="pt-3" />
                        <DropDownGroup onChange={onDropDownChange} />
                        <div className="pt-3" />
                        <Button onClick={onFilterClicked}>Filter</Button>
                    </div>
                    <div className="col-8" >
                        <Chart data={state.data!} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default DashboardPage;