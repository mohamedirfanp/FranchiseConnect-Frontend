import axiosInstance from "../axios";

// export const CreateFranchise = async (franchiseData) => {
//     return axiosInstance.post("/franchise", franchiseData);
// }

export const GetFranchises = async () => {
    return axiosInstance.get("/franchise");
}

export const GetFranchiseById = async (franchiseId) => {
    const url = "/franchise/"+franchiseId;
    return axiosInstance.get(url);
}   

export const UpdateViewCount = async (franchiseId) => {
    return axiosInstance.put("/frachise/update-viewcount", {frachiseId : franchiseId});
}