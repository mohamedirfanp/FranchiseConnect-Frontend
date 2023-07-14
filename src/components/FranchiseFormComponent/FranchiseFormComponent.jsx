import React, { createContext, useRef, useState } from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';


import ToastMessage from '../ToastComponent/Toast' 

import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import {CreateFranchise} from '../../api/Franchisor/franchiseApi';
import Step5 from './Step5';
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from 'primereact/progressspinner';

import { useNavigate } from 'react-router';


import {setFranchiseExist} from '../../constants/LocalStorage';

const steps = ['Enter the Franchise Details', 'Enter the Social Links', 'Enter the Services', "Upload the Photos", "Confirmation"];



// export const FormContext = createContext();

export default function HorizontalLinearStepper() {

    const toast = useRef();
  const [activeStep, setActiveStep] = React.useState(0);

  const navigate = useNavigate();
    

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    franchise: {
      franchiseName: "",
      franchiseIndustry: "",
      franchiseSegment: "",
      franchiseAbout: "",
      franchiseInvestment: "",
      franchiseFee: "",
      franchiseSpace: "",
      franchiseCurrentCount: "",
      franchisePreferredExpansionLocation: "",
      franchiseSampleBoxOption: false,
      franchiseCustomizedOption: false,
    },
    franchiseSocialRequest: {
      franchiseEmail: "",
      franchiseWebsite: "",
      franchiseFacebook: "",
      franchiseTwitter: "",
      franchiseInstagram: "",
    },
    galleryRequestList: [],
    franchiseServiceRequestsList: [
      {
        franchiseProvideServiceName: "",
        franchiseProvideServiceDescription: "",
        franchiseCustomizationAllowed: false,
      },
    ],
  });
  

  const handleFormData = (data, number) => {
    switch (number) {
      case 1:
        setFormData((prevState) => {
          let newObj = { ...prevState };
          newObj.franchise = data;
          return newObj;
        });
        break;
      case 2:
        setFormData((prevState) => {
          let newObj = { ...prevState };
          newObj.franchiseSocialRequest = data;
          return newObj;
        });
        break;
      case 3:
        setFormData((prevState) => {
            let newObj = { ...prevState };
            newObj.franchiseServiceRequestsList = data;
            return newObj;
          });
       
        break;
      case 4:
        setFormData((prevState) => {
            let newObj = { ...prevState };
            newObj.galleryRequestList = data;
            return newObj;
          });
        break;
      default:
        break;
    }
  };
  
  

  const handleNext = () => {

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


  const handleFormSubmit = () => {
    setLoading(true);
    formData.franchise.franchisePreferredExpansionLocation = formData.franchise.franchisePreferredExpansionLocation.join(',')
    formData.franchise.franchiseInvestment = `${formData.franchise.franchiseInvestment}`
    formData.franchise.franchiseFee  = `${formData.franchise.franchiseFee}`
    formData.franchise.franchiseSpace = `${formData.franchise.franchiseSpace}`
    CreateFranchise(formData)
    .then((response) => {
        console.log(response);
        setLoading(false);
        ToastMessage.show(true,response.data.response, toast)
        setFranchiseExist('true');
        setTimeout(() => {
            navigate('/franchisor/dashboard');
        },2000)
    })
    .catch((error) => {
        console.error(error)
    })
    
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
                <Step1 handleNext={handleNext} handleFormData={handleFormData} defaultValues={formData.franchise}/>
        )
      case 1:
        return (<Step2  handleBack={handleBack} handleFormData={handleFormData} handleNext={handleNext} defaultValues={formData.franchiseSocialRequest}  />);
      case 2:
        return <Step3 handleBack={handleBack} handleFormData={handleFormData} handleNext={handleNext}  defaultValues={formData.franchiseServiceRequestsList}/>
      case 3:
        return <Step4 handleBack={handleBack} handleFormData={handleFormData} handleNext={handleNext} defaultValues={formData.galleryRequestList} formData={formData} />
      case 4:
        return <Step5 handleFormSubmit={handleFormSubmit} handleBack={handleBack} />
    default:
        return 'Unknown step';
    }
  };

  return (
    <>
    <Toast ref={toast} />
    {
        loading?  <div className="card flex justify-center w-screen z-50 items-center ">
        <ProgressSpinner />
    </div> :  <section className='w-screen h-screen'>
    
    <section className='w-full'>
        <h3 className="text-center mb-8 font-medium text-xl">Enter your Franchise Details</h3>
        <section className='w-1/2 sm:w-full pl-5'>

      <Stepper activeStep={activeStep} >
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
        </section>
      <div className='w-3/4  h-fit m-5 '>
        {getStepContent(activeStep)}
      </div>
        
    </section>

    </section>
    }

   
    </>

  );
}
