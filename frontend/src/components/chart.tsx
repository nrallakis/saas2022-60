import React, { Component, useState } from 'react';
import { render } from 'react-dom';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { Points } from '../data/point';

export interface ChartProps {
    data: Points;
}
function Chart(props: ChartProps) {
    const initialState = {
        chartOptions: {
            xAxis: {
                categories: ['A', 'B', 'C'],
            },
            series: [
                { data: props.data }
            ],
        },
        hoverData: null
    };

    const [state, setState] = useState(initialState);
    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={state.chartOptions}
        />
    );
}

// class Chart extends React.Component<any, any> {
//     constructor(data: number[][]) {
//         super(data);

//         this.state = {
//             // To avoid unnecessary update keep all options in the state.
//             chartOptions: {
//                 xAxis: {
//                     categories: ['A', 'B', 'C'],
//                 },
//                 series: [
//                     { data: [[1,2], [3,2], [4,3]] }
//                 ],
//                 plotOptions: {
//                     series: {
//                         point: {
//                             events: {
//                                 mouseOver: this.setHoverData.bind(this)
//                             }
//                         }
//                     }
//                 }
//             },
//             hoverData: null
//         };
//     }

//     setHoverData = (e: any) => {
//         // The chart is not updated because `chartOptions` has not changed.
//         this.setState({ hoverData: e.target.category })
//     }

//     updateSeries = (data: number[]) => {
//         // The chart is updated only with new options.
//         this.setState({
//             chartOptions: {
//                 series: [
//                     { data: data }
//                 ]
//             }
//         });
//     }

//     render() {
//         const { chartOptions, hoverData } = this.state;

//         return (
//             <>
//                 <HighchartsReact
//                     highcharts={Highcharts}
//                     options={chartOptions}
//                 />
//                 {/*<h3>Hovering over {hoverData}</h3>*/}
//                 {/*<button onClick={this.updateSeries.bind(this)}>Update Series</button>*/}
//             </>
//         )
//     }
// }

export { Chart }
