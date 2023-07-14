import React, { useEffect, useLayoutEffect, useState } from 'react';

import FranchisorLayout from '../../../Layout/FranchisorLayout';
import { FranchiseExists, GetAllRequests } from "../../../api/Franchisor/franchiseApi";
import { getFranchiseeExist, setFranchiseExist } from "../../../constants/LocalStorage";

import CreateFranchiseComponent from '../../../components/CreateFranchiseComponent/CreateFranchiseComponent';
import AboutCard from './AboutCard';
import DoughnutChart from './DoughnutChart';
import NotificationCard from './NotificationCard';
import LineChart from './LineChart';
import SupportPage from '../../SupportPage/SupportPage';



function Dashboard() {
  const [franchiseExists, setFranchiseExists] = useState(false);
  const [franchiseData, setFranchiseData] = useState([]);

  const getFranchiseData = async () => {
    const franchiseStatus = getFranchiseeExist();
    if (franchiseStatus === 'true') {
      setFranchiseExists(true);
      return;
    }
    try {
      const response = await FranchiseExists();
      if (!response.data) return;
      setFranchiseExists(response.data.franchiseExist);
      setFranchiseExist(response.data.franchiseExist);
    }
    catch (err) {
      console.error(err)
    }
  }

  const getData = async () => {
    // Get data for dashboard
    const response = await GetAllRequests();
    if (!response.data)
      return
    setFranchiseData([...(response.data.responses)]);
    console.log(response.data.responses)
  }

  useLayoutEffect(() => {
    getFranchiseData();
    getData();
  }, [])


  return (
    <>
      <FranchisorLayout>
        {
          franchiseExists ? <>
            <section className='w-screen h-screen'>
              <article className='flex justify-center items-center'>
                <section className='grid grid-cols-1 sm:grid-cols-2'>
                  {
                    franchiseData[0] !== undefined && <>
                      <AboutCard franchise={franchiseData[0]} />
                      <DoughnutChart franchiseRequestList={franchiseData} />
                      <NotificationCard />
                      <LineChart franchiseRequestList={franchiseData} />
                    </>
                  }
                  

                </section>
              </article>
            </section>

          </> : <CreateFranchiseComponent />
        }
        {/* Support */}

        <div className='relative'>

          <SupportPage />
        </div>
      </FranchisorLayout>
    </>
  )
}

export default Dashboard;