import {AxiosError} from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import User from "../model/User.ts";
import CookieService from "../util/cookie-service.ts";
import api from "../api/api.ts";

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
        const refreshToken = CookieService.getCookie(CookieService.REFRESH_TOKEN_KEY);

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
            CookieService.deleteCookie(CookieService.ACCESS_TOKEN_KEY);
            CookieService.deleteCookie(CookieService.REFRESH_TOKEN_KEY);
            localStorage.removeItem('user');
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
                CookieService.setCookie(CookieService.ACCESS_TOKEN_KEY, action.payload.accessToken, CookieService.ACCESS_EXPIRES_DAYS);
                CookieService.setCookie(CookieService.REFRESH_TOKEN_KEY, action.payload.refreshToken, CookieService.REFRESH_EXPIRES_DAYS);
                state.isAuthenticated = true;
                localStorage.setItem('user', JSON.stringify(action.payload.user));
                state.error = '';
            })
            .addCase(loginUser.rejected, (state, action) => {
                console.log('User Login Failed', action.payload);
                state.error = action.payload as string;
            })
            .addCase(refreshToken.fulfilled, (state, action) => {
                CookieService.setCookie(CookieService.ACCESS_TOKEN_KEY, action.payload.accessToken, CookieService.ACCESS_EXPIRES_DAYS);
            })
    }
})

export const {logOUtUser} = userSlice.actions;
export default userSlice.reducer;