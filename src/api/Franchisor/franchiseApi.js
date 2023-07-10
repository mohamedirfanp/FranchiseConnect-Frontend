import axiosInstance from "../axios";

export const CreateFranchise = async (franchiseData) => {
    return axiosInstance.post("/franchise", franchiseData);
}

export const FranchiseExists = async () => {
    return axiosInstance.get("/franchise/franchise-exist");
}

// To get all pending requests

export const GetAllPendingRequests = async () => {
    return axiosInstance.get("/franchise/pending-request");
}


// To get all requests

export const GetAllRequests = async () => {
    return axiosInstance.get("/franchise/request")
}

// To update the request

export const UpdateRequest = async (data) => {
    return axiosInstance.put("/franchise/request", {
        franchiseRequestId: data.franchiseRequestId,
        isRequestStatus : data.isRequestStatus
    })
}

// Get Conversations
export const GetConversation = async () => {
    return axiosInstance.get('/chat/get/conversations');
}