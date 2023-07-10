import axiosInstance from "../axios";


// Get User Profile
export const GetProfile = async () => {
    return axiosInstance.get("/account");
}

// If Franchise owner Get Franchise Detail
export const GetFranchise = async () => {
    return axiosInstance.get("/franchise/franchise-account");
}

// Change Password

export const ChangePassword = async (data) => {
    return axiosInstance.put('/account/change-password', data);
}


// Update Profile

export const UpdateProfile = async (data) =>  {
    return axiosInstance.put('/account/update', data)
}