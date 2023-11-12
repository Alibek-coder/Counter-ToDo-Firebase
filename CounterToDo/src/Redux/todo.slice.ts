import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface IToDoState {
    text: string;
    state:boolean;
    data?: [];
    loading: boolean;
    error: Error | null
}

const initialState: IToDoState = {
    text: "",
    state: true,
    data: [],
    loading: false,
    error: null
}

export const getToDo = createAsyncThunk(
    'get/todo',
    async () => {
        const url = 'https://counter-4013d-default-rtdb.europe-west1.firebasedatabase.app/todo.json';
        const result = await axios.get(url);
        const allData = Object.keys(result.data).map(id => {
            return { ...result.data[id], id }
        })        
        return allData
    }
)

export const setToDo = createAsyncThunk(
    'set/todo',
    async (newData:{}) => {
        const url = `https://counter-4013d-default-rtdb.europe-west1.firebasedatabase.app/todo.json`;
        const result = await axios.post(url, newData);
        return result
    }
)

export const rmvToDo = createAsyncThunk(
    'rmv/todo',
    async (id:string) => {
        const url = `https://counter-4013d-default-rtdb.europe-west1.firebasedatabase.app/todo/${id}.json`;
        const result = await axios.delete(url);
        return result
    }
)

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        setText: (state, action) => {
            state.text = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getToDo.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
                state.state = false
            })
            .addCase(getToDo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getToDo.rejected, (state, action) => {
                state.error = action.error as Error;
                state.loading = false;
            })
        builder
            .addCase(setToDo.fulfilled, (state) => { 
                state.loading = false;
                state.state = true
            })
            .addCase(setToDo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(setToDo.rejected, (state, action) => {
                state.error = action.error as Error;
                state.loading = false;
            })
        builder
            .addCase(rmvToDo.fulfilled, (state) => { 
                state.loading = false;
                state.state = true
            })
            .addCase(rmvToDo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(rmvToDo.rejected, (state, action) => {
                state.error = action.error as Error;
                state.loading = false;
            })
    }
})

export const { setText } = todoSlice.actions