import React, { useState } from "react";
import { render } from "@testing-library/react";
import Calendar from 'react-calendar'; // https://www.npmjs.com/package/react-calendar
import 'react-calendar/dist/Calendar.css';

export default function DatePicker(){
    const [date, setDate] = useState(new Date());

    const onChange = date => {
        setDate(date)
    };
    return(
    <div>
      <Calendar onChange={onChange} value={date} />
    </div>
    );
};