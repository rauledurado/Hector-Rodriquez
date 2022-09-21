import React,{useMemo} from "react";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Chart } from 'react-charts'
 
const Charts = ({ forcast3Days ,weaklyforcast}) => {
  const time = forcast3Days.time;
  const temperaturemax = forcast3Days.temperature_2m_max;
  const temperaturemin=forcast3Days.temperature_2m_min;
  const dataForChart = [];
  for(let i=0; i<time.length ;i++){
    dataForChart.push((temperaturemax[i] + temperaturemin[i])/2)
  }
  const options = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Forcast Chart'
    }, xAxis: {
      categories:time,
      crosshair: true
    },
    yAxis: {
      title: {
        useHTML: true,
        text: 'Temperature in celsius'
      }
    },
    series: [{ data:dataForChart}]
  }
  return (
   
    <div className="chartscontainer">
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  </div>
  );
};
export default Charts;
