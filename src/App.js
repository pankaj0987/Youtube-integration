import React, { useEffect } from 'react';
import './App.css';
import HomePage from './Container/HomePage/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GetAccessToken from './Container/GetAccesTokenPage/GetAccessToken';
import VideoPlay from './Container/VideoPlayPage/VideoPlay';
import { useDispatch } from 'react-redux';
import { storeToken } from './Services/UserSlice/userSlice';
function App() {
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem('access_token');
  useEffect(() => {
    if (accessToken)
      dispatch(storeToken(accessToken));
    //eslint-disable-next-line
  }, [accessToken])

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="getToken" element={<GetAccessToken />}></Route>
          <Route path="/" element={<HomePage />} />
          <Route path="/video" element={<VideoPlay />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
