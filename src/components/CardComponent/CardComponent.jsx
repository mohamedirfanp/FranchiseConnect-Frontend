import React from 'react';
import {Card} from 'primereact/card';
import {Button} from 'primereact/button';
import GalleryComponent from "./GalleryComponent";
import locationMarker from "../../assets/locationmarker.png";
import { useNavigate } from 'react-router';

function CardComponent() {

    const navigate = useNavigate();

    const header = (
        <GalleryComponent/>);

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
        <div className="card flex justify-content-center rounded m-2">

            <Card title="Franchise Name"
                subTitle={subTitle}
                header={header}
                className="md: w-80  p-2  hover:outline outline-blue-400">

                <article className='flex gap-12 justify-start'>
                    <div className='grid grid-cols-2 gap-1'>
                        <p className='flex'>Investment</p>

                        <p className='flex gap-1'>1lakh-2lakh
                        <span className='border-blue-400 bg-blue-100 border pl-2 pr-2 text-cyan-600 font-normal'>INR</span>
                        </p>
                        <p className='flex gap-1'>Space
                        </p>
                        <p>350 - 750
                            <span className='border-blue-400 bg-blue-100 border ml-3 pl-2 pr-2 text-cyan-600 font-normal'>Sq.ft</span>
                        </p>
                        <p className='flex gap-1'>No of franchise</p>
                        <p>5 - 10</p>
                    </div>
                </article>
                <article className='flex gap-1 mt-3'>
                    <span className='flex h-2 w-2 translate-y-1 rounded-full bg-sky-500 m-1 animate-pulse'></span>
                    <p>Customization Option Avaliable</p>
                </article>
                <div className="flex flex-wrap items-center justify-center mt-2">
                    <Button className="hover: cursor-pointer" label="View Business" onClick={() => {
                        navigate("/franchisee/franchise/1")
                    }}/>
                </div>
            </Card>
        </div>
    )
}

export default CardComponent
