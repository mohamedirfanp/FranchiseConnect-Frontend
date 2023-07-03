import React, {useState} from 'react';
import CheckboxFilter from './CheckboxFilter';
import SingleDropdownFilter from './SingleDropdownFilter';
import RangeSelectorFilter from './RangeSelectorFilter.jsx';

import {MultiSelect} from 'primereact/multiselect';
import { Checkbox } from 'primereact/checkbox';
        

const MainFilterComponent = () => {
    const [selectedCategories, setSelectedCategories] = useState(null);
    const [checkboxData, setCheckboxData] = useState({});
    const [rangeSelectorData, setRangeSelectorData] = useState({minValue: 0, maxValue: 100});



    const handleRangeSelectorChange = (minValue, maxValue) => {
        setRangeSelectorData({minValue, maxValue});
    };

    const cities = [
        {
            name: 'Food',
            code: 'fd'
        },
        {
            name: 'Rome',
            code: 'RM'
        },
        {
            name: 'London',
            code: 'LDN'
        },
        {
            name: 'Istanbul',
            code: 'IST'
        }, {
            name: 'Paris',
            code: 'PRS'
        }
    ];


    return (
        <div className='flex gap-8 p-5 flex-wrap'>
            <div className="form-group flex items-center gap-1 p-5 pb-12 bg-blue-200 rounded">
                <label>Categories:</label>
                <MultiSelect value={selectedCategories}
                    onChange={
                        (e) => setSelectedCategories(e.value)
                    }
                    options={cities}
                    optionLabel="name"
                    filter
                    placeholder="Select Category"
                    maxSelectedLabels={2}
                    className=""/>
            </div>

            {/* <SingleDropdownFilter onChange={handleSingleDropdownChange} /> */}
            <div className="form-group flex items-center gap-1 p-5 pb-12 bg-blue-200 rounded">
                <label>Investment (INR):</label>
                <RangeSelectorFilter min={0}
                    max={1000000}
                    onChange={handleRangeSelectorChange}
                    className="inline-block relative"
                    />
            </div>
            <div className='form-group flex items-center gap-1 p-5 pb-10 bg-blue-200 rounded'>
              <label>Space (sq. ft):</label>
              <RangeSelectorFilter min={200}
                    max={1000000}
                    onChange={handleRangeSelectorChange}/>
            </div>
            <div className='form-group flex items-center gap-1 p-5 pb-10 bg-blue-200 rounded'>
                <Checkbox onChange={e => setCheckboxData(e.checked)} checked={checkboxData} inputId='customize'></Checkbox>
                <label htmlFor="customize">Customization Option Allowed Only</label>
                
            </div>
        </div>
    );
};

export default MainFilterComponent;
