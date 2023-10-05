import React, { useEffect } from 'react'
import './Style.css'
import VideoCard from '../VideoCard/VideoCard'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVideos } from '../../Services/VideoSlice/videoSlice';

function VideoList() {
    const dispatch=useDispatch();
    
    const accessToken=useSelector(state=>state.userData.token)
    const videoList=useSelector(state=>state.videoData.videoList);
    
    useEffect(() => {
        if(accessToken){
            dispatch(fetchVideos(accessToken));
        }
        //eslint-disable-next-line
    }, [accessToken])
console.log(videoList)
    return (

        <div className="video_list-container">
            {
                videoList.length>0 && videoList.map(video => {
                    return <Link to={`/video?v=${video.id.videoId}`} key={video.id.videoId} className="video_item"><VideoCard  video={video}/></Link>
                })
            }
        </div>
    )
}

export default VideoList