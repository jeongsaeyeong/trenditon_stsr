import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { useRecoilValue } from 'recoil';
import { idState, nameState } from '../../Login/Login';
import Nav from '../../Nav/Nav'


import goback from '../../../assets/img/goBack.png';
import bookmark_activity from '../../../assets/img/bookmark_activity.png';
import bookmark_notactivity from '../../../assets/img/bookmark_notactivity.png'
import MoreItems from './MoreItems';
import postScrap from '../../../api/mainpage/postRecommend';
import fetchScrap from '../../../api/mainpage/fetchScrap';
import deleteScrap from '../../../api/mainpage/deleteScrap';


function MoreScrab() {
    const [bookMarkIs, setBookMarkIs] = useState(false);
    const [bookMarkList, setBookMarkList] = useState([])
    const [bookMarkStates, setBookMarkStates] = useState([]);
    const userName = useRecoilValue(nameState)
    const userId = useRecoilValue(idState)

    useEffect(() => {
        const fetchScrapData = async () => {
            try {
                const response = await fetchScrap({ userId, type: 'all' })
                console.log("response fetchRecodata: ", response.data)
                setBookMarkList(response.data.scraps)

                console.log("fetchRecommend: ", bookMarkList)
                const newBookMarkStates = {};
                response.data.scraps.forEach((video) => {
                    const videoId = video.videoId;
                    const categoryId = video.categoryId;
                    newBookMarkStates[videoId] = {
                        videoId: videoId,
                        categoryId: categoryId,
                        state: true,
                    };
                });
                setBookMarkStates(newBookMarkStates);
            }
            catch (error) {
                console.log(error)
            }

        }
        fetchScrapData()
    }, [])

    console.log("recommendList morepage : ", bookMarkList)
    async function handleBookmark({ index, videoId }) {
        try {


            const response = await deleteScrap({ userId, videoId });
            console.log('Bookmark response:', response);
            setBookMarkList((prevList) => prevList.filter((item) => item.videoId !== videoId));
            if (response.success) {

            }

        } catch (error) {
            console.error('Error bookmarking:', error);

        }
    }


    return (
        <>
            <Nav />
            <div className='more_wrap'>
                <div style={{ marginBottom: 30 }}>
                    <div className='more_header'>
                        <h2 style={{ fontWeight: 900 }}>{userName}님의 스크랩한 영상</h2>
                    </div>

                </div>
                <div className="more">
                    <ul className='more-content-wrap'>
                        <MoreItems recommendList={bookMarkList} handleBookmark={handleBookmark} bookMarkStates={bookMarkStates} />
                    </ul>
                </div>
            </div>
        </>
    )
}

export default MoreScrab