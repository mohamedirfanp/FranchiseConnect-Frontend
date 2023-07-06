import axios from "axios";
import { API_BASE_URL } from "../../constants/ApiConstant";

export const FranchiseeSignIn = async (loginInput) => {
    return axios.post(`${API_BASE_URL}/account/franchisee/login`, loginInput);
}

export const FranchiseeSignUp = async (franchiseeRegisterInput) => {
    return axios.post(`${API_BASE_URL}/account/franchisee/register`, franchiseeRegisterInput);
}