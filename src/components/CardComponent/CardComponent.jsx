import React from 'react';
import {Card} from 'primereact/card';
import {Button} from 'primereact/button';
import GalleryComponent from "./GalleryComponent";
import locationMarker from "../../assets/locationmarker.png";
import {useNavigate} from 'react-router';

function CardComponent({index, franchiseDetail}) {

    const navigate = useNavigate();

    const header = (
        <div className=' bg-slate-400'>

            <GalleryComponent gallery={
                franchiseDetail.franchiseGalleryList
            }/>
        </div>
    );

    const subTitle = (
        <span className='flex flex-col gap-2'>
            <span className='flex justify-between'>
                <p>{
                    franchiseDetail.franchise.franchiseIndustry
                }</p>
                <p className='flex gap-1 items-center justify-end w-full'>
                    <img src={locationMarker}
                        width={18}></img>
                    {
                    franchiseDetail.franchise.franchiseSegment
                }</p>
            </span>
            <hr/>
        </span>
    );
    return (
        <div className="card flex justify-content-center rounded m-2 h-full">

            <Card title={
                    franchiseDetail.franchise.franchiseName
                }
                subTitle={subTitle}
                header={header}
                className="md:   p-2 hover:outline outline-[#6366F1] w-full h-full flex flex-col justify-between"
                key={index} >
                <div className='flex flex-col h-full'>
                    <div> 
                    <article className='flex flex-col justify-start gap-2'>
                            <div className='grid grid-cols-3 outline-dotted outline-1 outline-black p-1 rounded'>
                                <p className='flex justify-start'>Investment</p>
                                <p className='flex justify-start'>
                                    {
                                    franchiseDetail.franchise.franchiseInvestment
                                }
                                </p>
                                    <span className='border-blue-400 bg-blue-100 border pl-2 pr-2 text-cyan-600 font-normal text-center'>INR</span>
                            </div>
                            <div className='grid grid-cols-3'>
                                <p className='flex justify-start'>Space</p>
                                <p className='flex justify-start'>
                                    {
                                    franchiseDetail.franchise.franchiseSpace
                                }
                                </p>
                                    <span className='border-blue-400 bg-blue-100 border pl-2 pr-2 text-cyan-600 font-normal text-center'>Sq.ft</span>
                            </div>
                            <div className='grid grid-cols-3'>
                                <p className='flex gap-1 justify-start'>No of franchise</p>
                                <p className='flex justify-start'>
                                    {
                                    franchiseDetail.franchise.franchiseCurrentCount
                                }</p>
                            </div>
                        {/* </div> */}
                    </article>
                    </div>
                    <div clasName='grow flex-grow'>        
                    {
                    franchiseDetail.franchise.franchiseCustomizedOption && <article className='flex gap-1 mt-3'>
                        <span className='flex h-2 w-2 translate-y-1 rounded-full bg-sky-500 m-1 animate-pulse'></span>
                        <p className='text-sm'>Customization Avaliable</p>
                    </article>
                    }
                    </div>

                    <div className="flex flex-wrap items-center justify-center mt-2">
                <Button className="hover: cursor-pointer" label="View Business"
                    onClick={
                        () => {
                            navigate(`/franchisee/franchise/${
                                franchiseDetail.franchise.franchiseId
                            }`)
                        }
                    }/>
            </div>
            </div>
        </Card>
    </div>
    )
}

export default CardComponent
