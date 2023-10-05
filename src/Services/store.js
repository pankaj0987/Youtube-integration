import { configureStore } from '@reduxjs/toolkit'
import userSlice from './UserSlice/userSlice'
import videoSlice from './VideoSlice/videoSlice'
export const store = configureStore({
  reducer: {
    userData: userSlice,
    videoData:videoSlice
  },
})