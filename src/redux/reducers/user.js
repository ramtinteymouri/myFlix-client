import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        token: null
    },
    reducers: {
        setUser: (state, action) => {
            if (action.payload) {
                state.user = action.payload.user;
                state.token = action.payload.token;
            } else {
                state.user = null;
                state.token = null;
            }
        }
    }
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
