import React, { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import { useRecoilValue } from 'recoil'

import MypageHeader from './MypageHeader'
import MypageButton from './MypageButton'
import Nav from '../Nav/Nav'
import { Link, useNavigate } from 'react-router-dom'
import fetchCalendar from '../../api/mypage/fetchCalendar'
import { idState, nameState } from '../Login/Login'
import {dummydata as dummyData} from './CalendarDummyData'

const Mypage = () => {
  const initialDate = new Date()
  const userId = useRecoilValue(idState)
  const userName = useRecoilValue(nameState)
  const [selectedDate, setSelectedDate] = useState(initialDate)
  const [myData, setMyData] = useState([])
  const navigate = useNavigate()

  const isDateMarked = (date) => {
    if (dummyData && dummyData.data && dummyData.data.calendar) {
      const formattedDate = date.toISOString().split('T')[0];
      console.log('Formatted Date:', formattedDate);

      const isMarked = dummyData.data.calendar.some((item) => item.date === formattedDate);
      console.log('Is Marked:', isMarked);

      return isMarked;
    }
    return false;
  };
  console.log("dummydata", dummyData)

  function handleDateChange(date) {
    const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    setSelectedDate(utcDate)
    console.log(selectedDate)
  }
  const formatTime = (time) => {
    if (time) {
      const [hours, minutes, seconds] = time.split(':');
      return `${parseInt(hours, 10)}시간${parseInt(minutes, 10)}분`
    }

  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchCalendar(userId);
        setMyData(response.data)
        console.log('Fetched data:', response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  console.log('mydata: ', myData)

  useEffect(() => {
    if (initialDate !== selectedDate) {
      const formattedDate = selectedDate.getUTCFullYear() + '-' + ('0' + (selectedDate.getUTCMonth() + 1)).slice(-2) + '-' + ('0' + selectedDate.getUTCDate()).slice(-2);
      navigate(`/mypage/${userId}/${formattedDate}`)
    }
  }, [selectedDate]);

  return (
    <>
      <Nav />
      <div className='mypage-wrap'>

        <div className='mypage-header-wrap'>
          <MypageHeader name={userName} time={formatTime(myData.totalTime)} />
        </div>
        <div className='mypage-content-wrap'>
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            locale='en-US'
            tileClassName={({ date, view }) => {
              if (view === 'month' && isDateMarked(date)) {
                return 'highlighted-date';
              }
            }}
          />
        </div>
        <div className='mypage-button-wrap'>
          <MypageButton title={`위치 설정`} />
          <MypageButton title={'관심분야 설정'} />
        </div>

      </div>
    </>
  )
}

export default Mypage