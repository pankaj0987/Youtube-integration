import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
const initialState = {
    token: '',
    user: {},
    loading:false,
    error:''
}
export const fetchUserChannel = createAsyncThunk('user/fetchUserChannel', () => {
    const accessToken = localStorage.getItem('access_token')
    return axios.get(`https://www.googleapis.com/youtube/v3/channels`, {
        headers: {
            Authorization: 'Bearer ' + accessToken
        },
        params: {
            part: 'id,snippet',
            mine: true
        }
    })
        .then(result => result.data)
})

export const getAccessToken = createAsyncThunk('user/getAccessToken', (value) => {
    return axios.post(`https://oauth2.googleapis.com/token?code=${value}&client_id=427315736161-6pc7i2ffpttur3fn4llstvnbq43hl37g.apps.googleusercontent.com&client_secret=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&redirect_uri=http://localhost:3000/getToken&grant_type=authorization_code`
            )
            .then(result=>result.data)
})

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        storeToken:(state,action)=>{
            state.token=action.payload
        }
    },
    extraReducers:(builder)=>{
        //fetch user channel
        builder.addCase(fetchUserChannel.pending,(state)=>{
            state.loading=true;
        })
        builder.addCase(fetchUserChannel.fulfilled,(state,action)=>{
            state.loading=false;
            state.user=action.payload.items[0];
        })
        builder.addCase(fetchUserChannel.rejected,(state,action)=>{
            state.loading=false;
            state.user={};
            state.error=action.error.message
        })

        //get access token
        builder.addCase(getAccessToken.pending,(state)=>{
            state.loading=true;
        })
        builder.addCase(getAccessToken.fulfilled,(state,action)=>{
            const {access_token,refresh_token}=action.payload
            state.loading=false;
            state.token=access_token;
            if(refresh_token){
                localStorage.setItem("refreshtoken",refresh_token);
            }
            localStorage.setItem("access_token", access_token);
        })
        builder.addCase(getAccessToken.rejected,(state,action)=>{
            state.loading=false;
            state.token={};
            state.error=action.error.message
        })
    }
})

// Action creators are generated for each case reducer function
export const { storeToken} = userSlice.actions
export default userSlice.reducer