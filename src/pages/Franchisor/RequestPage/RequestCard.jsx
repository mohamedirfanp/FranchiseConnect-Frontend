import React, { useEffect, useRef, useState } from 'react';


import { Card } from 'primereact/card';


import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';


import { Button } from 'primereact/button';

import { Tooltip } from 'primereact/tooltip';

import { Dialog } from 'primereact/dialog';


import { UpdateRequest } from '../../../api/Franchisor/franchiseApi';
import { useNavigate } from 'react-router';
import { Toast } from 'primereact/toast';

import ToastMessage from '../../../components/ToastComponent/Toast';


function RequestCard(props) {

    const toast = useRef(null);
    const request = props.request;
    const franchiseDetail = request.franchise;
    const [selectedServices, setSelectedServices] = useState([]);

    const [isCustomizationOption, setCustomization] = useState(false);

    const navigate = useNavigate();

    const [visible, setVisible] = useState(false);


    useEffect(() => {
        showCustomization();

        setSelectedServices([]);
        selectedServiceInfo();


    }, [])


    const showCustomization = () => {
        if (!request.franchise.franchiseCustomizedOption) {
            setCustomization(false);
        }
        else if (request.frachiseServiceList.length > request.franchiseSelectedServiceList.length) {
            setCustomization(true);
        }
        else {
            setCustomization(false);
        }
    }

    const selectedServiceInfo = () => {
        request.franchiseSelectedServiceList.forEach((element) => {
            const temp = { ...element };
            const newtemp = request.frachiseServiceList.filter(item => item.franchiseServiceId == temp.franchiseProvideServiceId)
            temp.ServiceName = newtemp[0].franchiseProvideServiceName;
            temp.ServiceDescription = newtemp[0].franchiseProvideServiceDescription;
            setSelectedServices((prevState) => [...prevState, temp]);
        })
    }

    const handleSubmit = (data) => {
        UpdateRequest(data)
            .then((response) => {
                console.log(response)
                navigate('/franchisor/request');
                ToastMessage(true, response.data.value.response, toast);
            })
            .catch((error) => {
                console.error(error);
            })
    }

    const deny = () => {
        const data = {
            franchiseRequestId: request.franchiseRequest.franchiseRequestId,
            isRequestStatus: "Rejected"
        }
        handleSubmit(data);
        
    }


    const accept = () => {
        const data = {
            franchiseRequestId: request.franchiseRequest.franchiseRequestId,
            isRequestStatus: "Accepted"
        }
        
        handleSubmit(data);
    }

    const Accept = () => {
        confirmDialog({
            message: 'Do you accept all the terms and conditions?',
            header: 'Accept Confirmation',
            icon: 'pi pi-info-circle',
            accept
        });
    };


    const Deny = () => {
        confirmDialog({
            message: 'Do you want to deny this request?',
            header: 'Deny Confirmation',
            icon: 'pi pi-info-circle',
            deny
        });
    };


    const header = (
        <div className='flex flex-col gap-3 p-5'>
            <span className='text-xl font-bold'>{request.franchise.franchiseName}</span>
            <span className='text-lg font-light'>{request.franchise.franchiseIndustry}</span>
            <hr />
        </div>
    )

    const footer = (
        <div className='flex justify-between'>
            <Button label='Show Info' onClick={() => {
                setVisible(true);
            }} tooltipOptions={{ position: 'bottom' }} tooltip="Show More Info" />
            <div className='flex gap-2'>

                <Button icon=" pi pi-times" severity="danger" tooltipOptions={{ position: 'bottom' }} tooltip="Deny Request" onClick={() => {
                    Deny();
                }} />

                <Tooltip target=".custom-target-success-icon" position='bottom' />
                <Button icon="custom-target-success-icon pi pi-check " severity="success" tooltip="Accept Request" onClick={() => {
                    Accept();
                }} />
            </div>

        </div>
    )




    const footerContent = (
        <div>
            <Button label="Close" icon="pi pi-times" severity="danger" onClick={() => setVisible(false)} className="p-button-text hidden sm:inline-block" autoFocus />

        </div>
    );

    return (
        <>
            <Toast ref={toast} />
            <Card header={header} footer={footer}>
                <ConfirmDialog draggable={false} resizable={false} />
                <div className='-mt-9'>
                    <article className='flex gap-12 justify-start'>
                        <div className='grid grid-cols-1 gap-3'>
                            <div className='grid grid-cols-2'>
                                <p className='flex justify-start'>Investment Budget</p>
                                <p className='flex justify-end'>
                                    {request.franchiseRequest.investmentBudget}
                                    <span className='border-blue-400 bg-blue-100 border pl-2 pr-2 text-cyan-600 font-normal'>INR</span>
                                </p>
                            </div>
                            <div className='grid grid-cols-2'>
                                <p className='flex justify-start'>Obtained Space</p>
                                <p className='flex justify-end'>
                                    {request.franchiseRequest.space}
                                    <span className='border-blue-400 bg-blue-100 border ml-3 pl-2 pr-2 text-cyan-600 font-normal'>Sq.ft</span>
                                </p>
                            </div>
                            <div className='flex w-full justify-between'>
                                <p className='flex gap-1 justify-start'>Franchise Fee</p>
                                <p className='flex justify-end'>{franchiseDetail.franchiseFee}</p>
                            </div>
                            <div className='flex w-full justify-between'>
                                <p className='flex gap-1 justify-start'>Request Status</p>
                                <p className='flex justify-end text-blue-400'>{request.franchiseRequest.isRequestStatus}</p>
                            </div>
                        </div>
                    </article>

                    <div>
                        {isCustomizationOption && <article className='flex gap-1 mt-3'>
                            <span className='flex h-2 w-2 translate-y-1 rounded-full bg-sky-500 m-1 animate-pulse'></span>
                            <p className='text-[#6366F1]'>Customization Requested</p>
                        </article>}
                    </div>
                    <Dialog header="Request Info" visible={visible} style={{ width: '75vw' }} onHide={() => setVisible(false)} footer={footerContent} draggable={false} resizable={false}>
                        <section>
                            <h1 className="text-center font-bold text-lg mb-5">Details</h1>
                            {/* Add quotations here */}
                            <div>
                                <h3><span className='text-md font-bold'>Franchise Name : </span>{franchiseDetail.franchiseName}</h3>
                                <h4><span className='text-md font-bold'>Industry : </span>{franchiseDetail.franchiseIndustry}</h4>
                            </div>
                            <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 p-3'>
                                <span>
                                    <p className='font-bold'>Investment Budget</p>
                                    <p>Rs. {request.franchiseRequest.investmentBudget}</p>
                                </span>
                                <span>
                                    <p className='font-bold'>Obtained Space</p>
                                    <p>{request.franchiseRequest.space}</p>
                                </span>
                                <span>
                                    <p className='font-bold'>Franchise Fee</p>
                                    <p className='flex items-center gap-1'>Rs. {franchiseDetail.franchiseFee} </p>
                                </span>
                                <span>
                                    <p className='font-bold'>Customization Status</p>
                                    {isCustomizationOption ? <p className='text-green-500'>Requested</p> : <p className='text-red-500'>Not Requested</p>}
                                </span>
                            </div>
                            <div>
                                <span>
                                    <p className='text-xl font-semibold'>Requested Services</p>
                                </span>
                                <div>
                                    {selectedServices.map((service, index) => {
                                        return (<article className='flex gap-1 mt-3 items-center' key={index}>
                                            <span className='flex h-2 w-2 m-1 rounded-full bg-sky-500  animate-pulse'></span>
                                            <p className='text-lg'>{service.ServiceName}</p>
                                        </article>)
                                    })}
                                </div>
                            </div>

                        </section>
                    </Dialog>
                </div>
            </Card>
        </>
    )
};

export default RequestCard;
