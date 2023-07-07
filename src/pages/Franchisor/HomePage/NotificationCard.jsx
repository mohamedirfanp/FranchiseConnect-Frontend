import { Card } from 'primereact/card'
import React, { useState } from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

function NotificationCard() {

    const [conversation, setConversations] = useState([{
        name: 'Username 1',
        message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
      },
      {
        name: 'Username 2',
        message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
      },]);

    const header = (
        <span className='text-lg font-semibold'>
            <p className='text-center'>Notifications</p>
        </span>
    )

    return (
        <section className='m-5'>
            <Card header={header}>
                <section>
                    <div className="card">
                        <DataTable value={conversation} >
                            <Column field="name" header="Name"></Column>
                            <Column field="message" header="Message"></Column>
                            <Column header="Go to Chat" body={<Button icon='pi pi-arrow-right' />}>
                            </Column>
                        </DataTable>

                    </div>
                </section>
            </Card>
        </section>
    )
}

export default NotificationCard;