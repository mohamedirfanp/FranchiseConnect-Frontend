import React, { useEffect, useState } from 'react';

import { Chart } from 'primereact/chart';

function ProfileCountChart({profileCount}) {

    const [chartData, setChartData] = useState(null);

    const initialChartData = () => {
        const documentStyle = getComputedStyle(document.documentElement);
        const data = {
            labels: ['User', 'Franchisor'],
            datasets: [
                {
                    // DEV : REMOVE DATA IN PROD
                    data: [profileCount.userCount, profileCount.franchisorCount],
                    // PROD : DATA IN PROD
                    // data: [profileCount.userCount, profileCount.franchisorCount],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--green-500'),
                        documentStyle.getPropertyValue('--blue-500'), 
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--green-400'),
                        documentStyle.getPropertyValue('--blue-400'), 
                    ]
                }
            ]
        };
        return data;
      }

    useEffect(() => {
        const response = initialChartData();
        setChartData(response);
    }, [])

  return (
       <div className='m-2'>
          <h1 className='text-center text-lg font-bold'>Current Consumer Count</h1>
         <Chart type="doughnut" data={chartData} options={{cutout : '50%'}} className="w-full" />
         {/* {chartData !== null && (
            <Doughnut  data={chartData} options={{ cutout: '60%' }} />
          )} */}
         
        </div>

  )
}

export default ProfileCountChart
