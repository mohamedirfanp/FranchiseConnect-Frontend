import React, { useState, useRef, useLayoutEffect } from 'react';
import { InputText } from 'primereact/inputtext';


import { Dialog } from 'primereact/dialog';

import { FileUpload } from 'primereact/fileupload';

import { ProgressBar } from 'primereact/progressbar';

import TicketIcon from '../../assets/ticketIcon.png';
import IssueIcon from '../../assets/issueIcon.jpg'; 

// Firestore import
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where
} from "firebase/firestore";

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import { firebaseDb, storage } from '../../firebaseConfig';

import { getRole } from '../../constants/LocalStorage';

const ChatWindow = ({ ticket, setCurrentTicket, ticketList }) => {

  const [percent, setPercent] = useState(0);

  const [visible, setVisible] = useState(false);

  const fileUploadRef = useRef(null);

  const [role, setRole] = useState("");

  const chatsRef = collection(firebaseDb, "QueryChats");

  const [messages, setMessages] = useState(null);
  const [inputText, setInputText] = useState('');


  useLayoutEffect(() => {
    const currentRole = getRole();
    setRole(currentRole);

    
      const queryMessage = query(chatsRef, where("queryId", "==", ticket.currentTicket.queryId), orderBy('createdAt', 'desc'));
      onSnapshot(queryMessage, (snapshot) => {
        const chats = snapshot.docs.map((doc) => doc.data()).reverse();
        setMessages(chats);
      });
    

  }, [])

  const handleSendMessage = async () => {
    if (inputText === "")
      return;
    await addDoc(chatsRef, {
      message : inputText,
      type: role,
      createdAt: serverTimestamp(),
      queryId: ticket.currentTicket.queryId
    });
    setInputText("");
  };

  const onTemplateClear = () => {
    fileUploadRef.current.clear();
  }

  const handlefileUpload = async (e) => {
    const files = e.files;

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        uploadImageAsPromise(file, i + 1);
      }
      // toast.current.show({ severity: 'success', summary: 'Success', detail: 'File uploaded successfully' });
      onTemplateClear();
      setVisible(false)
    } catch (error) {
      console.error("Error : ", error)
    };

  };

  // Handle waiting to upload each file using promise
  function uploadImageAsPromise(file, index) {
    return new Promise(function (resolve, reject) {
      const storageRef = ref(storage, `/files/QueryPhotos/${ticket.currentTicket.queryId
        }-${file.name
        }`)

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on("state_changed", (snapshot) => {
        const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        // update progress
        setPercent(percent);
      }, (err) => console.log(err), () => { // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setInputText(url);
        });
      });
    });
  }

  const emptyTemplate = () => {
    return (
      <div className="flex flex-col justify-center items-center flex-column">
        <i className="pi pi-image mt-3 p-5"
          style={
            {
              fontSize: '5em',
              borderRadius: '50%',
              backgroundColor: 'var(--surface-b)',
              color: 'var(--surface-d)'
            }
          }></i>
        <span style={
          {
            fontSize: '1.2em',
            color: 'var(--text-color-secondary)'
          }
        }
          className="my-5">
          Drag and Drop Image Here
        </span>
      </div>
    );
  };

  const onTemplateProgress = () => {
    return (
      <div>
        <ProgressBar value={percent}
          showValue={false}
          style={
            { height: '12px' }
          }></ProgressBar>
      </div>
    );
  }

  const getformattedTime = (timeStamp) => {
    if (timeStamp === null) return;
    const date = new Date(timeStamp.seconds * 1000);
    const formattedTime = date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    return formattedTime;


  }


  const sendMessage = () => {
    if (inputText) {
      const newMessage = {
        text: inputText,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setInputText('');
    }
  };

  const goBack = () => {
    // Navigate back to the previous page
    setCurrentTicket(0);
  };

  function getColor(name) {
    if (name === undefined)
      return;
    let hash = 0;
    // give only 100 dark colors
    let colors = [
      "bg-[#DFFF00]",
      "bg-[#FFBF00]",
      "bg-[#FF7F50]",
      "bg-[#DE3163]",
      "bg-[#9FE2BF]",
      "bg-[#40E0D0]",
      "bg-[#6495ED]",
      "bg-[#CCCCFF]",
      "bg-[#FFCCFF]",
      "bg-[#FF99CC]",
      "bg-[#FF6666]",
      "bg-[#FF0000]",
      "bg-[#FF9900]",
      "bg-[#FFFF00]",
      "bg-[#CCFF00]",
      "bg-[#66FF66]",
      "bg-[#00FF00]",
      "bg-[#00FF99]",
      "bg-[#00FFFF]",
      "bg-[#33CCFF]",
      "bg-[#3399FF]",
      "bg-[#6666FF]",
      "bg-[#CC66FF]",
      "bg-[#CC33FF]",
      "bg-[#FF33FF]",
      "bg-[#FF00FF]",
      "bg-[#CC00CC]",
      "bg-[#FF6699]",
      "bg-[#FF0066]",
      "bg-[#FF0033]",
      "bg-[#FF3300]",
      "bg-[#FF6600]",
      "bg-[#FFCC00]",
      "bg-[#CCFF33]",
      "bg-[#66FF33]",
      "bg-[#00FF66]",
      "bg-[#00FFCC]",
      "bg-[#00CCFF]",
      "bg-[#3366FF]",
      "bg-[#6633FF]",
      "bg-[#9933FF]",
      "bg-[#CC00FF]",
      "bg-[#FF00CC]",
      "bg-[#FF0099]",
      "bg-[#CC0066]",
      "bg-[#FF3333]",
      "bg-[#FF6633]",
      "bg-[#FFCC33]",
      "bg-[#CCFF66]",
      "bg-[#66FF66]",
      "bg-[#33FF99]",
      "bg-[#66FFFF]",
      "bg-[#33CCFF]",
      "bg-[#6666CC]",
      "bg-[#9933CC]",
      "bg-[#FF33FF]",
      "bg-[#CC66FF]",
      "bg-[#FF99FF]",
      "bg-[#FF66CC]",
      "bg-[#FF3399]",
      "bg-[#CC0033]",
      "bg-[#FF0000]",
      "bg-[#FF6600]",
      "bg-[#FFCC00]",
      "bg-[#FFFF00]",
      "bg-[#CCFF00]",
      "bg-[#66FF00]",
      "bg-[#00FF00]",
      "bg-[#00FF66]",
      "bg-[#00FFFF]",
      "bg-[#0066FF]",
      "bg-[#0000FF]",
      "bg-[#6600FF]",
      "bg-[#CC00FF]",
      "bg-[#FF00FF]",
      "bg-[#FF00CC]",
      "bg-[#FF0066]",
      "bg-[#FF0000]",
      "bg-[#FF3300]",
      "bg-[#FF9900]",
      "bg-[#FFFF00]",
      "bg-[#CCFF66]",
      "bg-[#66FF66]",
      "bg-[#00FF66]",
      "bg-[#00FFCC]",
      "bg-[#00FFFF]",
      "bg-[#0066FF]",
      "bg-[#6666FF]",
      "bg-[#CC66FF]",
      "bg-[#FF66FF]",
      "bg-[#FF66CC]",
      "bg-[#FF6699]",
      "bg-[#FF6666]",
      "bg-[#FF6600]",
      "bg-[#FF9900]",
      "bg-[#FFFF00]",
      "bg-[#CCFF00]",
      "bg-[#66FF00]",
      "bg-[#00FF00]"
    ];
    for (let i = 0; i < name.length; i++) {
      hash += name.charCodeAt(i);
    }
    return colors[hash % colors.length]
  }

  const uploadOptions = {
    icon: 'pi pi-fw pi-cloud-upload',
    iconOnly: true,
    className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined'
  };
  const cancelOptions = {
    icon: 'pi pi-fw pi-times',
    iconOnly: true,
    className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined'
  };

  return (
    <section className=' h-[100%] overflow-auto bg-[#dcd9d9]'>
      
      <section className='flex flex-col h-full'>
        {/* Message window */}
        <div className='flex items-center justify-start gap-2 p-2 bg-blue-300'>
          <div>
            <button onClick={() => {
              goBack();
            }}>
              <i className='pi pi-arrow-left'></i>
            </button>
          </div>
          <div className={`w-9 h-9 rounded-full flex font-bold items-center justify-center ${getColor("Ticket")}`}>
            {ticket.currentTicket.queryType === 'issue' ? <img src={IssueIcon} /> : <img src={TicketIcon} className='rounded-full' />}
          </div>
          <span className='text-lg font-bold'>{ticket.currentTicket.queryTitle}</span>
        </div>
        {messages !== null && 
        <article className='flex-grow overflow-auto p-5'>
          {messages.map((chat, index) => {
            if (chat.type === role) {
              return (
                <div key={index}
                  className='w-full flex justify-end'>
                  <span className='w-3/4 md:w-1/2 flex justify-end'>
                    {
                      (chat.message.startsWith('https')) ? <div className="max-w-xs mx-1 my-2">
                        <div className="relative p-0 bg-blue-500 text-white rounded-lg rounded-tr-[0%]">
                          <div className="aspect-w-16 aspect-h-9">
                            <img src={
                              `${chat.message}`
                            } alt="Image" className="object-contain overflow-hidden p-2" />
                          </div>
                          <div className="flex justify-end w-full px-2">
                            <span className="block text-xs text-gray-300 mt-1">{getformattedTime(chat.createdAt)}</span>
                          </div>
                        </div>
                        <div className="absolute top-0 left-0 w-0 h-0 border-t-8 border-l-8 border-transparent transform -translate-x-full -translate-y-1/2"></div>
                      </div> : <div className="flex items-start justify-end">
                        <div className="max-w-xs mx-1 my-2">
                          <div className="relative p-1 bg-blue-500 text-white rounded-lg rounded-tr-[0%]">
                            <span className="block p-2">{chat.message}</span>
                            <div className='flex justify-end w-full'>
                              <span className=" block text-xs text-gray-300 mt-1">{getformattedTime(chat.createdAt)}</span>
                            </div>
                          </div>
                          <div className="absolute top-0 left-0 w-0 h-0 border-t-8 border-l-8 border-transparent transform -translate-x-full -translate-y-1/2"></div>
                        </div>
                      </div>
                    } </span>
                </div>
              )
            } else {
              return (
                <div key={index}
                  className='w-full flex justify-start'>
                  <span className='w-3/4 md:w-1/2 flex justify-start'>
                    {
                      (chat.message.startsWith('https')) ? <div className="aspect-w-16 aspect-h-9">
                        <img src={
                          `${chat.message
                          }`
                        } alt="Image" className="object-contain overflow-hidden p-2" />
                      </div> : <div className="flex items-start justify-end">
                        <div className="max-w-xs mx-1 my-2">
                          <div className="relative p-0 bg-blue-500 text-white rounded-lg rounded-tl-[0%]">
                            <span className="block p-2">{chat.message}</span>
                            <div className='flex justify-end w-full px-2'>
                              <span className=" block text-xs text-gray-300 mt-1">{getformattedTime(chat.createdAt)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    } </span>
                </div>
              )
            }
          })}
        </article>
}
        <div className='relative'>
          {/* File Upload Dialog */}
          <Dialog header="File Upload"
            visible={visible}
            style={
              { width: '75vw' }
            }
            draggable={false}
            resizable={false}
            onHide={
              () => setVisible(false)
            }>
            <FileUpload name="demo[]"
              ref={fileUploadRef}
              accept="image/*"
              maxFileSize={1000000}
              emptyTemplate={emptyTemplate}
              progressBarTemplate={onTemplateProgress}
              customUpload
              uploadHandler={handlefileUpload}
              style={
                { color: 'black' }
              }
              cancelOptions={cancelOptions}
              uploadOptions={uploadOptions} />
          </Dialog>
        </div>
        {/* Send Message Box */}
        {ticketList[ticket.index].status ? <article className='w-full'>
          <div className='flex p-2 gap-1 sm:gap-2 w-full'>
            <div className='flex-grow'>
              <InputText
                className='w-full m-0'
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
            </div>
            <div className='flex gap-1 sm:gap-2'>
              <div className=''>
                <button
                  className='add bg-[#6366F1] w-8 sm:w-12 h-12 rounded-md '
                  onClick={() => {
                    // Handle file upload
                    setVisible(true);
                  }}
                >
                  <i className='pi pi-paperclip'></i>
                </button>
              </div>
              <div className=''>
                <button
                  className='add bg-[#6366F1] w-8 sm:w-12 h-12 rounded-md'
                  onClick={() => {
                    handleSendMessage();
                  }}
                >
                  <i className='pi pi-send'></i>
                </button>
              </div>
            </div>
          </div>
        </article> : <p className='font-semibold text-red-600 text-lg text-center'>Ticket is Closed</p>}

      </section>
      
    </section>
  );
};

export default ChatWindow;
