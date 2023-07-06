import React, { useEffect, useState } from 'react';
import MainFilterComponent from '../../../components/Filters/FilterComponent';
import CardComponent from '../../../components/CardComponent/CardComponent';
import FranchiseeLayout from '../../../Layout/FranchiseeLayout';

import { GetFranchises } from '../../../api/Franchisee/FranchiseApi';
import CardSkeletonComponent from '../../../components/CardComponent/CardSkeletonComponent';

function HomePage() {

    const [franchises, setFranchises] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        GetFranchises()
        .then((response) => {
            
            // [DEV] 
            setTimeout(()=>{
                setLoading(false);
                setFranchises(response.data.franchiseLists);

            },3000)
        })
        .catch((error) => {
            console.error(error);
        })
    },[])



    return (
        <FranchiseeLayout>
          <MainFilterComponent franchises={franchises} />
      
          {loading && (
            <div className='w-full max-h-full overflow-auto flex flex-wrap items-start gap-2'>
              <CardSkeletonComponent />
              <CardSkeletonComponent />
              <CardSkeletonComponent />
              <CardSkeletonComponent />
            </div>
          )}
      
          {!loading && (
            <div className='w-full max-h-full overflow-auto flex flex-wrap items-start gap-2'>
      
              {franchises.map((franchiseDetail, index) => {
                return <CardComponent key={index} franchiseDetail={franchiseDetail} />;
              })}
            </div>
          )}
        </FranchiseeLayout>
      );
      
}

export default HomePage 
