import axios from 'axios';
import constant from './Constansts'

const token = localStorage.getItem('Mellifluous')
const Axios = axios.create({
    baseURL: constant.BackendUrl,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Authorization": token
    },
    timeout: 50000,
});

export default Axios;
