import { Card } from 'primereact/card'
import React, { useEffect, useState } from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';


// Firestore import
import {
	collection,
	limit,
	onSnapshot,
	orderBy,
	query,
	where,
} from "firebase/firestore";

import { firebaseDb } from '../../firebaseConfig';
import { useNavigate } from 'react-router';

function NotificationCard({queriesData}) {

    
	const navigate = useNavigate();
	
    const [queries, setQueries] = useState(queriesData);

	const chatsRef = collection(firebaseDb, "QueryChats");

	const header = (
		<span className='text-lg font-semibold'>
			<p className='text-center'>Notifications</p>
		</span>
	);

	useEffect(() => {

        const recentQueries = queries.slice(-3);
        setQueries(recentQueries)

		const fetchConversations = () => {
			try {

				// Fetch the last chat message for each conversation
				for (let index = queries.length-1; index > queries.length - 4; index--) {
                    const query = queries[index];
					getLastChat(query.queryId);
                    
                }
	
			} catch (error) {
				console.error(error);
			}
		};

		fetchConversations();
	}, []);

	const getLastChat = (queryId) => {
		const queryMessage = query(
			chatsRef,
			where("queryId", "==", queryId),
			orderBy("createdAt", "desc"),
			limit(1)
		);

		onSnapshot(queryMessage, (snapshot) => {
			const chatDocs = snapshot.docs.map((doc) => doc.data());
			const lastChat = chatDocs[0] !== undefined ? chatDocs[0] : {message : 'No Message'};
            console.log(lastChat)
			setQueries((prevQuery) =>
            {

                return prevQuery.map((query) =>
                query.queryId === queryId
                        ? { ...query, lastMessage: lastChat.message }
                        : query
                )
            }
				);
		});
	};


  return (
    <section className='m-5'>
    <Card header={header}>
        <section>
            <div className='card'>
                <DataTable value={queries}>
                    <Column field='queryTitle' header='Query Title'></Column>
                    <Column field='lastMessage' header='Recent Message'></Column>
                    <Column
                        header='Go to Chat'
                        body={(rowData) => (
                            <Button icon='pi pi-arrow-right' onClick={() =>{
                                console.log(rowData.queryId)
                                navigate('/admin/query')
                            }
                            }  />
                        )}
                    ></Column>
                </DataTable>
            </div>
        </section>
    </Card>
</section>
  )
}

export default NotificationCard
