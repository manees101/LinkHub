import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: null,
    token: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.userData = action.payload.userData
        },
        setToken: (state, action) => {
            state.token = action.payload.token
        }
    }
})

export const { setUser, updateUser, setToken } = userSlice.actions
const userReducer = userSlice.reducer

export default userReducer