import React, { useLayoutEffect, useRef, useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { useForm, Controller } from 'react-hook-form';
import { Toast } from 'primereact/toast'

import { GetProfile, ChangePassword, UpdateProfile } from '../../api/AccountApi/accountApi';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';

import ErrorComponent from '../../components/ErrorComponent/ErrorComponent';

import { ProgressBar } from 'primereact/progressbar';

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import { storage } from '../../firebaseConfig';

import ToastMessage from '../../components/ToastComponent/Toast';

import { FileUpload } from 'primereact/fileupload';

import {Logout} from '../../constants/LocalStorage';
import { useNavigate } from 'react-router';


function AccountComponent({ role, setShowFranchise }) {
    const [isEditing, setIsEditing] = useState(false);

    const [profileUrl, setProfileUrl] = useState(null);
    const [visible, setVisible] = useState(false);
    const [profile, setProfile] = useState(null);
    
    const [error, setError] = useState(null);

    const toast = useRef(null)

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const navigate = useNavigate();




    function uploadImageAsPromise(file, index) {
        return new Promise(function (resolve, reject) {
          const storageRef = ref(storage, `/files/ProfilePhoto/${profile.UserId}-${file.name
            }`)
    
          const uploadTask = uploadBytesResumable(storageRef, file);
    
          uploadTask.on("state_changed", (snapshot) => {
            const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

          }, (err) => console.log(err), () => { // download url
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                setProfileUrl(url);
                ToastMessage(true,"Profile Pic Uploaded successfully. Please Press Save Button", toast)
                console.log(url)
            });
          });
        });
      }


    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
        watch
      } = useForm();

      const onSubmit = (data) => {
        console.log(data);
        // Perform password change logic
        ChangePassword({oldPassword : data.oldPassword, newPassword : data.newPassword})
        .then((response) => {
            console.log(response);
            setVisible(false);
            ToastMessage(true, "Password Changed Successfully", toast)
            reset({
                oldPassword : '',
                newPassword : '',
                confirmPassword : ''
            })
            Logout();
            setTimeout(() => {

                if(role === 'franchisee')
                navigate('/franchisee/login');
                else
                navigate('/franchisor/login')
            }, 2000)

        })
        .catch((error) => {
            console.error(error);
            setError(error.response);
        })
      };

    
    const handleSaveClick = async () => {
        setIsEditing(false);
        profile.profilePhotoUrl = profileUrl;
        try
        {
            const response = await  UpdateProfile({...profile});
    
            if(!response) return;

            ToastMessage(true, response.data.value.response, toast)
        }
        catch(error)
        {
            console.error(error)

        }

        // Perform save operation
    };

    const handleUploadFile = (e) => {
        const file = e.files[0];
        console.log(file);
        uploadImageAsPromise(file, 1);
    }

    const getProfile = async () => {
        const response = await GetProfile();
        if (!response) return;
        setProfile(response.data.response);
        setProfileUrl(response.data.response.profilePhotoUrl);
    };

    useLayoutEffect(() => {
        getProfile();
    }, []);

    return (
        <section className='flex justify-center'>
            <Toast ref={toast} />
            <div className='flex w-full flex-col md:flex-row'>
                {/* Profile Photo Circle */}
                <div className='flex justify-center items-center w-full md:w-1/2 flex-col gap-5 mt-5 sm:mt-0'>
                    <div className='w-60 h-60 rounded-full bg-white'>
                        { profile &&
                            profileUrl !== '' ?  <img src={`${profileUrl}`} className='w-full h-full object-cover rounded-full' /> : 
                            <img src='https://via.placeholder.com/50' alt='Profile' className='w-full h-full object-cover rounded-full' />
                        }
                    </div>
                    <div>
                        {isEditing && <FileUpload mode="basic" name="demo[]"  accept="image/*" maxFileSize={1000000}  auto chooseLabel="Browse" customUpload uploadHandler={handleUploadFile}/>}
                    </div>
                </div>
                {/* Dialog For change Password */}
                <div>
                    <Dialog header='Change Password' visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)} draggable={false} resizable={false}>
                        {/* Form for changing password */}
                        <form onSubmit={handleSubmit(onSubmit)} className='p-fluid flex flex-col'>
                            <div className='p-field m-2'>
                                <label htmlFor='oldPassword'>Old Password<span className='text-red-500 font-semibold '>*</span></label>
                                <Controller
                                    control={control}
                                    name='oldPassword'
                                    rules={{ required: 'Old password is required' }}
                                    render={({ field }) => (
                                        <InputText id='oldPassword' type='password' {...field} />
                                    )}
                                />
                                {errors.oldPassword && <p className='error-message text-red-600'>*{errors.oldPassword.message}</p>}
                            </div>
                            <div className='p-field m-2'>
                                <label htmlFor='newPassword'>New Password<span className='text-red-500 font-semibold '>*</span></label>
                                <Controller
                                    control={control}
                                    name='newPassword'
                                    rules={{ required: 'New password is required' }}
                                    render={({ field }) => (
                                        <InputText id='newPassword' type='password' {...field} />
                                    )}
                                />
                                {errors.newPassword && <p className='error-message text-red-600'>*{errors.newPassword.message}</p>}
                            </div>
                            <div className='p-field m-2'>
                                <label htmlFor='confirmPassword'>Confirm Password<span className='text-red-500 font-semibold '>*</span></label>
                                <Controller
                                    control={control}
                                    name='confirmPassword'
                                    rules={{
                                        required: 'Confirm password is required',
                                        validate: (value) =>
                                            value === watch('newPassword') || 'Passwords do not match'
                                    }}
                                    render={({ field }) => (
                                        <InputText id='confirmPassword' type='password' {...field} />
                                    )}
                                />
                                {errors.confirmPassword && (
                                    <p className='error-message text-red-600'>*{errors.confirmPassword.message}</p>
                                )}
                            </div>
                            {/* Add any validation error messages */}
                            <div  className='m-2'>
                            {error !== null && <ErrorComponent message={error}/>}

                            </div>
                            <ButtonComponent type='submit' text={'Submit'} />
                        </form>
                    </Dialog>
                </div>
                {/* Account Info Card */}
                {profile !== null && (
                    <div className='mt-8 mx-auto w-full flex justify-center'>
                        <Card header={<h1 className='font-bold text-lg text-center'>Account Info</h1>} className='w-3/4'>
                            <div className='flex flex-col gap-8 justify-center items-center'>
                                <div>
                                    <span className='p-float-label'>
                                        <InputText id='name' disabled={!isEditing} value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
                                        <label htmlFor='name'>Name</label>
                                    </span>
                                </div>
                                <div>
                                    <span className='p-float-label'>
                                        <InputText id='phoneNumber' disabled={!isEditing} value={profile.phoneNumber} onChange={(e) => setProfile({ ...profile, phoneNumber: e.target.value })} keyfilter="int" />
                                        <label htmlFor='phoneNumber'>Phone Number</label>
                                    </span>
                                </div>
                                <div>
                                    <span className='p-float-label'>
                                        <InputText id='email' disabled value={profile.email} />
                                        <label htmlFor='email'>Email</label>
                                    </span>
                                </div>
                            </div>
                            <div className='flex gap-5'>
                                <div className='mt-4 flex justify-center gap-4 items-center w-full'>
                                    {isEditing ? (
                                        <Button label='Save'  onClick={handleSaveClick} />
                                    ) : (
                                        <Button label='Edit' className='h-full' icon='pi pi-pencil' onClick={handleEditClick} />
                                    )}
                                    <ButtonComponent text={'Change Password'} onClick={() => setVisible(true)} />
                                    <ButtonComponent text={'Show Franchise'} onClick={() => setShowFranchise((prevState) => !prevState)} />
                                    
                                </div>
                            </div>
                        </Card>
                    </div>
                )}
            </div>
        </section>
    );
}

export default AccountComponent;
