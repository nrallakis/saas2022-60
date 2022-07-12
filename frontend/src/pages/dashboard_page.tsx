import Header from "../components/header";
import DatePicker from "../components/DatePicker";
import DropDownGroup, {DropDownGroupState} from "../components/drop_down_group";
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
    dropDownSelections?: DropDownGroupState | null;
}

function DashboardPage() {
    let service: EnergyService = new MockDataService();

    // Component did mount
    useEffect(() => {
    }, []);

    const initialState : DashboardState = {
        data: [],
        dateFrom: null,
        dateTo: null,
        dropDownSelections: null,
        loading: false
    }
    const [state, setState] = useState(initialState);

    function onDropDownChange(state: DropDownGroupState) {

    }

    function onFilterClicked() {
        setState({...state, loading: true});
        //Do api call and set state with the new data
        setState({...state, loading: false});
    }

    return (
        <>
            <Header/>
            <div className="container pt-4">
                <div className="row">
                    <div className="col" >
                        <DatePicker />
                        <DropDownGroup onChange={onDropDownChange} />
                        <div className="pt-3" />
                        <Button onClick={onFilterClicked}>Filter</Button>
                    </div>
                    <div className="col" >
                        <Chart />
                    </div>
                </div>

            </div>
        </>
    );
}

export default DashboardPage;