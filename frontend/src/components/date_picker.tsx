import React, {useState} from "react";
// import Calendar from 'react-calendar'; // https://www.npmjs.com/package/react-calendar
import 'react-calendar/dist/Calendar.css';
import { DateRangePicker, RangeKeyDict } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file


export interface DatePickerProps {
    onChange: (date: Date) => void
}

export default function DatePicker(props: DatePickerProps) {
    const [date, setDate] = useState(new Date());

    function handleSelect(ranges: RangeKeyDict){
        console.log(ranges);
        // {
        //   selection: {
        //     startDate: [native Date Object],
        //     endDate: [native Date Object],
        //   }
        // }
    }

    const onChange = (date: Date) => {
        setDate(date)
    };
    const selectionRange = {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    }
    return (
        <DateRangePicker
            ranges={[selectionRange]}
            onChange={handleSelect}
        />
    );
};