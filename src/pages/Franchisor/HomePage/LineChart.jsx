import React, { useEffect, useState } from 'react'

import { Chart } from 'primereact/chart';


function LineChart({ franchiseRequestList }) {
  const [chartData, setChartData] = useState({});
  const [groupByDayData, setGroupByDayData] = useState({});

  const initialChart = () => {
    const documentStyle = getComputedStyle(document.documentElement);

    const data = {
        // DEV - change to Prod
        labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturaday'],
        // PROD
        // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Request Count',
                // DEV
                data: [65, 59, 80, 81, 56, 55, 40],
                // PROD
                //data: [groupByDayData.Sunday, groupByDayData.Monday, groupByDayData.Tuesday, groupByDayData.Wednesday, groupByDayData.Thursday, groupByDayData.Friday, groupByDayData.Saturaday],
                fill: false,
                borderColor: documentStyle.getPropertyValue('--blue-500'),
                tension: 0.4
            },
        ]
    };

    setChartData(data);

  }



  const groupByDay = () => {
    const groupedByDay = {};
    franchiseRequestList.forEach(franchiseRequestData => {
      const createdAt = franchiseRequestData.franchiseRequest.createdAt;
      const date = new Date(createdAt.seconds * 1000); // Convert seconds to milliseconds
    
      // Get the day of the week
      const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
    
      // Increment the count for the corresponding day of the week
      if (groupedByDay[dayOfWeek]) {
        groupedByDay[dayOfWeek]++;
      } else {
        groupedByDay[dayOfWeek] = 1;
      }
    });

    return groupedByDay;
  }

  useEffect(() => {
    initialChart();
    const response = groupByDay();

    setGroupByDayData(response);

  }, [])

  return (
    <div className="m-5 sm:bg-slate-00">
        <h1 className='text-center font-semibold text-xl'>Request Stats</h1>
            <Chart type="line" data={chartData}  className='w-full' />
        </div>
  )
}

export default LineChart