import React, { useEffect, useLayoutEffect, useState } from 'react';

import { Chart } from 'primereact/chart';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import { Doughnut } from "react-chartjs-2";


function DoughnutChart({franchiseRequestList}) {
  
    // ChartJS.register(ArcElement, Tooltip, Legend);
    // Grouping objects by day
    const [requestStatusData, setrequestStatusData] = useState({})
    const [chartData, setChartData] = useState(null);

    const getRequestStatusCounts = (data) => {
        let counts = {
          Pending: 0,
          Accepted: 0,
          Rejected: 0
        };
      
        // Iterate over the franchiseRequest objects
        for (const obj of Object.values(data)) {
          const { isRequestStatus } = obj.franchiseRequest;
      
          // Increment the respective count based on the isRequestStatus value
          if (isRequestStatus === 'Pending') {
            counts.Pending++;
          } else if (isRequestStatus === 'Accepted') {
            counts.Accepted++;
          } else if (isRequestStatus === 'Rejected') {
            counts.Rejected++;
          }
        }
      
        return counts;
      };

      const initialChartData = () => {
        const documentStyle = getComputedStyle(document.documentElement);
        const data = {
            labels: ['Pending', 'Accepted', 'Rejected'],
            datasets: [
                {
                    // DEV : REMOVE DATA IN PROD
                    data: [requestStatusData.Pending+15, requestStatusData.Accepted+40, requestStatusData.Rejected + 20],
                    // PROD : DATA IN PROD
                    // data: [requestStatusData.Pending, requestStatusData.Accepted, requestStatusData.Rejected],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--blue-500'), 
                        documentStyle.getPropertyValue('--green-500'),
                        documentStyle.getPropertyValue('--red-500'), 
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--blue-400'), 
                        documentStyle.getPropertyValue('--green-400'),
                        documentStyle.getPropertyValue('--red-400'), 
                    ]
                }
            ]
        };
        return data;
      }

    useLayoutEffect(() => {

        const response = getRequestStatusCounts(franchiseRequestList);
        setrequestStatusData(response);
        const chartDataResponse = initialChartData();
        setChartData(chartDataResponse);


    }, [])


    return (

       <section className='bg-slate-300 m-5'>
        <h1 className='text-center font-bold text-2xl'>Requests Status</h1>
        <article className='flex justify-center items-center'>

        <div className='m-2'>
         <Chart type="doughnut" data={chartData} options={{cutout : '60%'}} className="w-full" />
         {/* {chartData !== null && (
            <Doughnut  data={chartData} options={{ cutout: '60%' }} />
          )} */}
         
        </div>
        </article>
       </section>
    )
}

export default DoughnutChart