import React, { useEffect, useRef, useState } from 'react'

import { Checkbox } from 'primereact/checkbox';
import { InputText } from 'primereact/inputtext'

function QuotationPage({ franchise, setSelectedServices, selectedServices, setUserData, userData, error }) {

    const franchiseDetail = franchise.franchise;


    const franchiseService = franchise.frachiseServiceList;

    const [isCustomization, setCustomization] = useState(false);



    // const [selectedServices, setSelectedServices] = useState([]);



    const handleServiceChange = (serviceId) => {
        if (selectedServices.includes(serviceId)) {
            setSelectedServices((prevSelected) =>
                prevSelected.filter((id) => id !== serviceId)
            );
        } else {
            setSelectedServices((prevSelected) => [...prevSelected, serviceId]);
        }
    };

    return (
        <section>
            <h1 className="text-center font-bold text-lg mb-5">Details</h1>
            {/* Add quotations here */}
            <div>
                <h3><span className='text-md font-bold'>Franchise Name : </span>{franchiseDetail.franchiseName}</h3>
                <h4><span className='text-md font-bold'>Industry : </span>{franchiseDetail.franchiseIndustry}</h4>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 p-3'>
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
                    <p className='font-bold'>Franchise Fee</p>
                    <p className='flex items-center gap-1'>Rs. {franchiseDetail.franchiseFee} </p>
                </span>
            </div>
            <div className='grid grid-cols-1 gap-7 sm:grid-cols-2 sm:p-3 sm:gap-1 mt-5'>
                <div>
                    <span className='p-float-label'>
                        <InputText id="investment" value={userData.investment} onChange={(e) => {
                            setUserData({ ...userData, investment: e.target.value });
                        }} />
                        <label htmlFor='investment' className='font-bold'>Investment Budget<span className='text-red-600'>*</span></label>
                    </span>
                    {error && <p className='text-red-600'>*Investment Budget Required</p>}
                </div>

                <div>
                    <span className='p-float-label'>
                        <InputText id="space" value={userData.space} onChange={(e) => {
                            setUserData({ ...userData, space: e.target.value });
                        }}  />
                        <label htmlFor='space' className='font-bold'>Space Budget<span className='text-red-600'>*</span></label>
                    </span>
                    {error && <p className='text-red-600'>*Space Budget Required</p>}
                </div>
            </div>
            {franchiseDetail.franchiseCustomizedOption && <div className='p-5'>
                <span className='flex gap-2 items-center'>
                    <Checkbox
                        checked={isCustomization}
                        onChange={(e) => {
                            setCustomization(e.checked);
                        }}
                    />
                    <span className='text-lg text-[#6366F1]'>Are you going to customize the your franchise services?</span>

                </span>
            </div>}

            {isCustomization && <section className='flex flex-col gap-2'>
                <h2 className='text-lg font-medium'>Customizable Services</h2>
                {franchiseService.map((service) =>
                    service.franchiseCustomizationStatus ? (
                        <div key={service.franchiseServiceId} className='p-1 flex items-center gap-3'>
                            <Checkbox
                                inputId={service.franchiseServiceId}
                                value={service.franchiseServiceId}
                                checked={selectedServices.includes(service.franchiseServiceId)}
                                onChange={(e) => handleServiceChange(e.value)}
                            />
                            <label htmlFor={service.franchiseServiceId}>
                                {service.franchiseProvideServiceName}
                            </label>
                        </div>
                    ) : null
                )}


            </section>}

        </section>
    )
}

export default QuotationPage