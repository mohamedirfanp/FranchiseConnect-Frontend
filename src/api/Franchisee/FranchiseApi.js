import axiosInstance from "../axios";



export const GetFranchises = async () => {
    return axiosInstance.get("/franchise");
}

export const GetFranchiseById = async (franchiseId) => {
    const url = "/franchise/"+franchiseId;
    return axiosInstance.get(url);
}   

export const UpdateViewCount = async (franchiseId) => {
    return axiosInstance.put("/franchise/update-viewcount", {franchiseId : franchiseId});
}

// Wishlist Api 
export const GetWishlist = async () => {
    return axiosInstance.get('/franchise/user-wishlist')
}

export const AddWishlist = async(franchiseId) =>{
    return axiosInstance.put('/franchise/user-wishlist',{franchiseId : franchiseId});
}

export const RemoveWishlist = async (userWishlistId) => {
    return axiosInstance.delete('/franchise/user-wishlist/'+userWishlistId);
}


// Request Api
export const CreateRequest = async (data) => {
    return axiosInstance.post('/franchise/request', {
        franchiseId : data.franchiseId,
        ownerId : data.ownerId,
        servicesId : data.servicesId,
        investmentBudget: data.investmentBudget,
        space : data.space
    })
}


// Get Conversations
export const GetConversation = async () => {
    return axiosInstance.get('/chat/get/conversations');
}

