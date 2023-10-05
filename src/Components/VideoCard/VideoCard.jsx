import React, { useEffect, useState } from 'react'
import './Style.css'
import axios from 'axios'

function VideoCard({video}) {
    const [channelLogo, setchannelLogo] = useState('');
    const [videoStatistics, setvideoStatistics] = useState({});
    const SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];
    useEffect(() => {
        const accesstoken = localStorage.getItem('access_token');
        if(accesstoken){
            axios.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${video.snippet.channelId}&fields=items%2Fsnippet%2Fthumbnails`, {
                headers: {
                    Authorization: 'Bearer ' + accesstoken
                }})
              .then(result=>{
                setchannelLogo(result.data.items[0].snippet.thumbnails.default.url);
              })
              .catch(e=>{
                console.log(e)
            })
              axios.get(`https://www.googleapis.com/youtube/v3/videos`, {
                headers: {
                    Authorization: 'Bearer ' + accesstoken
                },
                params:{
                    id:video.id.videoId,
                    part:"id,snippet,contentDetails,statistics,status"
                }})
              .then(result=>{
                setvideoStatistics(result.data.items[0]);
              })
              .catch(e=>{
                console.log(e)
            })
        }
    }, [video])
    
    function abbreviateNumber(number){
        var tier = Math.log10(Math.abs(number)) / 3 | 0;
        if(tier === 0) return number;
        var suffix = SI_SYMBOL[tier];
        var scale = Math.pow(10, tier * 3);
        var scaled = number / scale;
        return scaled.toFixed(1) + suffix;
    }
    function timeSince(date) {
        var seconds = Math.floor((new Date() - date) / 1000);
        var interval = seconds / 31536000;
        if (interval > 1) {
          return Math.floor(interval) + " years";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
          return Math.floor(interval) + " months";
        }
        interval = seconds / 86400;
        if (interval > 1) {
          return Math.floor(interval) + " days";
        }
        interval = seconds / 3600;
        if (interval > 1) {
          return Math.floor(interval) + " hours";
        }
        interval = seconds / 60;
        if (interval > 1) {
          return Math.floor(interval) + " minutes";
        }
        return Math.floor(seconds) + " seconds";
      }

    return (
        <div className="video_card_container">
            <div className='image_container'>
                <img src={video.snippet.thumbnails.high.url} alt="test" />
            </div>
            <div className='card_footer'>
                <img src={channelLogo} alt="user" />
                <div className='video_details'>
                    <p className='video_title'>{video.snippet.title}</p>
                    <p className='channel_name'>{video.snippet.channelTitle}</p>
                    <p style={{marginTop:2}} className='video_likesviews'>
                        <span>{abbreviateNumber(videoStatistics.statistics?.likeCount)} views</span>
                        <span> {timeSince(new Date(video.snippet?.publishedAt)?.getTime())} ago</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default VideoCard