import { axios } from "../utils/axiosService";

export const registerCustomer = (data) => {

    return axios.post(`/register`, data);
};