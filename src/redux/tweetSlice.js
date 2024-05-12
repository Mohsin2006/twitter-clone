import { createSlice } from "@reduxjs/toolkit";

const tweetSlice = createSlice({
  name: "tweet",
  initialState: {
    tweets: [],
    refresh:false,
    isActive:true, // Corrected to initialize as an empty array
  },
  reducers: {
    getAllTweet: (state, action) => {
      state.tweets = action.payload;
    },
    getRefresh:(state)=>{
      state.refresh=!state.refresh;
    },
    getIsActive:(state,action)=>{
      state.isActive=action.payload
    }
  }
});

export const { getAllTweet, getRefresh, getIsActive } = tweetSlice.actions;
export default tweetSlice.reducer;
