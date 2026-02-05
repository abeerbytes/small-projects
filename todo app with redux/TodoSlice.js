import { createSlice } from "@reduxjs/toolkit";

const TodoSlice = createSlice({
    name: "todos",
    initialState: [],
    reducers: {
        addTodo: (state, action) => {
            state.push({
                id: crypto.randomUUID(),
                text: action.payload,
                completed: false
            })
        },
        toggleTodo: (state, action) => {
            const todo = state.find(t => t.id === action.payload)
            if (todo) todo.completed = !todo.completed

        },
        deleteTodo: (state, action) => {
            return state.filter(t => t.id !== action.payload

            )
        },
    },
})
export const { addTodo, toggleTodo, deleteTodo } = TodoSlice.actions;
export default TodoSlice.reducer;