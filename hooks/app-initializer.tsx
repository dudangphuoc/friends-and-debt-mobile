import { userCredentials } from "@/constants/Atoms";
import { FriendsAndDebt } from "@/shared/friends-and-debt/friends-and-debt";
import axios from "axios";

const API_URL: string = "http://192.168.1.2:44311";
const HEADER_TENANT_NAME: string = "abp.tenantid";
const HEADER_TENANT_ID: number=1;

export const friendsAndDebtApi = (accessToken = "") => {
    var baseUrl =  API_URL;
    var axiosInstance = axios.create({
        adapter: 'fetch',
        headers: {
            "Content-Type": "application/json",
            "abp.tenantid": HEADER_TENANT_ID,
            "Authorization": accessToken == "" ? "" : "Bearer " + accessToken,
        },
    });
    
    return new FriendsAndDebt(baseUrl, axiosInstance);
}