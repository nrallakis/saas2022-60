import Header from "../components/header";
import DropDownGroup, {DropDownChangeListener} from "../components/drop_down_group";
import {useEffect, useState} from "react";
import {Points} from "../data/point";
import {DataService, EnergyService} from "../data/energy_service";
import {Button} from "react-bootstrap";
import {Chart} from "../components/chart";
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import {mapCountryToCode} from "../countries";
import moment from "moment";
import {QuantityType} from "../quantity";
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:3001";

interface DashboardState {
    data?: Points | null;
    dateFrom?: Date | null;
    dateTo?: Date | null;
    dropDownSelections?: DropDownChangeListener | null;
}

function DashboardPage() {
    let service: EnergyService = new DataService();

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on('update', data => {
            console.log(data);
            const quantity = state.dropDownSelections?.quantity;
            let isGenerationPerType = data === 'actual-generation-per-type' && quantity === QuantityType.generationPerType;
            let isActualTotalLoad = data === 'actual-total-load' && quantity === QuantityType.actualTotalLoad;
            let isPhysicalFlows = data === 'physical-flow' && quantity === QuantityType.crossBorderFlows;
            if (isGenerationPerType || isPhysicalFlows || isActualTotalLoad) {
                onFilterClicked();
            }
        });
    }, []);

    const initialState : DashboardState = {
        data: [],
        dateFrom: moment().subtract(2, 'year').toDate(),
        dateTo: new Date(),
        dropDownSelections: null,
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
        });
    }

    function onDropDownChange(dropDownSelections: DropDownChangeListener) {
        setState({...state, dropDownSelections: dropDownSelections});
    }

    async function onFilterClicked(): Promise<void> {
        const quantity = state.dropDownSelections?.quantity;
        const dateStart = state.dateFrom!;
        const dateEnd = state.dateTo!;
        if (quantity === QuantityType.actualTotalLoad) {
            let country = state.dropDownSelections?.secondSelection!;
            let countryCode = mapCountryToCode(country);
            let data = await service.fetchActualTotalLoad(countryCode, dateStart, dateEnd);
            setState({...state, data: data});
        } else if (quantity === QuantityType.generationPerType) {
            let country = state.dropDownSelections?.secondSelection!;
            let generationType = state.dropDownSelections?.thirdSelection!;
            let countryCode = mapCountryToCode(country);
            let data = await service.fetchGenerationPerType(countryCode, generationType, dateStart, dateEnd);
            setState({...state, data: data});
        } else if (quantity === QuantityType.crossBorderFlows) {
            let countryFrom = state.dropDownSelections?.secondSelection!;
            let countryTo = state.dropDownSelections?.thirdSelection!;
            let countryCodeFrom = mapCountryToCode(countryFrom);
            let countryCodeTo = mapCountryToCode(countryTo);
            let data = await service.fetchCrossBorderFlows(countryCodeFrom, countryCodeTo, dateStart, dateEnd);
            setState({...state, data: data});
        }
    }

    return (
        <>
            <Header/>
            <div className="container pt-4">
                <div className="row">
                    <div className="col-4" >
                        <h5>Date range</h5>
                        <DateRangePicker onChange={onDateChange} format="dd/MM/y" value={[state.dateFrom!, state.dateTo!]} />
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