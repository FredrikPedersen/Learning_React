import axios from 'axios';
import {DATABASE_URL} from "./constants";

const instance = axios.create({
    baseURL: DATABASE_URL
});

export default instance;