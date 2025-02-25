import Component from "../model/Component.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../api/api.ts";

const initialState: Component[] = [];

export const saveComponent = createAsyncThunk(
    "component/save",
    async (component: FormData) => {
        try {
            const response = await api.post('/component/', component);
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }
)

export const getComponents = createAsyncThunk(
    "component/get",
    async () => {
        try {
            const response = await api.get('/component/');
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }
)

const componentSlice = createSlice({
    name: 'componentReducer',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(saveComponent.fulfilled, (state, action) => {
                state.push(action.payload);
            })
            .addCase(getComponents.fulfilled, (state, action) => {
                return action.payload;
            })
    }
})

export default componentSlice.reducer;