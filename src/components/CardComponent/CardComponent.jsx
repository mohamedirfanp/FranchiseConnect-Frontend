import React from 'react';
import {Card} from 'primereact/card';
import {Button} from 'primereact/button';
import GalleryComponent from "./GalleryComponent";
import locationMarker from "../../assets/locationmarker.png";

function CardComponent() {
    const header = (
        <GalleryComponent/>);
    const footer = (
        <div className="flex flex-wrap items-center justify-center">
            <Button label="View Business" onClick={console.log("button clicked")}/>
        </div>
    );
    const subTitle = (
        <span className='flex flex-col gap-2'>
            <span className='flex justify-between'>
                <p>Category</p>
                <p className='flex gap-1 items-center justify-center'>
                    <img src={locationMarker}
                        width={18}></img>City,India</p>
            </span>
            <hr/>
        </span>
    );
    return (
        <div className="card flex justify-content-center rounded m-5 mb-10">

            <Card title="Franchise Name"
                subTitle={subTitle}
                footer={footer}
                header={header}
                className="md: w-80 p-2 hover: cursor-pointer hover:border border-blue-400"
               >
                <button  onClick={
                    console.log("clicked")
            }>
                    <article className='flex gap-12 justify-start mb-2'>
                        <div className='grid grid-cols-2 gap-1'>
                            <p className='flex'>Investment</p>
                                
                            <p className='flex gap-1'>1lakh-2lakh<span className='border-blue-400 bg-blue-100 border pl-2 pr-2 text-cyan-600 font-normal'>INR</span>
                            </p>
                            <p className='flex gap-1'>Space  
                            </p>
                            <p>350 - 750 <span className='border-blue-400 bg-blue-100 border pl-2 pr-2 text-cyan-600 font-normal'>Sq.ft</span></p>
                            <p className='flex gap-1'>No of franchise</p>
                            <p>5 - 10</p>
                        </div>
                    </article>
                    <article className='flex gap-1'>
                        <span className='flex h-2 w-2 translate-y-1 rounded-full bg-sky-500 m-1 animate-pulse'></span>
                        <p>Customization Option Avaliable</p>
                    </article>
                </button>
            </Card>
        </div>
    )
}

export default CardComponent
