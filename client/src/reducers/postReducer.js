import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    postData: []
}

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.postData = [...action.payload.postData]
        },
        updatePost: (state, action) => {
            state.postData = state.postData.map((post) => (post._id === action.payload.postData._id ? { ...action.payload.postData } : post))
        },
        addPost: (state, action) => {
            state.postData = [...state.postData, action.payload.postData]
            console.log(state.postData)
        }
    }
})

export const { setPosts, updatePosts, addPost } = postSlice.actions
const postReducer = postSlice.reducer

export default postReducer