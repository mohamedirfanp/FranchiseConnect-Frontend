import React, {useLayoutEffect, useState} from 'react'


import {getRole, getFranchiseeExist} from '../../constants/LocalStorage';

import {GetFranchise} from '../../api/AccountApi/accountApi';


import FranchiseeLayout from '../../Layout/FranchiseeLayout';
import FranchisorLayout from '../../Layout/FranchisorLayout';
import AccountComponent from './AccountComponent';
import FranchiseComponent from './FranchiseComponent';
import ServiceComponent from './ServiceComponent';
import AccountGalleryComponent from './AccountGalleryComponent';


function AccountPage() {

  
  const [role, setRole] = useState(null);

  const [franchiseData, setFranchiseData] = useState(null)

  const [showFranchise, setShowFranchise] = useState(false);

  const getFranchiseDetail = async () => {
    const franchiseResponse = await GetFranchise();
    if(!franchiseResponse) return;
    console.log(franchiseResponse.data);
    setFranchiseData(franchiseResponse.data);
  }

  useLayoutEffect(() => {
    const currentRole = getRole();
    if (!currentRole){return;}
    setRole(currentRole);
    
    if(currentRole === 'franchisor')
    {
      const franchiseExist =  getFranchiseeExist();
      if(franchiseExist === 'true')
      {
        getFranchiseDetail();
      }
    }

  },[])

  return (
    <>
    {role === 'franchisee' && <FranchiseeLayout>
      <div className='w-screen h-screen'>
      <AccountComponent role={role}/>
      </div>
      </FranchiseeLayout>}
      {role === 'franchisor' && <FranchisorLayout>
      <div className='w-screen h-screen'>

      <AccountComponent role={role} setShowFranchise={setShowFranchise}/>
      {franchiseData && showFranchise &&  <div>
        <h1 className='m-10 text-center font-bold text-4xl'>Franchise Info</h1>

        <div className='w-full flex flex-col gap-5'>

        <FranchiseComponent franchise={franchiseData.franchise} />

        <ServiceComponent franchiseServiceList={franchiseData.frachiseServiceList} />

        <AccountGalleryComponent galleryList={franchiseData.franchiseGalleryList} franchise={franchiseData.franchise} getFranchiseDetail={getFranchiseDetail}/>

        </div>


        </div>}
    
      </div>
      </FranchisorLayout>}
    </>
  );

}

export default AccountPage