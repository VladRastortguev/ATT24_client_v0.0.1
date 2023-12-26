import axios from "axios";
import { API_TASKS } from "../http";
import { error } from "console";

const $apitask = axios.create({
    withCredentials: false,
    baseURL: API_TASKS
})

$apitask.interceptors.request.use((config) => {
    config.auth = {
        username: "Vlad",
        password: "123"
    }

    return config
})

$apitask.interceptors.response.use((config) => {
    return config
}, async (error) => {

    const originalRequest = error.config;

    throw error
})

export default $apitask