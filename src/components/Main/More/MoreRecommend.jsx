import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import Nav from '../../Nav/Nav'
import { useLocation } from 'react-router-dom';

import goback from '../../../assets/img/goBack.png';
import { useRecoilValue } from 'recoil';
import { idState, nameState } from '../../Login/Login';
import fetchRecommend from '../../../api/mainpage/fetchRecommend';

import MoreItems from './MoreItems';
import postScrap from '../../../api/mainpage/postRecommend';
import fetchScrap from '../../../api/mainpage/fetchScrap';
import deleteScrap from '../../../api/mainpage/deleteScrap';

// fetchScrab에서 videoid와 더보기 페이지에서의 리스트 videoid 비교
// 같은게 잇다면 북마크 true
// bookmarkState 초기값 객체로 설정하기
function MoreRecommend() {
    const [recommendList, setRecommendList] = useState([]);
    const [bookMarkStates, setBookMarkStates] = useState([]);
    const [bookMarkList, setBookMarkList] = useState([]);
    const userName = useRecoilValue(nameState);
    const userId = useRecoilValue(idState);
   

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchRecommend({ userId })
                const response2 = await fetchScrap({ userId, type: 'all' })
                console.log("response fetchRecodata: ", response.data)
                const newBookMarkStates = {};
                response.data.videos.forEach((video) => {
                    const videoId = video.videoId;
                    const categoryId = video.categoryId;
                    newBookMarkStates[videoId] = {
                        videoId: videoId,
                        categoryId:categoryId,
                        state: response2.data.scraps.some((item) => item.videoId === videoId && item.categoryId===categoryId),
                    };
                });
                
                setBookMarkList(response2.data.scraps)
                setRecommendList(response.data.videos)
                setBookMarkStates(newBookMarkStates);
            }
            catch (error) {
                console.log(error)
            }

        }
        fetchData()

    }, [])

    console.log("fetchRecommend: ", recommendList)
    console.log("fetchScrab", bookMarkList)
    console.log("bookmarkStates : ", bookMarkStates)
    async function handleBookmark({ index, videoId }) {
        if(bookMarkStates[videoId].state){
            setBookMarkStates((prevStates) => {
                const newStates = { ...prevStates };
                newStates[videoId] = {
                    videoId: videoId,
                    state: !prevStates[videoId]?.state || false,
                };
                return newStates;
            });
            const response = await deleteScrap({ userId, videoId });
            console.log('Bookmark response: ', response)
        }
        else{
            try {

                setBookMarkStates((prevStates) => {
                    const newStates = { ...prevStates };
                    newStates[videoId] = {
                        videoId: videoId,
                        state: !prevStates[videoId]?.state || true,
                    };
                    return newStates;
                });
    
                const response = await postScrap({ userId, videoId });
                console.log('Bookmark response:', response);
    
            } catch (error) {
                console.error('Error bookmarking:', error);
    
            }
        }
       
    }


    return (
      <>
        <Nav/>
        <div className='more_wrap'>
            <div style={{ marginBottom: 30 }}>
                <div className='more_header'>
                    <h2 style={{ fontWeight: 900 }}>{userName}님의 추천콘텐츠</h2>
                </div>

            </div>
            <div className="more">
                <div className="more-line"></div>
                <ul className='more-content-wrap'>
                    <MoreItems recommendList={recommendList} handleBookmark={handleBookmark} bookMarkStates={bookMarkStates} />
                </ul>
            </div>
        </div>
      </>
    )
}

export default MoreRecommend