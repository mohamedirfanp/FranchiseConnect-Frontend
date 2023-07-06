import React, { useEffect, useLayoutEffect, useState } from 'react';
import FranchisorLayout from '../../../Layout/FranchisorLayout';


import { FranchiseExists } from "../../../api/Franchisor/franchiseApi";
import { getFranchiseeExist, setFranchiseExist } from "../../../constants/LocalStorage";

import CreateFranchiseComponent from '../../../components/CreateFranchiseComponent/CreateFranchiseComponent';
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
  
    useLayoutEffect(() => {
      getFranchiseData();
    }, [])
  
    


  return (
    <>
    <FranchisorLayout>
      {
        franchiseExists ? <>Request Page</>: <CreateFranchiseComponent />
      }
    </FranchisorLayout>
  </>
  )
}

export default RequestPage