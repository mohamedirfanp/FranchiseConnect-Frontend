
import React, { useRef, useState, useEffect } from 'react';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { Tag } from 'primereact/tag';


import {
    ref,
    uploadBytesResumable,
    getDownloadURL
} from "firebase/storage";

import {storage} from '../../firebaseConfig';


function Step4({handleBack, handleFormData, handleNext, defaultValues, formData}) {
    const toast = useRef(null);
    const [totalSize, setTotalSize] = useState(0);
    const [percent, setPercent] = useState(0);
    const [imageURL, setImageURL] = useState(defaultValues);
    const fileUploadRef = useRef(null);


    const onTemplateSelect = (e) => {
        let _totalSize = totalSize;
        let files = e.files;

        Object.keys(files).forEach((key) => {
            _totalSize += files[key].size || 0;
        });

        setTotalSize(_totalSize);
    };



    const onTemplateRemove = (file, callback) => {
        setTotalSize(totalSize - file.size);
        callback();
    };

    const onTemplateClear = () => {
        setTotalSize(0);
        fileUploadRef.current.clear();
    };

    const headerTemplate = (options) => {
        const { className, chooseButton, uploadButton, cancelButton } = options;
        const value = totalSize / 10000;
        const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';

        return (
            <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
                {chooseButton}
                {uploadButton}
                {cancelButton}
                <div className="flex align-items-center gap-3 ml-auto">
                    <span>{formatedValue} / 1 MB</span>
                    <ProgressBar value={value} showValue={false} style={{ width: '10rem', height: '12px' }}></ProgressBar>
                </div>
            </div>
        );
    };

    const itemTemplate = (file, props) => {
        return (
            <div className="flex align-items-center flex-wrap">
                <div className="flex align-items-center" style={{ width: '40%' }}>
                    <img alt={file.name} role="presentation" src={file.objectURL} width={100} />
                    <span className="flex flex-column text-left ml-3">
                        {file.name}
                        <small>{new Date().toLocaleDateString()}</small>
                    </span>
                </div>
                <Tag value={props.formatSize} severity="warning" className="px-3 py-2" />
                <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger ml-auto" onClick={() => onTemplateRemove(file, props.onRemove)} />
            </div>
        );
    };

    const emptyTemplate = () => {
        return (
            <div className="flex flex-col justify-center items-center flex-column">
                <i className="pi pi-image mt-3 p-5" style={{ fontSize: '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
                <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} className="my-5">
                    Drag and Drop Image Here
                </span>
            </div>
        );
    };

    const onTemplateProgress = () => {
        return (
            <div>
                <ProgressBar value={percent} showValue={false} style={{ height: '12px' }}></ProgressBar>
            </div>
        );
    }

    const chooseOptions = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
    const uploadOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined' };
    const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };


    const handleFileUpload = async (e) => {
        const files = e.files;

        try {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                uploadImageAsPromise(file, i+1)
            }
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'File uploaded successfully' });
            onTemplateClear();
        }
        catch (error) {
            console.error("Error : ", error)
        };
    };

    //Handle waiting to upload each file using promise
    function uploadImageAsPromise(file,index) {
        return new Promise(function (resolve, reject) {
            const storageRef = ref(storage, `/files/${formData.franchise.franchiseName}-file${index}`)

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
                        setImageURL((prevState) => {
                            let newObj = [...prevState];
                            newObj.push(url);
                            return newObj;
                        })
                    });
                }
            );
        });
    }

    function onSubmit()
    {
        handleFormData(imageURL, 4);
        handleNext();
       
    }


    return (
        <div>
            <Toast ref={toast}></Toast>
            <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
            <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
            <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />


            <FileUpload ref={fileUploadRef} name="demo[]" multiple accept="image/*" maxFileSize={1000000}
                onSelect={onTemplateSelect} onError={onTemplateClear} onClear={onTemplateClear}
                headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate}
                chooseOptions={chooseOptions}  cancelOptions={cancelOptions} uploadOptions={uploadOptions}
                customUpload={true}
                uploadHandler={handleFileUpload}
                progressBarTemplate={onTemplateProgress}
                
                 />

            <div className='m-3 flex gap-4 justify-between'>
                <Button label='Back' onClick={() => {
                    handleBack()
                }} />

                {imageURL.length > 0 ?   <Button label='Next' onClick={() => {
                    onSubmit();
                }} /> :   <Button label='Next' disabled />}
              
                
            </div>
        </div>
    );
}

export default Step4;
