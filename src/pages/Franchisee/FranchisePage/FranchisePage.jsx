import React, { useEffect, useState } from 'react'


import FranchiseeLayout from '../../../Layout/FranchiseeLayout'
import GalleriaComponent from '../../../components/GalleriaComponent/GalleriaComponent';
import ReviewCardComponent from '../../../components/ReviewCardComponent/ReviewCardComponent';

import { GetFranchiseDetails } from "../../../api/ReviewApi/reviewApi";
import { GetFranchiseReview } from "../../../api/ReviewApi/reviewApi";

import {GetFranchiseById, UpdateViewCount} from '../../../api/Franchisee/FranchiseApi';

import { ProgressSpinner } from 'primereact/progressspinner';
import AboutCard from './AboutCard';
import { useParams } from 'react-router';
import ServiceCard from './ServiceCard';


import { Carousel } from 'primereact/carousel';
        



function FranchisePage() {
    const [reviews, setReviews] = useState([]);
    const [isWishlisted,setWishlist] = useState(false);
    const [franchise, setFranchise] = useState();

    const [loading, setLoading] = useState(true);
    
    const id = useParams();


    useEffect(()=>{
        const reviewsApi = [{
            "name": "Test1",
            "rating": 5,
            "comment":"Great service and staff!"
            },
            {"name": "Test2",
            "rating" :4 ,
            "comment":"The food is delicious but the ambiance was a bit too casual for my taste."},
            ]

        setReviews(reviewsApi);
        const getResponse = async () => {
            try {
                if(sessionStorage.getItem("reviews") !== null)
                {
                    const franchiseReviews = sessionStorage.getItem("reviews");
                    setReviews(franchiseReviews);
                    return;
                }
                const franchiseDetail = await GetFranchiseDetails("Chai Kings");
                const business_id = franchiseDetail.data.data[0]['business_id'];
                const franchiseReviews = await GetFranchiseReview(business_id);
                setReviews(franchiseReviews.data.data);
                sessionStorage.setItem("reviews", franchiseReviews);
            } catch (error) {
                console.error(error);
            }
        }
        // getResponse(); // TODO : GET REVIEWS -> NEED TO RE-REGISTER IN THE RAPIDAPI
        GetFranchiseById(id.id)
        .then((response) => {
            setFranchise(response.data);
            setLoading(false);
            console.log(response.data)
        })
        .catch((error) => {
            console.error(error);
        })
        
        setTimeout(()=>{
            UpdateViewCount(id.id)
            .then((response) => {
                // console.log(response);
            })
            .catch((error) => {
                console.error(error);
            })
        }, 3000)

    }, []);



    
    // Get Reviews

  return (
    <div className='w-screen h-screen'>

      <FranchiseeLayout>
        {loading && <section className='flex justify-center items-center w-full'>
           <ProgressSpinner />
        </section> }
        {!loading && <section className=''>
        <section className='flex flex-col md:flex-row bg-slate-200 w-full justify-center items-center'>
            <div className='flex items-center justify-center w-full mt-6'>
            <GalleriaComponent gallery={franchise.franchiseGalleryList} />
            </div>
            <div className='mt-5 p-3 flex justify-center'>
                <AboutCard franchise={franchise}/>
            </div>
        </section>    
        <section>
            <ServiceCard franchiseService={franchise.frachiseServiceList}/>
        </section>

        <section className='p-5 w-fit'>
            <h1 className='text-3xl font-semibold'>Reviews</h1>
            <div className="w-auto flex flex-col gap-3 sm:flex-row pt-5">
               {
                reviews.map((review,index) => {
                   return <ReviewCardComponent key={index} review={review} />

                })
               }
            </div>
            {/* Review Section */}
        </section>

        </section> }
        
      </FranchiseeLayout>
    </div>
  )
}

export default FranchisePage
