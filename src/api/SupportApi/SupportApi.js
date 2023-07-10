import axiosInstance from "../axios";

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

