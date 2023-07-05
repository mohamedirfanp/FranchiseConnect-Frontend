
import React, { useState, useEffect } from 'react';
import { Galleria } from 'primereact/galleria';
import { Checkbox } from 'primereact/checkbox';
import { RadioButton } from 'primereact/radiobutton';
// import { PhotoService } from './service/PhotoService';

export default function GalleryComponent({gallery}) {
    const [images, setImages] = useState(null);

    var data = [
        {
            itemImageSrc: 'https://primefaces.org/cdn/primereact/images/galleria/galleria1.jpg',
            thumbnailImageSrc: 'https://primefaces.org/cdn/primereact/images/galleria/galleria1s.jpg',
            alt: 'Description for Image 1',
            title: 'Title 1'
        },
        {
            itemImageSrc: 'https://primefaces.org/cdn/primereact/images/galleria/galleria2.jpg',
            thumbnailImageSrc: 'https://primefaces.org/cdn/primereact/images/galleria/galleria2s.jpg',
            alt: 'Description for Image 2',
            title: 'Title 2'
        },
        {
            itemImageSrc: 'https://primefaces.org/cdn/primereact/images/galleria/galleria3.jpg',
            thumbnailImageSrc: 'https://primefaces.org/cdn/primereact/images/galleria/galleria3s.jpg',
            alt: 'Description for Image 3',
            title: 'Title 3'
        },
        {
            itemImageSrc: 'https://primefaces.org/cdn/primereact/images/galleria/galleria4.jpg',
            thumbnailImageSrc: 'https://primefaces.org/cdn/primereact/images/galleria/galleria4s.jpg',
            alt: 'Description for Image 4',
            title: 'Title 4'
        },
        {
            itemImageSrc: 'https://primefaces.org/cdn/primereact/images/galleria/galleria5.jpg',
            thumbnailImageSrc: 'https://primefaces.org/cdn/primereact/images/galleria/galleria5s.jpg',
            alt: 'Description for Image 5',
            title: 'Title 5'
        },
        {
            itemImageSrc: 'https://primefaces.org/cdn/primereact/images/galleria/galleria6.jpg',
            thumbnailImageSrc: 'https://primefaces.org/cdn/primereact/images/galleria/galleria6s.jpg',
            alt: 'Description for Image 6',
            title: 'Title 6'
        },
        {
            itemImageSrc: 'https://primefaces.org/cdn/primereact/images/galleria/galleria7.jpg',
            alt: 'Description for Image 7',
            title: 'Title 7'
        }];
    useEffect(() => {
        // PhotoService.getImages().then((data) => setImages(data));

        setImages(gallery);
    }, []);

    const itemTemplate = (item) => {
        return <img src={item.franchisePhotoUrl} alt="No Image Found" style={{ width: '100%', display: 'block', height: '250px' }} />;
    };

    return (
        <div className="card rounded">
            <Galleria value={images} style={{ maxWidth: '640px', borderRadius: "0.25rem" }} showThumbnails={false} showIndicators 
                    showIndicatorsOnItem={true} indicatorsPosition={"bottom"} item={itemTemplate} />
        </div>
    )
}
        