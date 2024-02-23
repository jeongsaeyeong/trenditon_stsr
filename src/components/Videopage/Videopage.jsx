import React, { useEffect, useState } from 'react';
import Return from '../../assets/img/timeset_retrun.svg';
import View from '../../assets/img/video_view.svg';
import { Watch } from "react-loader-spinner";
import axios from 'axios';
import Nav from '../Nav/Nav';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { idState, nameState } from '../Login/Login';
import VideoDetail from './VideoDetail';

const Videopage = () => {
    const [videos, setVideos] = useState([]);
    const [second, setTimesecond] = useState(0);
    const userId = useRecoilValue(idState)
    const userName = useRecoilValue(nameState)
    const [getVideo, setGetVideo] = useState(false)
    const [VideoUrl, setVideoUrl] = useState('')
    const [show, setShow] = useState(false)
    const [userInfo, setUserInfo] = useState('')
    const [watchList, setWatchList] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://3.34.197.56:443/api/users/${userId}/user-info`)
            .then((res) => {
                setUserInfo(res.data)
                setTimesecond(res.data.data.time * 60);
            });
    }, [userId]);

    useEffect(() => {

        // const fetchData = async () => {
        //     try {
        //         const response = await axios.get(`https://3.34.197.56/api/video/recommend/${userId}?time=${second}`);
        //         if (response.data.data.videos.length > 0) {
        //             setVideos(response.data.data.videos);
        //             console.log('videos', videos)
        //             setGetVideo(true);
        //         } else {
        //             fetchData();
        //         }
        //     } catch (error) {
        //         console.error('Error fetching videos:', error);
        //     }
        // };

        if (userInfo) {

            axios.get(`https://3.34.197.56/api/video/recommend/${userId}?time=${second}`)
                .then((res) => {
                    console.log(res)
                    setVideos(res.data.data.videos);
                })

        }
        // fetchData()
    }, [second, userName, userId]);

    const goBack = () => {
        navigate(-1);
    };

    const SubmitTime = () => {
        const RequestBody = {
            videoId: watchList,
            viewingTime: second
        };
        axios.post(`https://3.34.197.56:443/api/attendance/${userId}`, RequestBody)
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.error('Error while submitting time:', error);
            });
    };

    useEffect(() => {
        console.log(videos)
    }, [videos])

    return (
        <>
            {show ? (
                <VideoDetail videoUrl={VideoUrl} second={second} setShow={setShow} />
            ) : (
                <>
                    <Nav />
                    <div className='video_wrap'>
                        {userInfo ? (
                            <>
                                <button className='retrun_btn' onClick={goBack} >
                                    <img src={Return} alt="return" className='return' />
                                </button>
                                <h2><strong>{userName}</strong>님이<br /> 손틈새로 공부할 내용 </h2>
                                <div className='video'>
                                    {videos ? (
                                        <>
                                            {videos.map((video, key) => (
                                                <div className="video_detail" key={key}>
                                                    <div className="header">
                                                        <h3>{video.categoryId}</h3>
                                                        <div>
                                                            <img src={View} alt="view" />
                                                            <p>{video.runTime}</p>
                                                        </div>
                                                    </div>
                                                    <div onClick={() => { setVideoUrl(video.url); setShow(true); setWatchList(prevList => [...prevList, video.videoId]); }}>
                                                        <div className="video_box">
                                                            <div>
                                                                <p className='cate'>{video.categoryId}</p>
                                                                <h4>{video.videoTitle}</h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </>
                                    ) : (
                                        <>
                                            <p>영상이 준비되지 않았어요!</p>
                                        </>
                                    )}
                                </div>
                                <button className='submit' onClick={() => { SubmitTime() }}>시청 완료!</button>
                            </>
                        ) : (
                            <div className='loading'>
                                <p className='text'>효율적인</p>
                                <h3>40분</h3>
                                <p><strong>알차게</strong> 구성 중</p>
                                <Watch
                                    visible={true}
                                    height="75"
                                    width="75"
                                    radius="48"
                                    color="#FF6D6D"
                                    ariaLabel="watch-loading"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                />
                            </div>
                        )}
                    </div>
                </>
            )}
        </>
    )
}

export default Videopage