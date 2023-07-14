import { Chart } from 'primereact/chart';
import React, { useEffect, useState } from 'react'

function QueryStatLineChart({queries}) {

    const [chartData, setChartData] = useState(null)

    const groupByDay = () => {
        const groupedByDay = {};
        queries.forEach(query => {
          const createdAt = query.createdAt;
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

      const initialChart = (groupByDayData) => {
        const documentStyle = getComputedStyle(document.documentElement);
    
        const data = {
            // DEV - change to Prod
            labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturaday'],
            // PROD
            // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Query Count',
                    // DEV
                    // data: [65, 59, 80, 81, 56, 55, 40],
                    // PROD
                    data: [groupByDayData.Sunday, groupByDayData.Monday, groupByDayData.Tuesday, groupByDayData.Wednesday, groupByDayData.Thursday, groupByDayData.Friday, groupByDayData.Saturaday],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    tension: 0.4
                },
            ]
        };
    
        setChartData(data);
    
      }

    useEffect(() => {
        const response = groupByDay();
        initialChart(response); 
    }, [])

  return (
    <div>
      <h1 className='font-lg text-xl'>Query Count</h1>
       <Chart type="line" data={chartData} className='h-full' />
    </div>
  )
}

export default QueryStatLineChart
