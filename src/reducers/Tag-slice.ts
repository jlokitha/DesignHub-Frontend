import Tag from "../model/Tag.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../api/api.ts";

const initialState: Tag[] = [];

export const findAllTags = createAsyncThunk(
    "tag/get",
    async () => {
        try {
            const response = await api.get('/tag/');
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }
)

const tagSlice = createSlice({
    name: 'tagReducer',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(findAllTags.fulfilled, (state, action) => {
                return action.payload;
            })
    }
})

export default tagSlice.reducer;