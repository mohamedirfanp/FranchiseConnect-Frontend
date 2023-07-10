import React, { useEffect, useState } from 'react';

import { Sidebar } from 'primereact/sidebar';



import MainFilterComponent from '../../../components/Filters/FilterComponent';
import CardComponent from '../../../components/CardComponent/CardComponent';
import FranchiseeLayout from '../../../Layout/FranchiseeLayout';

import { GetFranchises } from '../../../api/Franchisee/FranchiseApi';
import CardSkeletonComponent from '../../../components/CardComponent/CardSkeletonComponent';
import SupportPage from '../../SupportPage/SupportPage';
import { Button } from 'primereact/button';

function HomePage() {


  const [visible, setVisible] = useState(false);
  const [franchises, setFranchises] = useState([]);
  const [franchisesCopy, setCopyFranchises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetFranchises()
      .then((response) => {

        // [DEV] 
        setTimeout(() => {
          setLoading(false);
          setFranchises(response.data.franchiseLists);
          setCopyFranchises(response.data.franchiseLists);

        }, 1000)
      })
      .catch((error) => {
        console.error(error);
      })
  }, [])





  return (
    <FranchiseeLayout className='h-full'>

      <div className='hidden md:block'>

        <MainFilterComponent franchises={franchises} setCopyFranchises={setCopyFranchises} />
      </div>
      <div className='relative'>
      <Sidebar visible={visible} onHide={() => setVisible(false)}>
        <h2 className='text-center font-bold text-2xl'>Filter</h2>
        <MainFilterComponent franchises={franchises} setCopyFranchises={setCopyFranchises} />
    </Sidebar>
        <div className='fixed top-20 right-1 md:hidden z-30'>
          <Button icon="pi pi-filter" onClick={() => {
            setVisible(true);
          }} />
        </div>

      </div>

      {loading && (
        <div className='w-full max-h-full overflow-auto flex flex-wrap items-start gap-2'>
          <CardSkeletonComponent />
          <CardSkeletonComponent />
          <CardSkeletonComponent />
          <CardSkeletonComponent />
        </div>
      )}

      {!loading && (
        <>

          <div className='w-full h-[95%] overflow-auto grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 items-start gap-2 '>
            {franchisesCopy.map((franchiseDetail, index) => {
              return <CardComponent key={index} franchiseDetail={franchiseDetail} />;
            })}
          </div>
        </>
      )}
      {/* Support */}

      <div className='relative'>

        <SupportPage />
      </div>
    </FranchiseeLayout>
  );

}

export default HomePage 
