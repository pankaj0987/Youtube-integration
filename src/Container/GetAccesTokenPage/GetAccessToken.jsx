import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from "react-router-dom"
import { getAccessToken } from '../../Services/UserSlice/userSlice';
import { useDispatch } from 'react-redux';
function GetAccessToken() {
    const navigate = useNavigate();
    const [queryParameters] = useSearchParams();
    const dispatch = useDispatch();

    useEffect(() => {
        const value = encodeURIComponent(queryParameters.get('code')).replace('%20', '+');
        if (queryParameters.get('code')) {
            dispatch(getAccessToken(value))
                .then(result => {
                    navigate("/");
                })
        }
        //eslint-disable-next-line
    }, [])

    return (
        <div>Please wait...</div>
    )
}

export default GetAccessToken