import React, { useRef, useState, useEffect } from 'react';
import FranchiseeLayout from '../../../Layout/FranchiseeLayout';
import { GetWishlist, RemoveWishlist } from '../../../api/Franchisee/FranchiseApi';
import { Card } from 'primereact/card';
import ButtonComponent from '../../../components/ButtonComponent/ButtonComponent';
import { useNavigate } from 'react-router';
import ToastMessage from '../../../components/ToastComponent/Toast';


import { removeWishlist } from '../../../constants/SessionStorage'

import { Toast } from 'primereact/toast'
import SupportPage from '../../SupportPage/SupportPage';

function WishlistPage() {
  const [favourites, setFavourites] = useState([]);
  const navigate = useNavigate();
  const toast = useRef(null);

  const getWishlist = () => {
    GetWishlist()
      .then((response) => {
        const wishlist = response.data.userWishlistResponse;
        setFavourites(wishlist);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getWishlist();
  }, []);

  const handleDelete = async (data) => {
    try {
      const response = await RemoveWishlist(data.wishlistId);
      if (!response) return;
      ToastMessage(true, response.data.value.response, toast);
      setFavourites((prevFavourites) => prevFavourites.filter((favourite) => favourite.wishlistId !== data.wishlistId));
      removeWishlist(`${data.franchiseId}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <FranchiseeLayout>
        {!favourites.length && <div className='w-full flex justify-center items-center'>No Favourites</div>}
        {favourites.length && (
          <div className='flex w-full flex-col'>
            <h1 className='text-3xl font-bold mb-4 text-center'>My Favourites</h1>
            <section className='flex flex-col gap-5 m-5 justify-center items-center'>
              {favourites.map((favourite, index) => (
                <Card className='w-2/3' header={
                  <div className='flex flex-col gap-3 mx-6 mt-6'>
                    <span className='text-2xl font-extrabold'>{favourite.franchise.franchiseName}</span>
                    <span className='-mt-4 text-lg font-light'>{favourite.franchise.franchiseIndustry}</span>
                  </div>
                } key={index}>
                  <div className='flex flex-col gap-4'>
                    <div className='flex flex-grow -mt-4'>
                      <div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
                        <span>
                          <p className='font-bold'>Investment Range</p>
                          <p>Rs. {favourite.franchise.franchiseInvestment}</p>
                        </span>
                        <span>
                          <p className='font-bold'>Space Req.</p>
                          <p>{favourite.franchise.franchiseSpace} Sq.ft</p>
                        </span>
                        <span>
                          <p className='font-bold'>Franchise Outlets</p>
                          <p>{favourite.franchise.franchiseCurrentCount}</p>
                        </span>
                        <span>
                          <p className='font-bold'>View Count</p>
                          <p className='flex items-center gap-1'>
                            {favourite.franchise.franchiseViewCount} <i className='pi pi-eye'></i>
                          </p>
                        </span>
                      </div>
                      <div className='h-full flex justify-center items-center'>
                        <span className='hover:cursor-pointer h-full'>
                          <i onClick={() => handleDelete({
                            franchiseId : favourite.franchise.franchiseId,
                            wishlistId : favourite.wishlistId
                          }
                            )} className='pi pi-trash' style={{ color: 'red' }}></i>
                        </span>
                      </div>
                    </div>
                    <div className='flex'>
                      <ButtonComponent text='Go to Page' onClick={() => navigate('/franchisee/franchise/' + favourite.franchise.franchiseId)}></ButtonComponent>
                    </div>
                  </div>
                </Card>
              ))}
            </section>
          </div>
        )}
        {/* Support */}

        <div className='relative'>

          <SupportPage />
        </div>
      </FranchiseeLayout>
    </>
  );
}

export default WishlistPage;
