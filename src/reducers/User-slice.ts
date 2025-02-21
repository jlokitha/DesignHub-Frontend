import {AxiosError} from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import User from "../model/User.ts";
import api, {ACCESS_EXPIRES_DAYS, ACCESS_TOKEN_KEY, REFRESH_EXPIRES_DAYS, REFRESH_TOKEN_KEY} from "../api/api.ts";
import CookieService from "../util/cookie-service.ts";

const initialState = {
    isAuthenticated: false,
    error: '',
}

export const registerUser = createAsyncThunk(
    "user/ui",
    async (user: User, {rejectWithValue}) => {
        try {
            const response = await api.post('/auth/register', user);
            return response.data;
        } catch (err) {
            const error = err as AxiosError;
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue('An unknown error occurred');
        }
    }
)

export const loginUser = createAsyncThunk(
    "user/login",
    async (user: User, {rejectWithValue}) => {
        try {
            const response = await api.post('/auth/login', user);
            return response.data;
        } catch (err) {
            const error = err as AxiosError;
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue('An unknown error occurred');
        }
    }
)

export const refreshToken = createAsyncThunk(
    "user/refreshToken",
    async () => {
        const refreshToken = CookieService.getCookie(REFRESH_TOKEN_KEY);

        try {
            console.log('Refresh token', refreshToken)
            const response = await api.post('/auth/refresh-token', null, {
                headers: {
                    Authorization: `Bearer ${refreshToken}`
                }
            });
            return response.data;
        } catch (err) {
            const error = err as AxiosError;
            console.log(error);
        }
    }
);

export const userSlice = createSlice({
    name: "userReducer",
    initialState,
    reducers: {
        logOUtUser(state) {
            state.isAuthenticated = false;
            CookieService.deleteCookie(ACCESS_TOKEN_KEY);
            CookieService.deleteCookie(REFRESH_TOKEN_KEY);
        }
    },
    extraReducers(builder) {
        builder
            .addCase(registerUser.fulfilled, (state) => {
                state.error = '';
            })
            .addCase(registerUser.rejected, (state, action) => {
                console.log('User Registration Failed', action.payload);
                state.error = action.payload as string;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                CookieService.setCookie(ACCESS_TOKEN_KEY, action.payload.accessToken, ACCESS_EXPIRES_DAYS);
                CookieService.setCookie(REFRESH_TOKEN_KEY, action.payload.refreshToken, REFRESH_EXPIRES_DAYS);
                state.isAuthenticated = true;
                state.error = '';
            })
            .addCase(loginUser.rejected, (state, action) => {
                console.log('User Login Failed', action.payload);
                state.error = action.payload as string;
            })
            .addCase(refreshToken.fulfilled, (state, action) => {
                CookieService.setCookie(ACCESS_TOKEN_KEY, action.payload.accessToken, ACCESS_EXPIRES_DAYS);
            })
    }
})

export const {logOUtUser} = userSlice.actions;
export default userSlice.reducer;