import { AccountFriendsAndDebt, BoardFriendsAndDebt, FriendListFriendsAndDebt, AuthenticateResultModel, TokenAuthFriendsAndDebt } from "@/shared/friends-and-debt/friends-and-debt";
import { useAuth } from "./auth";
// const API_URL: string = "http://192.168.1.2:44311";
const API_URL: string = "http://192.168.194.175:44311";

const HEADER_TENANT_NAME: string = "abp.tenantid";
const HEADER_TENANT_ID: number = 1;
export let accessToken:AuthenticateResultModel | null = null;

export const setAccessToken = (token: AuthenticateResultModel | null) => {
    accessToken = token;
}


export const accountFriendsAndDebtApi = () => {
    var baseUrl =  API_URL;
    const myApiClient = new AccountFriendsAndDebt(baseUrl, {
        fetch: (url, init) => {
            init = init || {};
            init.headers = {
                ...init.headers, 
                'Content-Type': 'application/json',
                'abp.tenantid': HEADER_TENANT_ID.toString(),
            };
            return fetch(url, init);
        }
    });
    return myApiClient;
}

export const tokenAuthFriendsAndDebtApi = () => {
    var baseUrl =  API_URL;
    const myApiClient = new TokenAuthFriendsAndDebt(baseUrl, {
        fetch: (url, init) => {
            init = init || {};
            init.headers = {
                ...init.headers, 
                'Content-Type': 'application/json',
                'abp.tenantid': HEADER_TENANT_ID.toString(),
            };
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
                ...init.headers, 
                'Content-Type': 'application/json',
                'abp.tenantid': HEADER_TENANT_ID.toString(),
                'authorization': `Bearer ${accessToken?.accessToken}`
            };

            return fetch(url, init);
        }
    });

    return myApiClient;
}
