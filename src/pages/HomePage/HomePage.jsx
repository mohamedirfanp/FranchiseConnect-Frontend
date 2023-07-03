import React from 'react';
import MainFilterComponent from '../../components/Filters/FilterComponent';
import CardComponent from '../../components/CardComponent/CardComponent';
import FranchiseeLayout from '../../Layout/FranchiseeLayout';

function HomePage() {
    return (

        <FranchiseeLayout>
            <MainFilterComponent/>
            <CardComponent/>
        </FranchiseeLayout>
    )
}

export default HomePage
