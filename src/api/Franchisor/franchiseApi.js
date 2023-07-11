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

// update the franchise Detail
export const UpdateFranchise = async(data) => {
    return axiosInstance.put('/franchise/update', {
        franchise : {...data}
    })
}

// delete a photo from gallery

export const DeleteGallery = async (galleryId) => {
    return axiosInstance.delete('/franchise/gallery/delete/' + galleryId);
}

// Upload a photo to gallery
export const UploadGallery = async (data) => {
    return axiosInstance.put('/franchise/gallery/upload', data);
}

// A function to delete a services
export const DeleteService = async (serviceId) => {
    return axiosInstance.delete('/franchise/service/delete/' + serviceId);
}