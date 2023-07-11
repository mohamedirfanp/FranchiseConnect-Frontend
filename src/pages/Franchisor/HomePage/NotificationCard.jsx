import { Card } from 'primereact/card'
import React, { useEffect, useState } from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

import { GetConversation } from '../../../api/Franchisor/franchiseApi';

// Firestore import
import {
	collection,
	limit,
	onSnapshot,
	orderBy,
	query,
	where,
} from "firebase/firestore";

import { firebaseDb } from '../../../firebaseConfig';
import { useNavigate } from 'react-router';

function NotificationCard() {


	const navigate = useNavigate();
	const [conversations, setConversations] = useState([]);
	const [chats, setChats] = useState({});

	const chatsRef = collection(firebaseDb, "chats");

	const header = (
		<span className='text-lg font-semibold'>
			<p className='text-center'>Notifications</p>
		</span>
	);

	useEffect(() => {
		const fetchConversations = async () => {
			try {
				const response = await GetConversation();
				const conversationList = response.data.conversations;

				// Fetch the last chat message for each conversation
				conversationList.forEach((conversation) => {
					getLastChat(conversation.conversationId);
				});
                console.log(conversationList)

				setConversations(conversationList);
			} catch (error) {
				console.error(error);
			}
		};

		fetchConversations();
	}, []);

	const getLastChat = (conversationId) => {
		const queryMessage = query(
			chatsRef,
			where("conversationId", "==", conversationId),
			orderBy("createdAt", "desc"),
			limit(1)
		);

		onSnapshot(queryMessage, (snapshot) => {
			const chatDocs = snapshot.docs.map((doc) => doc.data());
			const lastChat = chatDocs[0];

			setConversations((prevConversations) =>
            {

                return prevConversations.map((conversation) =>
                    conversation.conversationId === conversationId
                        ? { ...conversation, lastMessage: lastChat.message }
                        : conversation
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
						<DataTable value={conversations}>
							<Column field='franchiseeName' header='Name'></Column>
							<Column field='lastMessage' header='Recent Message'></Column>
							<Column
								header='Go to Chat'
								body={(rowData) => (
									<Button icon='pi pi-arrow-right' onClick={() =>{
										console.log(rowData.conversationId)
										navigate('/franchisor/connect')
									}
									}  />
								)}
							></Column>
						</DataTable>
					</div>
				</section>
			</Card>
		</section>
	);
}

export default NotificationCard;
