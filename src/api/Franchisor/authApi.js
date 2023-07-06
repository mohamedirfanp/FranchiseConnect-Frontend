import axios from "axios";
import { API_BASE_URL } from "../../constants/ApiConstant";

export const FranchisorSignIn = async (loginInput) => {
    return axios.post(`${API_BASE_URL}/account/franchisor/login`, loginInput);
}

export const FranchisorSignUp = async (franchisorRegisterInput) => {
    return axios.post(`${API_BASE_URL}/account/franchisor/register`, franchisorRegisterInput);
}