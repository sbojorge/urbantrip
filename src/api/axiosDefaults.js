import axios from "axios";

axios.defaults.baseURL = 'https://urbandrf-a23e17dc5cc1.herokuapp.com/'
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
axios.defaults.withCredentials = true

export const axiosReq = axios.create();
export const axiosRes = axios.create();