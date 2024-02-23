import React from 'react'
import ReactPlayer from 'react-player'

import bookmark_activity from '../../../assets/img/bookmark_activity.svg'
import bookmark_notactivity from '../../../assets/img/bookmark_notactivity.svg'

import history_sun from '../../../assets/img/history_sun.png'
import history_time from '../../../assets/img/history_time.png'
const dummydata = [{
  id: 1,
  category: '경제/금융',
  title: '주식투자',
  videoUrl: 'https://youtu.be/DN_g3K2i8P4?si=hI7aiSVc5vx1qLRd',
  time: '13',
}, {
  id: 2,
  category: '마케팅',
  title: '2024년 마케팅 흐름',
  videoUrl: 'https://youtu.be/FTymT5NMD5k?si=ojLlZLBkYBLSSxGR',
  time: '18',
},
{
  id: 3,
  category: 'IT',
  title: 'Promise란 무엇인가?!',
  videoUrl: 'https://youtu.be/iUGLyhbwYkU?si=Y7kUpC4cQf7j6EV4',
  time: '18',
},
]


function HistoryContentItem({onClick,bookMarkIs}) {
  return (
    <ul className='history-content-wrap'>
      {dummydata.map((dummy) => (
        <>
          <p className='history-content-title'>{dummy.category}</p>

          <p className='history-runtime'>
            <img className='history-timeImg' src={history_time} alt='histroy_time' />
            {dummy.time}M
          </p>
          <li key={dummy.id} className='history-content-video'>
            {/* <img className='history-bookmark' src={bookmark_notactivity} alt='bookmark_notactivity' /> */}
            <div className='video-container'>
              <ReactPlayer
                url={dummy.videoUrl}
                className='react-player'
                width='100%'
                height='100%'
                controls={true}
              />
            </div>
            <div className='histroy-content-footer'>
              <div className='history-letter-wrap'>
                <p className='history-footer-category'>{dummy.category}</p>
                <p className='history-footer-title'>{dummy.title}</p>
              </div>
              {bookMarkIs? <img className='history-bookmark' src={bookmark_activity} alt='bookmark_notactivity' onClick={()=>onClick()}/> : <img className='history-bookmark' src={bookmark_notactivity} alt='bookmark_activity' onClick={()=>onClick()}/>}
            </div>
          </li >
        </>
      ))}
    </ul>
  )
}

export default HistoryContentItem