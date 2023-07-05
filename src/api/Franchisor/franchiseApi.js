import axiosInstance from "../axios";

export const CreateFranchise = async (franchiseData) => {
    return axiosInstance.post("/franchise", franchiseData);
}

export const FranchiseExists = async () => {
    return axiosInstance.get("/franchise/franchise-exist");
}