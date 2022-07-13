import Header from "../components/header";
import DatePicker from "../components/date_picker";
import DropDownGroup, {DropDownChangeListener, QuantityType} from "../components/drop_down_group";
import {useEffect, useState} from "react";
import {Points} from "../data/point";
import {EnergyService, MockDataService} from "../data/energy_service";
import {Button} from "react-bootstrap";
import {Chart} from "../components/chart";

interface DashboardState {
    loading: Boolean;
    data?: Points | null;
    dateFrom?: Date | null;
    dateTo?: Date | null;
    dropDownSelections?: DropDownChangeListener | null;
}

function DashboardPage() {
    let service: EnergyService = new MockDataService();

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

    function onDateChange(dateFrom: Date, dateTo?: Date) {
        dateTo ??= new Date();
        setState({
            ...state,
            dateFrom: dateFrom,
            dateTo: dateTo,
        })
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
        switch (quantity) {
            case QuantityType.actualTotalLoad:
                var country = state.dropDownSelections?.secondSelection!;
                setState({
                    ...state,
                    data: await service.fetchActualTotalLoad(country, dateStart, dateEnd)
                });
                break;
            case QuantityType.generationPerType:
                country = state.dropDownSelections?.secondSelection!;
                const generationType = state.dropDownSelections?.thirdSelection!;
                setState({
                    ...state,
                    data: await service.fetchGenerationPerType(country, generationType, dateStart, dateEnd)
                });
                break;
            case QuantityType.crossBorderFlows:
                const countryFrom = state.dropDownSelections?.secondSelection!;
                const countryTo = state.dropDownSelections?.thirdSelection!;
                setState({
                    ...state,
                    data: await service.fetchCrossBorderFlows(countryFrom, countryTo, dateStart, dateEnd)
                });
                break;
        }
        //setState({...state, loading: false});
    }

    return (
        <>
            <Header/>
            <div className="container pt-4">
                <div className="row">
                    <div className="col" >
                        <DatePicker onChange={onDateChange}/>
                        <DropDownGroup onChange={onDropDownChange} />
                        <div className="pt-3" />
                        <Button onClick={onFilterClicked}>Filter</Button>
                    </div>
                    <div className="col" >
                        <Chart data={state.data!} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default DashboardPage;