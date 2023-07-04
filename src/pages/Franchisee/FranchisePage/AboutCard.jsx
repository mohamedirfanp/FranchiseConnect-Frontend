import React from 'react'
import ButtonComponent from '../../../components/ButtonComponent/ButtonComponent';
import locationMarker from "../../../assets/locationmarker.png";

import {Card} from 'primereact/card';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faEnvelope,
    faLandmark,
    faLocation,
    faLocationPin,
    faLocationPinLock
} from '@fortawesome/free-solid-svg-icons';

function AboutCard() {

    const header = (
        <header className='flex justify-between'>
            <span className='p-3'>
                <h1>Franchise Name</h1>
                <span>Category</span>

            </span>
            <span className='p-3'>
                <p className='flex gap-1 items-center justify-end pb-2'>
                    <FontAwesomeIcon icon={faLocationPin}/>
                    City,India</p>
                <span className='grid grid-cols-5 gap-2'>

                    <i className="pi pi-envelope"
                        onClick={
                            () => {
                                console.log('facebook')
                            }
                        }
                        style={
                            {fontSize: '1.3rem'}
                    }></i>

                <i className="pi pi-globe"
                    onClick={
                        () => {
                            console.log('facebook')
                        }
                    }
                    style={
                        {fontSize: '1.3rem'}
                }></i>

            <i className="pi pi-facebook"
                onClick={
                    () => {
                        console.log('facebook')
                    }
                }
                style={
                    {fontSize: '1.3rem'}
            }></i>


        <i className="pi pi-twitter"
            onClick={
                () => {
                    console.log('facebook')
                }
            }
            style={
                {fontSize: '1.3rem'}
        }></i>

    <i className="pi pi-instagram"
        onClick={
            () => {
                console.log('facebook')
            }
        }
        style={
            {fontSize: '1.3rem'}
    }></i></span></span></header>
    );

    const footer = (
        <footer className='flex gap-2 -mt-3'>
            <ButtonComponent text={"Add to Wishlist"}/>
            <ButtonComponent text={"Raise a Quotation"}/>
        </footer>
    );

    return (
        <div>
            <Card header={header}
                footer={footer}>
                <section className='-mt-8'>
                    <div>
                        <h3>About</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem harum quibusdam accusamus veritatis quo, sint facere dignissimos maiores architecto illum voluptates ratione corporis doloribus hic autem assumenda temporibus quidem in.</p>
                    </div>
                    <br></br>
                    <div className='grid grid-cols-4'>
                        <span>
                            <p>Investment Range</p>
                            <p>Rs. 10lakhs - 15lakhs</p>
                        </span>
                        <span>
                            <p>Space Req.</p>
                            <p>350 - 700 Sq.ft</p>
                        </span>
                        <span>
                            <p>Franchise Outlets</p>
                            <p>100</p>
                        </span>
                        <span>
                            <p>View Count</p>
                            <p className='flex items-center gap-1'>100 <icon className="pi pi-eye "></icon></p>
                        </span>
                    </div>
                    <article className='flex gap-1 mt-3'>
                    <span className='flex h-2 w-2 translate-y-1 rounded-full bg-sky-500 m-1 animate-pulse'></span>
                    <p>Customization Option Avaliable</p>
                </article>
                </section>
            </Card>
        </div>
    )
}

export default AboutCard
