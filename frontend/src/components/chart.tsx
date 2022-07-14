import React, { Component, useState } from 'react';
import { render } from 'react-dom';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { Points } from '../data/point';

export interface ChartProps {
    data: Points;
}
export function Chart(props: ChartProps) {
    const initialState = {
        chart: {
            zoomType: 'x'
        },
        subtitle: {
            text: 'Using the Boost module'
        },
        accessibility: {
            screenReaderSection: {
                beforeChartFormat: '<{headingTagName}>{chartTitle}</{headingTagName}><div>{chartSubtitle}</div><div>{chartLongdesc}</div><div>{xAxisDescription}</div><div>{yAxisDescription}</div>'
            }
        },
        tooltip: {
            valueDecimals: 2
        },
        chartOptions: {
            xAxis: {
                type: 'datetime'
            },
            series: [{
                data: props.data,
                lineWidth: 0.5,     
            }],
        },
        hoverData: null
    };

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={initialState.chartOptions}
        />
    );
}