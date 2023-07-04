


function ToastMessage(status, message,toast) {

    const show = () => {
        if(status)
        {
            toast.current.show({ severity: 'success', summary: 'Success', detail: `${message}` });
        }
        else
        {
            toast.current.show({ severity: 'error', summary: 'Error', detail: `${message}` });
        }

    }

    show();


    
}

export default ToastMessage;