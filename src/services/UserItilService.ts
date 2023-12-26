import { AxiosResponse } from "axios";
import { TaskItemResponse } from "../models/response/TaskItemResponse";
import $apitask from "../http2";
import { UserItilResponse } from "../models/response/UserItilResponse";

export default class UserItilService {
    static fetchUsersItil(): Promise<AxiosResponse<UserItilResponse[]>> {
        return $apitask.get<UserItilResponse[]>('/usersitil');
    } 
}