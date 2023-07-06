import {Card} from 'primereact/card'
import React from 'react';
import {Rating} from "primereact/rating";

function ReviewCardComponent({review}) {
    const header = (
        <div className="flex gap-5 justify-start items-center">
            <span className="w-10 h-10 rounded-full overflow-hidden outline ml-4 mt-3">
                <img src="https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png" alt="User Icon" className="w-full h-full object-cover"/>
            </span>
            <div>
                <h3 className="font-medium mt-3">{review.name}</h3>
            </div>
        </div>

    )

    const footer = (
        <div className="card flex justify-start">
            <Rating value={review.rating}
                readOnly
                cancel={false}/>
        </div>
    )

    return (
        <>
            <Card header={header}
                footer={footer}
                className='md:w-1/4 rounded-md'>
                <hr className='border border-blue-300 -mt-8'></hr>
                <div className='mt-2'>
                    <p className='word-wrap'>{review.comment}</p>
                </div>
            </Card>
        </>
    )
}

export default ReviewCardComponent
