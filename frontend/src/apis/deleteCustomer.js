import { axios } from "../utils/axiosService";

export const deleteCustomerById = (id) => {

    return axios.delete(`/deleteCustomer/${id}`,);
};