import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query';
import { useRecoilValue } from 'recoil';

import Main from './components/Main/Main'
import Login, { idState, nameState } from './components/Login/Login'
import Join from './components/Join/Join'
import Mypage from './components/Mypage/Mypage'
import Startpage from './components/Startpage/Startpage'
import Timeset from './components/Timeset/Timeset'
import Videopage from './components/Videopage/Videopage'
import LoginCorrect from './components/Login/LoginCorrect'
import TimesetStart from './components/Timeset/TimesetStart'
import MoreRecommend from './components/Main/More/MoreRecommend'
import MoreScrab from './components/Main/More/MoreScrab'
import Favorite from './components/Favorite/FavoritePage'
import History from './components/Mypage/History/History'
import VideoDetail from './components/Videopage/VideoDetail'
import Testfetch from './components/Login/fetchtest'

const queryClient = new QueryClient();

const App = () => {
  const id = useRecoilValue(idState);
  const name = useRecoilValue(nameState);
  
  return (
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={ <Main/>} />           
            <Route path='/aboutRecommend' element={<MoreRecommend />} />
            <Route path='/aboutScrab' element={<MoreScrab />} />
            <Route path='/favorite' element={<Favorite />} />

            <Route path='/login' element={< Login />} />
            <Route path='/logincorrect' element={< LoginCorrect />} />

            <Route path='/join' element={< Join />} />

            <Route path='/mypage' element={< Mypage />} />
            <Route path='/mypage/:userid/:date' element={<History />} />

            <Route path='/startpage' element={< Startpage />} />

            <Route path='/timeset' element={< Timeset />} />
            <Route path='/timesetplace' element={< TimesetStart />} />

            <Route path='/videopage' element={< Videopage />} />
            <Route path='/videopage/:videourl' element={< VideoDetail />} />

            <Route path='/test' element={<Testfetch />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
  )
}

export default App