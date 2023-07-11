import axiosInstance from "../axios";
import axios from "axios";
import { API_BASE_URL } from "../../constants/ApiConstant";

export const CreateTicket = async (ticketData) => {
    return axiosInstance.post("/chat/ticket", ticketData);
}

export const GetTicketForUser = async () => {
    return axiosInstance.get("/chat/user/tickets");
}


//
// export const FranchiseExists = async () => {
//     return axiosInstance.get("/franchise/franchise-exist");
// }

export const GetTicketForAdmin = async () => {
    return axios.get(`${API_BASE_URL}/chat/all/tickets`);
}

export const CloseTicket = async (queryId) => {
    return axios.delete(`${API_BASE_URL}/chat/close/Ticket/${queryId}`);
}