import { axios } from "../utils/axiosService";

export const getAllCustomers = (data) => {

    return axios.get(`/getAllCustomer?page=${data?.page}`,);
};