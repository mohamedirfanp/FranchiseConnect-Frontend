import React, { useLayoutEffect, useState } from 'react';

import AdminLayout from '../../Layout/AdminLayout';

import {GetProfileCount} from '../../api/AdminApi/adminApi'

import ProfileCountChart from './ProfileCountChart';

import { GetTicketForAdmin, CloseTicket } from '../../api/AdminApi/adminApi'
import QueryCountChart from './QueryCountChart';
import QueryStatLineChart from './QueryStatLineChart';
import NotificationCard from './NotificationCard';

function AdminDashboard() {

  const [profileCount,setProfileCount] = useState(null);

  const [queries, setQueries] = useState(null);

  const getAllTickets = async () => {
    try {

        const response = await GetTicketForAdmin();
        if (!response)
            return;


        setQueries(response.data.tickets);


    } catch (error) {
        console.log(error);
    }
}

 
  const getProfileCount = async () => {
    try{
      let response  = await GetProfileCount();
      setProfileCount(response.data);
    }
    catch(error)
    {
      console.error(error);
    }
  }

  useLayoutEffect(() => {
    getProfileCount()
    getAllTickets();

  }, []);


  return (
    <>
    <AdminLayout>

    <section className='w-screen '>
              <article className='flex justify-center items-center'>
                <section className='grid grid-cols-2'>
                  <div className='flex flex-col'>
                    <div className='flex flex-col md:flex-row'>
                  {profileCount !== null && <ProfileCountChart profileCount={profileCount}/>}
                  {queries !== null && <QueryCountChart queries={queries} /> }

                    </div>
                    <div className='m-5'>
                  {queries !== null && <QueryStatLineChart queries={queries} />}
                  </div>
                  </div>
                  <div>
                    {queries !== null &&
                    <NotificationCard queriesData={queries} />
                    }
                  </div>
     

                  
                </section>
              </article>
            </section>

    </AdminLayout>
    </>
  )
}

export default AdminDashboard