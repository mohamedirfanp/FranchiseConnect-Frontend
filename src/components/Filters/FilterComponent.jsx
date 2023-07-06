import React, {useState} from 'react';


import RangeSelectorFilter from './RangeSelectorFilter.jsx';

import ButtonComponent from '../ButtonComponent/ButtonComponent.jsx';

import {MultiSelect} from 'primereact/multiselect';
import { Checkbox } from 'primereact/checkbox';
import { useDebounce } from 'primereact/hooks';
    

function getUniqueFranchiseIndustries(franchises) {
    const uniqueIndustries = new Map();
  
    franchises.forEach((franchise) => {
      const industry = franchise.franchise.franchiseIndustry;
      const code = `${industry[0]}${industry[1]}`;
  
      uniqueIndustries.set(code, { name: industry, code });
    });
  
    return Array.from(uniqueIndustries.values());
  }
  

const MainFilterComponent = ({franchises}) => {
    const [selectedCategories, debouncedValue, setSelectedCategories] = useDebounce([], 400);
    // const [selectedCategories, setSelectedCategories] = useState(null);
    const [checkboxData, setCheckboxData] = useState({});
    const [rangeSelectorData, setRangeSelectorData] = useState({minValue: 0, maxValue: 100});

    const franchiseCategories = getUniqueFranchiseIndustries(franchises);


    const handleRangeSelectorChange = (minValue, maxValue) => {
        setRangeSelectorData({minValue, maxValue});
    };

    const handleFilterApply = () => {
        console.log("FILTER API")
    }

    return (
        <div className='p-5 sticky top-0 z-10'>
            <section className='border border-[#6366F1] bg-blue-100 rounded p-3 pb-8'>

            <h6 className='text-center font-medium'>Filter Options</h6>
            <div className="form-group flex items-center gap-1 p-5   rounded mt-2">
                <label>Categories:</label>
                <MultiSelect value={selectedCategories}
                    onChange={
                        (e) => {
                            setSelectedCategories(e.value)}
                    }
                    options={franchiseCategories}
                    optionLabel="name"
                    filter
                    placeholder="Select Category"
                    maxSelectedLabels={1}
                    className=""/>
            </div>

            <div className="form-group flex items-center gap-1 p-5   rounded mt-2">
                <label>Investment (INR):</label>
                <RangeSelectorFilter min={0}
                    max={1000000}
                    onChange={handleRangeSelectorChange}
                    className="inline-block relative"
                    />
            </div>
            <div className='form-group flex items-center gap-1 p-5  rounded mt-2'>
              <label>Space (sq. ft):</label>
              <RangeSelectorFilter min={200}
                    max={1000000}
                    onChange={handleRangeSelectorChange}/>
            </div>
            <div className='form-group flex items-center gap-1 p-5   rounded mt-2'>
                <Checkbox onChange={e => setCheckboxData(e.checked)} checked={checkboxData} inputId='customize'></Checkbox>
                <label htmlFor="customize">Customization Option Allowed Only</label>
                
            </div>

            <div className='text-center'>
                <ButtonComponent text={"Apply Filter"} onClick={()=>{
                    console.log("filter applied")
                }}/>
            </div>
                </section>
        </div>
    );
};

export default MainFilterComponent;
