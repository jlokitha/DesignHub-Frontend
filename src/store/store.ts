import {configureStore} from "@reduxjs/toolkit";
import UserSlice, {logOUtUser, refreshToken } from "../reducers/User-slice.ts";
import ComponentSlice from "../reducers/Component-slice.ts";
import TagSlice from "../reducers/Tag-slice.ts";
import CookieService from "../util/cookie-service.ts";
import {useNavigate} from "react-router-dom";
import { setupAxiosInterceptors } from "../api/api.ts";

export const store = configureStore({
    reducer : {
        userReducer : UserSlice,
        componentReducer : ComponentSlice,
        tagReducer : TagSlice
    }
})

const refreshTokenFn = async (): Promise<string | null> => {
    try {
        await store.dispatch(refreshToken());
        return CookieService.getCookie(CookieService.ACCESS_TOKEN_KEY);
    } catch (error) {
        store.dispatch(logOUtUser());
        useNavigate()('/login');
        return null;
    }
};

setupAxiosInterceptors(refreshTokenFn);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;