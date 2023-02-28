import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost/laravel/laravel/public/api/'
})

export default API;