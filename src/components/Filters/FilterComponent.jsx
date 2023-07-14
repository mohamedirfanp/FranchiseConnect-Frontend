import React, { useState } from 'react';


import RangeSelectorFilter from './RangeSelectorFilter.jsx';

import ButtonComponent from '../ButtonComponent/ButtonComponent.jsx';

import { MultiSelect } from 'primereact/multiselect';
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


const MainFilterComponent = ({ franchises, setCopyFranchises }) => {
    const [selectedCategories, debouncedValue, setSelectedCategories] = useDebounce([], 400);
    // const [selectedCategories, setSelectedCategories] = useState(null);
    const [checkboxData, setCheckboxData] = useState(false);
    const [rangeInvestmentSelectorData, setRangeInvestmentSelectorData] = useState({ minValue: 0, maxValue: 1000000000 });
    const [rangeSpaceSelectorData, setRangeSpaceSelectorData] = useState({ minValue: 200, maxValue: 100000 });

    const franchiseCategories = getUniqueFranchiseIndustries(franchises);


    const handleRangeInvestmentSelectorChange = (Value) => {
        setRangeInvestmentSelectorData(Value);
    };

    const handleRangeSpaceSelectorChange = (Value) => {
        setRangeSpaceSelectorData(Value);
    }

    const handleFilterApply = () => {

        const filteredFranchises = franchises.filter((franchise) => {
            const {
                franchiseInvestment,
                franchiseSpace,
                franchiseCustomizedOption,
            } = franchise.franchise;
            
            // Filter based on checkboxData
            if (checkboxData && !franchiseCustomizedOption) {
                return false;
            }
            // Filter based on selectedCategories
            if (
                selectedCategories.length > 0 &&
                !selectedCategories.some((category) => category.name === franchise.franchise.franchiseIndustry)
            ) {
                return false;
            }
            // Filter based on rangeInvestmentSelectorData
            if (
                parseInt(franchiseInvestment) < rangeInvestmentSelectorData.min ||
                parseInt(franchiseInvestment) > rangeInvestmentSelectorData.max
            ) {
                return false;
            }
            // Filter based on rangeSpaceSelectorData
            if (
                parseInt(franchiseSpace) < rangeSpaceSelectorData.min ||
                parseInt(franchiseSpace) > rangeSpaceSelectorData.max
            ) {
                return false;
            }
            return true;
        });
        console.log(filteredFranchises)
        setCopyFranchises( filteredFranchises
          );
    };


    return (
        <div className='p-5 sticky top-0 z-10 h-full'>
            <section className='border border-[#6366F1] bg-blue-100 rounded p-3 pb-8'>

                <h6 className='text-center font-medium'>Filter Options</h6>
                <div className="form-group flex items-center gap-1 p-5  flex-col lg:flex-row rounded mt-2">
                    <label>Categories:</label>
                    <MultiSelect value={selectedCategories}
                        onChange={
                            (e) => {
                                setSelectedCategories(e.value)
                            }
                        }
                        options={franchiseCategories}
                        optionLabel="name"
                        filter
                        placeholder="Select Category"
                        maxSelectedLabels={1}
                        className="" />
                </div>

                <div className="form-group flex items-center gap-1 p-5   rounded mt-2 flex-col lg:flex-row ">
                    <label>Investment (INR):</label>
                    <RangeSelectorFilter min={0}
                        max={10000000}
                        onChange={handleRangeInvestmentSelectorChange}
                        className="inline-block relative"
                    />
                </div>
                <div className='form-group flex items-center gap-1 p-5 mt-5 lg:mt-2 rounded flex-col lg:flex-row '>
                    <label>Space (sq. ft):</label>
                    <RangeSelectorFilter min={100}
                        max={10000}
                        onChange={handleRangeSpaceSelectorChange} />
                </div>
                <div className='form-group flex items-center gap-1 p-5   rounded mt-5 lg:mt-2 '>
                    <Checkbox onChange={e => setCheckboxData(e.checked)} checked={checkboxData} inputId='customize'></Checkbox>
                    <label htmlFor="customize">Customization Option Allowed Only</label>

                </div>

                <div className='text-center flex-col'>
                    <ButtonComponent text={"Apply Filter"} onClick={() => {
                        handleFilterApply();
                    }} />
                </div>
            </section>
        </div>
    );
};

export default MainFilterComponent;
