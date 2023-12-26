import { AxiosResponse } from "axios";
import { TaskItemResponse } from "../models/response/TaskItemResponse";
import $apitask from "../http2";

export default class TaskService {
    static fetchTasks(): Promise<AxiosResponse<TaskItemResponse[]>> {
        return $apitask.get<TaskItemResponse[]>('/tasks');
    } 
}