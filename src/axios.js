import axios from 'axios';

const instance = axios.create({
	baseURL: process.env.REACT_APP_AXIOS_BASE_URL
});
instance.defaults.baseURL = process.env.REACT_APP_AXIOS_BASE_URL;
instance.defaults.headers.common.Authorization = 'TOKEN';
instance.defaults.withCredentials = true;
export default instance;
