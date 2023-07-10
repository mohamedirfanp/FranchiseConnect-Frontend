
import { useState, useRef, useEffect, useLayoutEffect } from "react";
import './SupportPage.css'

import { Card } from "primereact/card";
import { TabView, TabPanel } from "primereact/tabview";

import { useForm, Controller, reset } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";

import { CreateTicket, GetTicketForUser } from '../../api/SupportApi/SupportApi'
import ChatWindow from "./ChatWindow";

import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

import ToastMessage from '../../components/ToastComponent/Toast';
import { Toast } from 'primereact/toast';

import IssueIcon from '../../assets/issueIcon.jpg';
import TicketIcon from '../../assets/ticketIcon.png';

function SupportPage() {
  const [isShow, setIsShow] = useState(false);
  const [activeIndex, setActiveIndex] = useState(1);
  const [ticket, setTicket] = useState(0);

  const [state, setChangeState] = useState(0);

  const [ticketList, setTicketList] = useState([]);

  const toast = useRef(null);


  const toggle = () => {
    setIsShow((prev) => {
      return !prev;
    });
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const ticketTypes = [
    { label: 'Issue', value: 'issue' },
    { label: 'Ticket', value: 'ticket' },
  ];

  const getAllTicket = async () => {
    const response = await GetTicketForUser();
    if(!response) return;
    setTicketList(response.data.tickets);

  }

  useLayoutEffect(() => {
    getAllTicket();
  }, [])

  useEffect(() => {
    if(state !== 0)
    {
      setActiveIndex(1);
      getAllTicket();
    }
  }, [state])

  const onSubmit = (data) => {
    console.log(data);
    // Submit form data
    CreateTicket({
      queryTitle: data.ticketTitle,
      queryType: data.ticketType,
      queryDescription: data.ticketDescription
    })
      .then((response) => {
        console.log(response);
        ToastMessage(true, response.data.value.response, toast);
        setChangeState(1);
        // Clear the form data
        reset({
          ticketTitle: "",
          ticketType: null,
          ticketDescription: ""
        });
      })
      .catch((error) => {
        console.error(error);
      })

  };
  const setCurrentTicketi = (value) => {
    setTicket(value)
  }



  const form = (
    <form onSubmit={handleSubmit(onSubmit)} className=' h-full oveflow-auto'>
      <div className="p-fluid flex gap-3 flex-col">
        <div className="p-field">
          <label htmlFor="ticketTitle">Ticket Title</label>
          <Controller
            name="ticketTitle"
            control={control}
            rules={{ required: "Ticket Title is required" }}
            render={({ field }) => (
              <InputText
                id="ticketTitle"
                {...field}
                className={
                  errors.ticketTitle ? "p-invalid" : ""
                }
              />
            )}
          />
          {errors.ticketTitle && (
            <small className="p-error">
              {errors.ticketTitle.message}
            </small>
          )}
        </div>

        <div className="p-field">
          <label htmlFor="ticketType">Ticket Type</label>
          <Controller
            name="ticketType"
            control={control}
            rules={{ required: "Ticket Type is required" }}
            render={({ field }) => (
              <Dropdown
                id="ticketType"
                {...field}
                options={ticketTypes}
                className={errors.ticketType ? "p-invalid" : ""}
              />
            )}
          />
          {errors.ticketType && (
            <small className="p-error">
              {errors.ticketType.message}
            </small>
          )}
        </div>

        <div className="p-field">
          <label htmlFor="ticketDescription">
            Ticket Description
          </label>
          <Controller
            name="ticketDescription"
            control={control}
            rules={{
              required: "Ticket Description is required",
            }}
            render={({ field }) => (
              <InputTextarea
                id="ticketDescription"
                {...field}
                rows={5}
                className={
                  errors.ticketDescription ? "p-invalid" : ""
                }
              />
            )}
          />
          {errors.ticketDescription && (
            <small className="p-error">
              {errors.ticketDescription.message}
            </small>
          )}
        </div>
        <div className='grow'></div>
        <ButtonComponent text={"Submit"} type="submit" />
      </div>
    </form>
  );

  return (
    <>
      <Toast ref={toast} />
      <section className={`sm:w-1/3  fixed z-50`}>

        <div className="relative support">
          <button onClick={toggle} className='w-10 h-10 fixed bg-white right-0 bottom-0 m-3 rounded-full border border-black overflow-hidden z-50 '>
            {(!isShow) ? <img
              src="https://th.bing.com/th/id/R.4a9d44a4e84747461232d21bc000841d?rik=qhpYYTZBlYPjug&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_507470.png&ehk=hYyJzF65XnZdPbWpL38KPvm49wPgs510Kv9mGS6ZzYA%3d&risl=&pid=ImgRaw&r=0"
              className="object-cover"
              alt="Support"
            ></img> : <div>
              <i className="pi pi-arrow-down" />
            </div>}
          </button>
          
            {isShow && (
          <div className="fixed bottom-16 h-[calc(100%-4rem)] md:h-[calc(90%)] lg:h-[80%] w-[100%] md:w-1/2 right-0 md:right-3 lg:w-[500px] p-0 md:ml-0 z-50">
              <Card title="Customer Support" className="h-full">
                {ticket === 0 && <section className="h-[95%]">
                  <TabView activeIndex={activeIndex} className="overflow-auto h-full w-full sticky top-0 ">
                    <TabPanel header="Raise a Ticket" >
                      <div className=' max-h-[80%] flex flex-col overflow-auto'>

                        {form}
                      </div>

                    </TabPanel>
                    <TabPanel header="Conversations" className="p-tabview-selected h-full">
                       <section className=" overflow-auto flex flex-col w-full">
                        { ticketList && 
                          ticketList.map((ticket,index) => {
                            return <button className="hover:bg-slate-200 p-2" onClick={() => {
                              setTicket({
                                currentTicket : ticket,
                                index : index
                              });
                            }} key={index}>
    
                              <div className="flex items-center gap-3 w-36 sm:w-64 md:w-72">
                                <div className="w-10 h-10 rounded-full">

                                  {ticket.queryType !== 'issue' ? <img src={TicketIcon} className="object-fit rounded-full"/> : <img src={IssueIcon} className="object-fit rounded-full"/> }
                                  
                                </div>
                                <span>
                                  <p>{ticket.queryTitle} </p>
                                  <article className="font-thin">
                                    <p className="flex justify-start">{ticket.status ? <span className="text-green-500">Open</span> : <span className="text-red-500">Closed</span>}</p>
                                  </article>
                                </span>
                              </div>
    
                            </button>
                          })
                        }
                      </section>
                    </TabPanel>
                  </TabView>
                </section>}

                {ticket !== 0 && <section className='h-[95%]'>
                  <ChatWindow className='h-full' ticket={ticket} ticketList={ticketList} setCurrentTicket={setCurrentTicketi}></ChatWindow>
                </section>}


              </Card>
          </div>
            )}
        </div>
      </section>
    </>

  );
}

export default SupportPage;
