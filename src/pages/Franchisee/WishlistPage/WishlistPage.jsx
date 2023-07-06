import React, { useLayoutEffect, useState } from 'react';
import FranchiseeLayout from '../../../Layout/FranchiseeLayout';

import { GetWishlist } from '../../../api/Franchisee/FranchiseApi';

import { Card } from 'primereact/card';

function WishlistPage() {

  const [favourites,setFavourites] = useState([]);

  useLayoutEffect(()=> {

    GetWishlist()
    .then((response) => {
        console.log(response);
        const wishlist = response.data.userWishlistResponse;
        setFavourites(wishlist);
    })
    .catch((error) => {
        console.error(error);
    })

  },[])

  return (
    <>
    <FranchiseeLayout>
        {/* Page content */}
        {/* NEED TO WORK */}
        {!favourites.length && <div className='w-full flex justify-center items-center'>No Favourites</div>}
        {favourites.length && 
            <div>
                <h1 className="text-3xl font-bold mb-4">My Favourites</h1>
                <section className='flex flex-col gap-5'>

                {
                    favourites.map((favourite, index) => {
                        return <Card>
                            <h1>{favourite.franchise.franchiseName}</h1>
                        </Card>
                    })
                }
                </section>
            </div>
        }
    </FranchiseeLayout>
    </>
  )
}

export default WishlistPage