import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import GalleryComponent from "./GalleryComponent";
import locationMarker from "../../assets/locationmarker.png";
import { useNavigate } from 'react-router';

function CardComponent({ index, franchiseDetail }) {

    const navigate = useNavigate();

    const header = (
        <div className=' bg-slate-400'>

            <GalleryComponent gallery={franchiseDetail.franchiseGalleryList} />
        </div>
    );

    const subTitle = (
        <span className='flex flex-col gap-2'>
            <span className='flex justify-between'>
                <p>{franchiseDetail.franchise.franchiseIndustry}</p>
                <p className='flex gap-1 items-center justify-center'>
                    <img src={locationMarker}
                        width={18}></img>{franchiseDetail.franchise.franchiseSegment}</p>
            </span>
            <hr />
        </span>
    );
    return (
        <div className="card flex justify-content-center rounded m-2">

            <Card title={franchiseDetail.franchise.franchiseName}
                subTitle={subTitle}
                header={header}
                className="md: w-80  p-2  hover:outline outline-blue-400" key={index}>

                <article className='flex gap-12 justify-start'>
                    <div className='grid grid-cols-1 gap-3'>
                        <div className='grid grid-cols-2'>
                            <p className='flex justify-start'>Investment</p>
                            <p className='flex justify-end'>
                                {franchiseDetail.franchise.franchiseInvestment}
                                <span className='border-blue-400 bg-blue-100 border pl-2 pr-2 text-cyan-600 font-normal'>INR</span>
                            </p>
                        </div>
                        <div className='grid grid-cols-2'>
                            <p className='flex justify-start'>Space</p>
                            <p className='flex justify-end'>
                                {franchiseDetail.franchise.franchiseSpace}
                                <span className='border-blue-400 bg-blue-100 border ml-3 pl-2 pr-2 text-cyan-600 font-normal'>Sq.ft</span>
                            </p>
                        </div>
                        <div className='flex w-full justify-between'>
                            <p className='flex gap-1 justify-start'>No of franchise</p>
                            <p className='flex justify-end'>{franchiseDetail.franchise.franchiseCurrentCount}</p>
                        </div>
                    </div>
                </article>

                {franchiseDetail.franchise.franchiseCustomizationOption && <article className='flex gap-1 mt-3'>
                    <span className='flex h-2 w-2 translate-y-1 rounded-full bg-sky-500 m-1 animate-pulse'></span>
                    <p>Customization Option Avaliable</p>
                </article>}

                <div className="flex flex-wrap items-center justify-center mt-5">
                    <Button className="hover: cursor-pointer" label="View Business" onClick={() => {
                        navigate(`/franchisee/franchise/${franchiseDetail.franchise.franchiseId}`)
                    }} />
                </div>
            </Card>
        </div>
    )
}

export default CardComponent
