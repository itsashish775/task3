import { axios } from "../utils/axiosService";

export const uploadVideo = (data) => {
    const formData = new FormData();
    formData.append('file', data.file);
    return axios.post(`/upload-video/`, formData);
};