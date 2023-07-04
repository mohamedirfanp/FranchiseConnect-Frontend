import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

import { Card } from 'primereact/card';
import { Carousel } from "primereact/carousel";

import FranchiseeLayout from '../../../Layout/FranchiseeLayout'
import GalleriaComponent from '../../../components/GalleriaComponent/GalleriaComponent';
import ReviewCardComponent from '../../../components/ReviewCardComponent/ReviewCardComponent';

import { GetFranchiseDetails } from "../../../api/ReviewApi/reviewApi";
import { GetFranchiseReview } from "../../../api/ReviewApi/reviewApi";
import AboutCard from './AboutCard';

function FranchisePage() {
    const [reviews, setReviews] = useState([]);

    useEffect(()=>{
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
                console.log(business_id);
                const franchiseReviews = await GetFranchiseReview(business_id);
                setReviews(franchiseReviews.data.data);
                sessionStorage.setItem("reviews", franchiseReviews);
            } catch (error) {
                console.error(error);
            }
        }
        getResponse();
    }, []);

    const responsiveOptions = [
        {
            breakpoint: '1199px',
            numVisible: 1,
            numScroll: 1
        },
        {
            breakpoint: '991px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    const id = useParams();
    // Get Reviews

  return (
    <div className='w-screen h-screen'>

      <FranchiseeLayout>
        <section>

        <section className='flex flex-col md:flex-row bg-slate-200 w-full '>
            <div className='flex items-center justify-center mt-6'>
            <GalleriaComponent />
            </div>
            <div className='mt-5 p-3'>
                <AboutCard />
            </div>
        </section>
        <section className='p-5 w-fit'>
            <div className="w-auto">
                {/* <Carousel value={reviews} numVisible={3} numScroll={3} responsiveOptions={responsiveOptions} style={{maxWidth: 300}} circular
                autoplayInterval={3000} itemTemplate={ReviewCardComponent} /> */}
            </div>
            {/* Review Section */}
            <ReviewCardComponent />
        </section>
        </section>
      </FranchiseeLayout>
    </div>
  )
}

export default FranchisePage
