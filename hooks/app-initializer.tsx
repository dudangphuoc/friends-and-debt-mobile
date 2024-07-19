import { AccountFriendsAndDebt, BoardFriendsAndDebt, FriendListFriendsAndDebt, IAuthenticateResultModel, TokenAuthFriendsAndDebt } from "@/shared/friends-and-debt/friends-and-debt";
import axios from "axios";
import { useAuth } from "./auth";
const API_URL: string = "http://192.168.194.175:44311";
const HEADER_TENANT_NAME: string = "abp.tenantid";
const HEADER_TENANT_ID: number=1;
export let accessToken:IAuthenticateResultModel | null = null;

export const setAccessToken = (token: IAuthenticateResultModel | null) => {
    accessToken = token;
}

export const tokenAuthFriendsAndDebtApi = () => {
    var baseUrl =  API_URL;
    const myApiClient = new TokenAuthFriendsAndDebt(baseUrl, {
        fetch: (url, init) => {
            init = init || {};
            // Thêm hoặc ghi đè header
            init.headers = {
                ...init.headers, // Giữ lại các header cũ nếu có
                'Content-Type': 'application/json', // Ví dụ thêm header khác
                "abp.tenantid": HEADER_TENANT_ID.toString(),
            };
            // Triển khai tùy chỉnh fetch nếu cần
            return fetch(url, init);
        }
    });
    return myApiClient;
}

export const boardFriendsAndDebtApi = () => {
    var baseUrl =  API_URL;
    const myApiClient = new BoardFriendsAndDebt(baseUrl, {
        fetch: (url, init) => {
            init = init || {};
            // Thêm hoặc ghi đè header
            init.headers = {
                ...init.headers, // Giữ lại các header cũ nếu có
                'Content-Type': 'application/json', // Ví dụ thêm header khác
                "abp.tenantid": HEADER_TENANT_ID.toString(),
                'authorization': `Bearer ${accessToken?.accessToken}`
            };
            // Triển khai tùy chỉnh fetch nếu cần
            return fetch(url, init);
        }
    });

    return myApiClient;
}
