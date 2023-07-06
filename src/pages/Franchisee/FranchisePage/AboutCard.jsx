import React, {useContext, useEffect, useRef, useState} from 'react'
import ButtonComponent from '../../../components/ButtonComponent/ButtonComponent';
import { WishlistContext } from '../../../Layout/WishlistContext';

import { Tooltip } from 'primereact/tooltip';

import { Toast } from 'primereact/toast';


import { Card } from 'primereact/card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button } from 'primereact/button';

import { Dialog } from 'primereact/dialog';

import {
    faLocationPin,
} from '@fortawesome/free-solid-svg-icons';


import { useNavigate } from 'react-router';

import QuotationPage from './QuotationPage';

import ToastMessage from '../../../components/ToastComponent/Toast';

import {CreateRequest} from '../../../api/Franchisee/FranchiseApi';

import  { parseGrpcErrorMessage } from '../../../components/ErrorComponent/ErrorComponent';


function AboutCard({ franchise }) {

    const toast = useRef(null);
    const franchiseDetail = franchise.franchise;

    const franchiseSocial = franchise.franchiseSocial;

    const [ selectedServices, setSelectedServices ] = useState([]);

    const {  addToWishlist,  isAddedToWishlist } = useContext(WishlistContext);

    const [visible, setVisible] = useState(false);

    const [favourite, setFavourite] = useState(false);
    const navigate = useNavigate();

    const setSelectedServicesManual = (flag) => {
        let servicesArr = [];
        console.log(franchise.frachiseServiceList);

        if(flag)
        {
            franchise.frachiseServiceList.map((service,index) => {
                servicesArr.push(service.franchiseServiceId)
            })

        }
        else
        {
            franchise.frachiseServiceList.map((service,index) => {
                if(!service.franchiseCustomizationStatus)
                    servicesArr.push(service.franchiseServiceId)
            })

        }
        return servicesArr;
    }

    const callCreateRequest = (data) => {
        CreateRequest(data)
        .then((response) => {
            console.log(response);
            ToastMessage(true,response.data.value.response, toast);
        })
        .catch((error) => {
            console.error(error);
            const message = parseGrpcErrorMessage(error.response.data)
            console.log(message);
            ToastMessage(false,message.detail, toast);
        })
    }

    const handleFormSubmit = () =>{
        if(franchiseDetail.franchiseCustomizedOption)
        {
            if(selectedServices.length)
            {
                const compulsoryServiceIds = setSelectedServicesManual(false);
                const requestSelectedServiceIds = compulsoryServiceIds.concat(selectedServices);
                callCreateRequest({
                    franchiseId : franchiseDetail.franchiseId,
                    ownerId : franchiseDetail.franchiseOwnerId,
                    servicesId : requestSelectedServiceIds
                });
                
            }
            else
            {
                const servicesId = setSelectedServicesManual(true);
                callCreateRequest({
                    franchiseId : franchiseDetail.franchiseId,
                    ownerId : franchiseDetail.franchiseOwnerId,
                    servicesId : servicesId
                });
                
            }
        }
        else
        {
            const servicesId = setSelectedServicesManual(true);
            callCreateRequest({
                franchiseId : franchiseDetail.franchiseId,
                ownerId : franchiseDetail.franchiseOwnerId,
                servicesId : servicesId
            });
        }

    }

    useEffect(() =>{
        const favouriteStatus = isAddedToWishlist(franchiseDetail.franchiseId);
        setFavourite(favouriteStatus);
    }, [])


    const header = (
        <header className='flex justify-between'>
            <span className='p-3'>
                <h1 className='text-3xl font-semibold'>{franchiseDetail.franchiseName}</h1>
                <span>{franchiseDetail.franchiseIndustry}</span>

            </span>
            <span className='p-3'>
                <p className='flex gap-1 items-center justify-end pb-2'>
                    <FontAwesomeIcon icon={faLocationPin} style={{color : 'red'}} />
                    {franchiseDetail.franchiseSegment}</p>
                <span className='grid grid-cols-5 gap-2'>
                    <Tooltip target=".custom-target-email-icon" position='top' />
                    <i className="custom-target-email-icon pi pi-envelope" style={{ fontSize: '1.3rem', color: '#6366F1' }} data-pr-tooltip={franchiseSocial.franchiseEmail}></i>

                    {
                        franchiseSocial.franchiseWebsite !== '' ? <div>
                            <Tooltip target=".custom-target-globe-icon" position='top' />
                            <i className="custom-target-globe-icon pi pi-globe" style={{ fontSize: '1.3rem', color: '#6366F1' }} data-pr-tooltip={franchiseSocial.franchiseWebsite} ></i>
                        </div> : <i className="pi pi-globe"
                            style={
                                { fontSize: '1.3rem' }
                            }></i>
                    }

                    {
                        franchiseSocial.franchiseFacebook !== '' ? <div>
                            <Tooltip target=".custom-target-facebook-icon" position='top' />
                            <i className="custom-target-facebook-icon pi pi-facebook" style={{ fontSize: '1.3rem', color: '#6366F1' }} data-pr-tooltip={franchiseSocial.franchiseFacebook} ></i>
                        </div> : <i className="pi pi-facebook"
                        style={
                            { fontSize: '1.3rem' }
                        }></i>
                    }

                    {
                        franchiseSocial.franchiseTwitter !== '' ? <div>
                            <Tooltip target=".custom-target-twitter-icon" position='top' />
                            <i className="custom-target-twitter-icon pi pi-twitter" style={{ fontSize: '1.3rem', color: '#6366F1' }} data-pr-tooltip={franchiseSocial.franchiseTwitter} ></i>
                        </div> : <i className="pi pi-twitter"
                        style={
                            { fontSize: '1.3rem' }
                        }></i>

                    }
                     {
                        franchiseSocial.franchiseInstagram !== '' ? <div>
                            <Tooltip target=".custom-target-instagram-icon" position='top' />
                            <i className="custom-target-instagram-icon pi pi-instagram" style={{ fontSize: '1.3rem', color: '#6366F1' }} data-pr-tooltip={franchiseSocial.franchiseInstagram} ></i>
                        </div> : <i className="pi pi-instagram"
                        style={
                            { fontSize: '1.3rem' }
                        }></i>

                    }
                
                </span>
            </span>
        </header>
    );

    const footerContent = (
        <div>
            <Button label="Cancel" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text hidden sm:inline-block" />
            <Button label="Submit" icon="pi pi-check" onClick={() => {
                setVisible(false)
                handleFormSubmit()
                }} autoFocus  />
        </div>
    );

    const footer = (
        <footer className='flex gap-2 -mt-3'>
            { !favourite && <ButtonComponent text={"Add to Favourite"} onClick={()=>{
                setFavourite(true)
                addToWishlist(franchiseDetail.franchiseId);
            }}/>}
            { favourite && <ButtonComponent text={"Go to Favourite"} onClick={()=>{
                navigate('/franchisee/wishlist')
            }}/>}
            <ButtonComponent text={"I'm Interested"} onClick={() => {
               setVisible(true);
            }}/>
        </footer>
    );

    return (
        <div className=''>
            <Toast ref={toast} />
            <Card header={header}
                footer={footer}>
                <section className='-mt-8'>
                    <div>
                        <h3 className='text-lg font-bold'>About</h3>
                        <p>{franchiseDetail.franchiseAbout}</p>
                    </div>
                    <br></br>
                    <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5'>
                        <span>
                            <p className='font-bold'>Investment Range</p>
                            <p>Rs. {franchiseDetail.franchiseInvestment}</p>
                        </span>
                        <span>
                            <p className='font-bold'>Space Req.</p>
                            <p>{franchiseDetail.franchiseSpace} Sq.ft</p>
                        </span>
                        <span>
                            <p className='font-bold'>Franchise Outlets</p>
                            <p>{franchiseDetail.franchiseCurrentCount}</p>
                        </span>
                        <span>
                            <p className='font-bold'>View Count</p>
                            <p className='flex items-center gap-1'>{franchiseDetail.franchiseViewCount} <icon className="pi pi-eye "></icon></p>
                        </span>
                    </div>
                    

                    <div className='grid grid-cols-2 pt-2'>
                        <div>
                            <p className='font-bold'>Preferred Expansion Loaction</p>
                            <p>{franchiseDetail.franchisePreferredExpansionLocation}</p>
                        </div>
                        <div>
                            <p className='font-bold'>Franchise Fee</p>
                            <p>Rs. {franchiseDetail.franchiseFee}</p>
                        </div>
                    </div>
                    {franchiseDetail.franchiseCustomizedOption && <article className='flex gap-1 mt-3'>
                        <span className='flex h-2 w-2 translate-y-1 rounded-full bg-sky-500 m-1 animate-pulse'></span>
                        <p>Customization Option Avaliable</p>
                    </article>}

                    <Dialog header="Franchise Info" visible={visible} style={{ width: '75vw' }} onHide={() => setVisible(false)} footer={footerContent} draggable={false} resizable={false}>
                        <QuotationPage franchise={franchise} setSelectedServices={setSelectedServices} selectedServices={selectedServices}/>
                    </Dialog>
                </section>
            </Card>
        </div>
    )
}

export default AboutCard
