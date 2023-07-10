import React from 'react';

import Skeleton from '@mui/material/Skeleton';
import { Card } from 'primereact/card';

function CardSkeletonComponent() {
    return (
        <>
            <div>
                <Card header={
                    <div className="px-5 pt-5">

                        <Skeleton variant="rectangular" width={250} height={200} className='w-full' />

                    </div>
                }>
                    <Skeleton variant='text' />
                    <Skeleton variant='text' />
                    <Skeleton variant='text' />
                    <Skeleton variant='text' />
                    <Skeleton variant='text' />
                    <span className='flex justify-center pt-5'>
                        <Skeleton variant='rounded' height={50} width={150} />
                    </span>

                </Card>

            </div>

        </>
    )
}

export default CardSkeletonComponent