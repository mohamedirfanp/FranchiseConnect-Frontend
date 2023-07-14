import { Chart } from 'primereact/chart';
import React, { useEffect, useState } from 'react'

function QueryCountChart({queries}) {


    const [chartData, setChartData] = useState(null);

    const [queryStatusCount, setQueryStatusCount] = useState(null)


    const getQueryStatus = (data) => {

        let counts = {
          Open: 0,
          Closed: 0
        };
      
        // Iterate over the QueryStatus objects
        for (const obj of Object.values(data)) {
          const status  = obj.status;

          if (status === true) {
            counts.Open++;
          } 
          else
          {
            counts.Closed++;
          }
        }
      
        return counts;
      };

    const initialChartData = (responseData) => {
        const documentStyle = getComputedStyle(document.documentElement);
        const data = {
            labels: ['Open', 'Closed'],
            datasets: [
                {
                    // DEV : REMOVE DATA IN PROD
                    data: [responseData.Open, responseData.Closed],
                    // PROD : DATA IN PROD
                    // data: [profileCount.userCount, profileCount.franchisorCount],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--green-500'),
                        documentStyle.getPropertyValue('--red-500'), 
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--green-400'),
                        documentStyle.getPropertyValue('--red-400'), 
                    ]
                }
            ]
        };
        return data;
      }

    useEffect(() => {

        const responseData = getQueryStatus(queries);
        setQueryStatusCount(responseData);

        const response = initialChartData(responseData);
        setChartData(response);
    }, [])


  return (
    <div className='m-2'>
    <h1 className='text-center text-lg font-bold'>Query Status Count</h1>
   <Chart type="doughnut" data={chartData} options={{cutout : '50%'}} className="w-full" />
   {/* {chartData !== null && (
      <Doughnut  data={chartData} options={{ cutout: '60%' }} />
    )} */}
   
  </div>
  )
}

export default QueryCountChart