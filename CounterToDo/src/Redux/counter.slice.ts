import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface IAppState {
    counter: number;
    loading: boolean;
    error: Error|null
}

const initialState: IAppState = {
    counter: 0,
    loading: false,
    error: null
}

export const fetchCounter = createAsyncThunk(
    'fetch/counter',
    async (data) => {
        const url = 'https://counter-4013d-default-rtdb.europe-west1.firebasedatabase.app/';
        const result = await axios.put(url + 'counts.json', data);
        return result.data
    }
)

export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increase: state => {
            state.counter += 1;
        },
        decrease: state => {
            state.counter -= 1;
        },
        plus: (state, action) => {
            state.counter += action.payload;
        },
        minus: (state, action) => {
            state.counter -= action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchCounter.fulfilled, (state, action) => {
                state.counter = action.payload;
                state.loading = false;
            })
            .addCase(fetchCounter.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCounter.rejected, (state, action) => {
                state.error = action.error as Error;
                state.loading = false;
            })
    }
})

export const { increase, decrease, plus, minus } = counterSlice.actions