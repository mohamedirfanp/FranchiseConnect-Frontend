import React, { useEffect } from 'react';
import { Toast } from 'primereact/toast';
        

function ToastComponent(props) {
    const { status, message} = props;
    const toast = useRef(null);

    const show = (s) => {
        if(status)
        {
            toast.current.show({ severity: 'success', summary: 'Success', detail: `${message}` });
        }
        else
        {
            toast.current.show({ severity: 'error', summary: 'Error', detail: `${message}` });
        }

    useEffect(()=> {
        show();
    }, [])

  return (
    <Toast ref={toast} />
  )
}

export default ToastComponent