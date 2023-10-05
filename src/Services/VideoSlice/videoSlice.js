import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
const initialState = {
    videoList:[],
    loading:false,
    error:''
}
export const fetchVideos = createAsyncThunk('user/fetchVideos', (accessToken) => {
    return  axios.get('https://youtube.googleapis.com/youtube/v3/search', {
        params:{
            maxResults:12,
            part:"id,snippet",
            type:'video'
        },
        headers: {
            Authorization: 'Bearer ' + accessToken
        }
    }).then(result => result.data.items)
})


export const videoSlice = createSlice({
    name: 'video',
    initialState,
    extraReducers:(builder)=>{
        //fetch user channel
        builder.addCase(fetchVideos.pending,(state)=>{
            state.loading=true;
        })
        builder.addCase(fetchVideos.fulfilled,(state,action)=>{
            state.loading=false;
            state.videoList=action.payload;
        })
        builder.addCase(fetchVideos.rejected,(state,action)=>{
            state.loading=false;
            state.videoList=[];
            state.error=action.error.message
        })
    }
})

// Action creators are generated for each case reducer function

export default videoSlice.reducer