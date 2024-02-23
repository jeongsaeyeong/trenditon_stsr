import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import { nameState,idState } from '../../Login/Login'
import HistoryHeader from './HistoryHeader'
import HistoryContentItem from './HistoryContentItem'
import fetchCalendarItem from '../../../api/mypage/fetchCalendarItem'

function History() {
    const { userid, date } = useParams()
    const [bookmarkIs,setBookmarkIs] = useState(false)
    const userName = useRecoilValue(nameState)
    const userId = useRecoilValue(idState)
    const [attendanceItems,setAttendanceItems] = useState([]) 
    const navigate = useNavigate()
    function handleCheck() {
        navigate('/mypage')
    }
    function handleBookmark(){
        setBookmarkIs(!bookmarkIs)
    }
    function formatDate(date){
        const [year,month,day] = date.split('-');
        return `${parseInt(year,10)}년 ${parseInt(month,10)}월 ${parseInt(day,10)}일`
    }
    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const response = await fetchCalendarItem({userId,date})
                setAttendanceItems(response.data)
                console.log(response.data)
            }
            catch(error){
                console.log(error)
            }
        }
        
        fetchData()
    },[])

    return (
        <div className='history-wrap'>
            <HistoryHeader userid={userName} date={formatDate(date)} />
            <HistoryContentItem onClick={handleBookmark} bookmarkIs={bookmarkIs}/>
            <button className='history-check-button' onClick={handleCheck}>확인</button>
        </div>
    )
}

export default History