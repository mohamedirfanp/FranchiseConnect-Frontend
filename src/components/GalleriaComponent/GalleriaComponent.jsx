
import React, { useState, useEffect } from 'react';
import { Galleria } from 'primereact/galleria';

export default function GalleriaComponent({gallery}) {
    const [images, setImages] = useState(null);

    const responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '960px',
            numVisible: 4
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];


    useEffect(() => {
       setImages(gallery);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const itemTemplate = (item) => {
        return <img src={item.franchisePhotoUrl} alt="No Image Found" style={{ width: '600px', display: 'block', height:"280px" }} />
    }

    const thumbnailTemplate = (item) => {
        return <img src={item.franchisePhotoUrl} alt="No Image Found" style={{ display: 'block', width: '150px', height: '100px' }} />
    }

    return (
        <div className=' w-full p-4'>
            <Galleria value={images}  numVisible={7} circular 
                item={itemTemplate} thumbnail={thumbnailTemplate} className='rounded' style={{ maxWidth: '100%' }}/>
        </div>
    )
}
        