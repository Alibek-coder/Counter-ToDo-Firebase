import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./counter.slice";
import { todoSlice } from "./todo.slice";

export const store = configureStore({
    reducer:{
        counter: counterSlice.reducer,
        todo: todoSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>