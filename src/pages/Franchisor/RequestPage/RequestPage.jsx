import React, { useEffect, useLayoutEffect, useState } from 'react';
import FranchisorLayout from '../../../Layout/FranchisorLayout';


import { FranchiseExists, GetAllPendingRequests } from "../../../api/Franchisor/franchiseApi";
import { getFranchiseeExist, setFranchiseExist } from "../../../constants/LocalStorage";

import CreateFranchiseComponent from '../../../components/CreateFranchiseComponent/CreateFranchiseComponent';
import RequestCard from './RequestCard';


function RequestPage() {

    const [requests, setRequests] = useState([]);
    const [franchiseExists, setFranchiseExists] = useState(false);

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
    
    const getRequestData = async () => {
        try{
            GetAllPendingRequests()
            .then((response) => {
                setRequests(response.data.responses);
            })
            .catch((error) => {
                console.error()
            })

        }
        catch(error)
        {
            console.error(error);
        }
    }

    


    useLayoutEffect(() => {
      getFranchiseData();
      getRequestData();
    }, [])
  
    


  return (
    <>
    <FranchisorLayout>
      {
        franchiseExists ? <>


    <div>
        {
            requests.length ?   <div>
            <h1 className='m-3 text-3xl font-bold'>Requests</h1>
            <section className='flex flex-wrap m-5'>
            {requests.map((request,index) => {
                
               return (<div key={index}>
                   <RequestCard request={request} />
                </div>)
    
            })}
    
            </section>
            </div>
            : <div className='w-screen flex justify-center items-center h-[90%] text-2xl'>No Requests</div>    
        }
      
    </div>

        </>: <CreateFranchiseComponent />
      }
    </FranchisorLayout>
  </>
  )
}

export default RequestPage