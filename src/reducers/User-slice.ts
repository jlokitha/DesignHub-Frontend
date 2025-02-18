import axios, {AxiosError} from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import User from "../model/User.ts";

const initialState = {
    jwt_token: null,
    refresh_token : null,
    username: null,
    isAuthenticated: false,
    loading: false,
    error: '',
}

const api = axios.create({
    baseURL : 'http://localhost:3000'
})

export const registerUser = createAsyncThunk(
    "user/registration",
    async (user: User, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/auth/register', user);
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
    async (user: User, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/auth/login', user);
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

const refreshToken = createAsyncThunk(
    "user/refreshToken",
    async () => {
        try {
            const response = await api.post('/api/auth/refreshToken');
            return response.data;
        } catch (err) {
            const error = err as AxiosError;
            console.log(error);
        }
    }
)

export const userSlice = createSlice({
    name: "userReducer",
    initialState,
    reducers:{
        logOUtUser(state) {
            state.isAuthenticated = false;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(registerUser.fulfilled, (state, action) => {
                console.log('User Registered Successfully');
                state.error = '';
            })
            .addCase(registerUser.rejected, (state, action) => {
                console.log('User Registration Failed', action.payload);
                state.error = action.payload as string;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.jwt_token = action.payload.accessToken;
                state.refresh_token = action.payload.refreshToken;
                state.isAuthenticated = true;
                state.error = '';
            })
            .addCase(loginUser.rejected, (state, action) => {
                console.log('User Login Failed', action.payload);
                state.error = action.payload as string;
            })
            .addCase(refreshToken.fulfilled, (state, action) => {
                state.jwt_token = action.payload.accessToken;
            })
    }
})

export const {logOUtUser} = userSlice.actions;
export default userSlice.reducer;