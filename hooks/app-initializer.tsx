import { userCredentials } from "@/constants/Atoms";
import { FriendsAndDebt } from "@/shared/friends-and-debt/friends-and-debt";
import axios, { AxiosInstance } from "axios";
import { useRecoilValue } from "recoil";
import { API_URL, HEADER_TENANT_ID } from "@env"


console.log(API_URL);

export const friendsAndDebtApi = (accessToken = "") => {
    var baseUrl =  API_URL;
    useRecoilValue
    var axiosInstance = axios.create({
        headers: {
            "Content-Type": "application/json",
            "abp.tenantid": HEADER_TENANT_ID,
            "Authorization": accessToken == "" ? "" : "Bearer " + accessToken,
        },
    });
    return new FriendsAndDebt(baseUrl, axiosInstance);
}