import React, { useState } from 'react';

const CheckboxFilter = () => {
  const [checkedItems, setCheckedItems] = useState({});

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCheckedItems((prevCheckedItems) => ({ ...prevCheckedItems, [name]: checked }));
  };

  return (
    <div>
      <h3>Checkbox Filter</h3>
      <label>
        <input
          type="checkbox"
          name="Option 1"
          checked={checkedItems['Option 1'] || false}
          onChange={handleCheckboxChange}
        />
        Option 1
      </label>
      <label>
        <input
          type="checkbox"
          name="Option 2"
          checked={checkedItems['Option 2'] || false}
          onChange={handleCheckboxChange}
        />
        Option 2
      </label>
      <label>
        <input
          type="checkbox"
          name="Option 3"
          checked={checkedItems['Option 3'] || false}
          onChange={handleCheckboxChange}
        />
        Option 3
      </label>
      
    </div>
  );
};

export default CheckboxFilter;
