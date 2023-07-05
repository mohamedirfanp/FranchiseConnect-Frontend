import React, { useState } from "react";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { Card } from "primereact/card";



function Step5({handleFormSubmit, handleBack}) {

    const [checked, setChecked] = useState(false);


    return (
        <div className="sm:ml-10">
            <Card className="text-center flex justify-center gap-8">
            <h1 className="text-center font-extrabold text-3xl">Confirmation</h1>
            <div className="card flex justify-center w-full gap-5 flex-col">
                <span>

                <Checkbox onChange={e => setChecked(e.checked)} checked={checked}></Checkbox>
                I agree to the terms and conditions of this service
                </span>
            <span className="flex gap-3 justify-center" >
                <Button label="Back" onClick={handleBack} />
            {checked ? <Button label='Submit' onClick={handleFormSubmit} /> : <Button label='Submit' disabled />}

            </span>
            </div>

            </Card>
        </div>
    )
}

export default Step5