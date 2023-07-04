import React from 'react';
import MainFilterComponent from '../../../components/Filters/FilterComponent';
import CardComponent from '../../../components/CardComponent/CardComponent';
import FranchiseeLayout from '../../../Layout/FranchiseeLayout';

function HomePage() {
    return (

        <FranchiseeLayout>
            <MainFilterComponent/>
            <div className='w-full max-h-full overflow-auto flex flex-wrap items-start gap-2'>
                <CardComponent/>
                <CardComponent/>
                <CardComponent/>
            </div>
        </FranchiseeLayout>
    )
}

export default HomePage 
