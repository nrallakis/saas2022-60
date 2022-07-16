import Header from "../components/header";
import DropDownGroup, {DropDownChangeListener, QuantityType} from "../components/drop_down_group";
import {useEffect, useState} from "react";
import {Points} from "../data/point";
import {DataService, EnergyService} from "../data/energy_service";
import {Button} from "react-bootstrap";
import {Chart} from "../components/chart";
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

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
        dateFrom: null,
        dateTo: null,
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
        if (quantity == QuantityType.actualTotalLoad) {
            let country = state.dropDownSelections?.secondSelection!;
            setState({
                ...state,
                data: await service.fetchActualTotalLoad(country, dateStart, dateEnd)
            });
        } else if (quantity == QuantityType.generationPerType) {
            let country = state.dropDownSelections?.secondSelection!;
            const generationType = state.dropDownSelections?.thirdSelection!;
            setState({
                ...state,
                data: await service.fetchGenerationPerType(country, generationType, dateStart, dateEnd)
            });
        } else if (quantity == QuantityType.crossBorderFlows) {
            const countryFrom = state.dropDownSelections?.secondSelection!;
            const countryTo = state.dropDownSelections?.thirdSelection!;
            setState({
                ...state,
                data: await service.fetchCrossBorderFlows(countryFrom, countryTo, dateStart, dateEnd)
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
                        <DateRangePicker onChange={onDateChange} format="dd-MM-y" value={[state.dateFrom ?? new Date(), state.dateTo ?? new Date()]} />
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