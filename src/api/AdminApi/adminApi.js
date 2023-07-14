import axiosInstance from "../axios";

export const GetProfileCount = async () => {
    return axiosInstance.get("/account/admin/profile-count");
}


export const CloseTicket = async (queryId) => {
    return axiosInstance.delete(`/chat/close/Ticket/${queryId}`);
}


export const GetTicketForAdmin = async () => {
    return axiosInstance.get(`/chat/all/tickets`);
}