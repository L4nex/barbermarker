import axios from 'axios';
import { getUserToken } from './Services/AuthService';

const instance = axios.create({
  baseURL: "https://api.barbermarker.com.br/"
});

instance.defaults.headers.common['Authorization'] = getUserToken();

export default instance;