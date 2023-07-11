import { Card } from 'primereact/card';
import React, { useEffect, useRef, useState } from 'react';
import GalleriaComponent from '../../components/GalleriaComponent/GalleriaComponent';
import { FileUpload } from 'primereact/fileupload';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';

import ToastMessage from '../../components/ToastComponent/Toast';

import {DeleteGallery, UploadGallery} from '../../api/Franchisor/franchiseApi';


import {
    ref,
    uploadBytesResumable,
    getDownloadURL
} from "firebase/storage";

import {storage} from '../../firebaseConfig';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router';

function AccountGalleryComponent({ galleryList, franchise, getFranchiseDetail }) {
    const toast = useRef(null);
    const [gallery, setGallery] = useState(galleryList);
    const [deleteGalleryId, setDeleteGalleryId] = useState([]);
    const [uploadGalleryUrl, setUploadGalleryUrl] = useState([]);
    const [visible, setVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const navigate = useNavigate();

    const [percent, setPercent] = useState(0);
    const fileUploadRef = useRef(null);


    const handleOnSubmit =  () => {
        console.log(gallery);
        console.log(deleteGalleryId);
        deleteGalleryId.map(async (deleteId) => {
            const response = await DeleteGallery(deleteId);
            if(!response) return;
            console.log(response);
        })
        let franchiseId = franchise.franchiseId;


        uploadGalleryUrl.map(async (uploadUrl) => {
            const response = await UploadGallery({
                franchiseId: franchiseId,
                franchisePhotoUrl: uploadUrl
              })
              if(!response) return
        })

        ToastMessage(true, "Successfully Updated Details", toast);
        setTimeout(() => {
            navigate(window.location.pathname);
        },2000)
    };

    const handleOnDelete = (franchiseGalleryId) => {
        setGallery((prevGallery) =>
            prevGallery.filter((photo) => photo.franchiseGalleryId !== franchiseGalleryId)
        );
        setDeleteGalleryId((prevState) => [...prevState, franchiseGalleryId]);
    };

    const handleFileUpload = async (e) => {
        const files = e.files;

        try {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                uploadImageAsPromise(file, i+1)
            }
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'Files uploaded successfully' });
            // onTemplateClear();
            fileUploadRef.current.clear();
        }
        catch (error) {
            console.error("Error : ", error)
        };
    };

    //Handle waiting to upload each file using promise
    function uploadImageAsPromise(file,index) {
        return new Promise(function (resolve, reject) {
            const storageRef = ref(storage, `/files/${franchise.franchiseName}-file${index}`)

            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const percent = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    // update progress
                    setPercent(percent);
                },
                (err) => console.log(err),
                () => {
                    // download url
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        
                        setUploadGalleryUrl((prevState) => {
                            let newObj = [...prevState];
                            newObj.push(url);
                            return newObj;
                        })
                    });
                }
            );
        });
    }

    const onTemplateProgress = () => {
        return (
            <div>
                <ProgressBar value={percent} showValue={false} style={{ height: '12px' }}></ProgressBar>
            </div>
        );
    }

    const footer = (
        <div className='flex gap-5'>
            {isEditing && (
                <>
                    <ButtonComponent text={"Delete Photos"} onClick={() => setVisible(true)} />
                    <ButtonComponent text={"Save"} onClick={handleOnSubmit} />
                </>
            )}
            <ButtonComponent text={isEditing ? "Cancel" : "Edit"} onClick={() => setIsEditing((prevIsEditing) => !prevIsEditing)} />
        </div>
    );

    const uploadOptions = {
        icon: 'pi pi-fw pi-cloud-upload',
        iconOnly: true,
        className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined',
    };
    const cancelOptions = {
        icon: 'pi pi-fw pi-times',
        iconOnly: true,
        className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined',
    };

    return (
        <section className='w-full flex justify-center'>
            <Toast ref={toast} />
            <div className='w-3/4'>
                <Dialog
                    header="Delete Photos"
                    visible={visible}
                    style={{ width: '50vw' }}
                    onHide={() => setVisible(false)}
                    draggable={false}
                    resizable={false}
                >
                    <div className='flex flex-col flex-wrap gap-5 w-full'>
                        {gallery.map((photo) => (
                            <div className='flex gap-5 h-full' key={photo.franchiseGalleryId}>
                                <img src={photo.franchisePhotoUrl} alt='Gallery Photo' />
                                {isEditing && (
                                    <span className='flex max-h-full justify-center items-center'>
                                        <Button
                                            icon='pi pi-trash'
                                            severity='danger'
                                            onClick={() => handleOnDelete(photo.franchiseGalleryId)}
                                        />
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </Dialog>
                <Card header={<><h1 className='text-center font-bold text-xl'>Gallery Details</h1></>} footer={footer}>
                    <div>
                        <GalleriaComponent gallery={gallery} />
                    </div>
                    {isEditing && (
                        <div className='card'>
                            <FileUpload
                                ref={fileUploadRef}
                                name='demo[]'
                                multiple
                                accept='image/*'
                                maxFileSize={1000000}
                                emptyTemplate={<p className='m-0'>Drag and drop files here to upload.</p>}
                                customUpload
                                uploadHandler={handleFileUpload}
                                uploadOptions={uploadOptions}
                                cancelOptions={cancelOptions}
                                progressBarTemplate={onTemplateProgress}
                            />
                        </div>
                    )}
                </Card>
            </div>
        </section>
    );
}

export default AccountGalleryComponent;
