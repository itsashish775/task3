import { axios } from "../utils/axiosService";

export const uploadImage = (data) => {
    const formData = new FormData();
    formData.append('file', data.file);
    return axios.post(`/upload-image/`, formData);
};