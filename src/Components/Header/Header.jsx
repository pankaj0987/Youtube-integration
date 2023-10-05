import React, { useEffect } from 'react'
import SearchBar from '../SearchBar/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserChannel } from '../../Services/UserSlice/userSlice'
import './style.css';

function Header() {
    const dispatch=useDispatch();
    const user=useSelector(state=>state.userData.user)
    function redirectToSignIn() {
        let url = 'https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtube&access_type=offline&include_granted_scopes=true&response_type=code&state=state_parameter_passthrough_value&redirect_uri=http://localhost:3000/getToken&client_id=427315736161-6pc7i2ffpttur3fn4llstvnbq43hl37g.apps.googleusercontent.com'
        window.open(url, '_blank');
    }
    console.log(user)
    useEffect(() => {
        dispatch(fetchUserChannel());
        //eslint-disable-next-line
    }, [])

    return (
        <header>
            <div className="header_logo">
                <img src="/youtube-logo.png" alt="Youtube" />
            </div>
            <div className="header_search">
                <SearchBar />
            </div>
            <div className="header_sign_in">
                {
                    user?.snippet ?
                        <img src={user.snippet.thumbnails.medium.url} alt="user" />
                        :
                        <div onClick={redirectToSignIn} className='sign_in_container'>
                            <i className="fa fa-user-circle-o" aria-hidden="true"></i>
                            <p>Sign in</p>
                        </div>
                }


            </div>
        </header>
    )
}

export default Header