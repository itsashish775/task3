import { axios } from "../utils/axiosService";

export const getCustomerById = (id) => {

    return axios.get(`/getCustomerById/${id}`,);
};
export const updateCustomer = (data) => {
console.log(data);

    return axios.post(`/updateCustomerById/${data?.id}`, data?.values);
};