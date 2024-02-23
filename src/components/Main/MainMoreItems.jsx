import React from 'react'
import ReactPlayer from 'react-player'
import { getCategoryName } from './util/getCategoryName'
import { categoryData } from './categoryData'

function MainMoreItems({dummydata}) {
  return (
    <ul className='main-content-wrap'>
      {dummydata?.map((dummy) => (
        <>
          <li key={dummy.videoId} className='main-content-video'>
            <div className='video-container'>
              <ReactPlayer
                 //url={dummy.videoUrl}
                url={dummy.url}
                className='react-player'
                width='100%'
                height='100%'
                controls={true}
              />
            </div>
            <div className='main-content-footer'>
              <div className='main-letter-wrap'>
                <p className='main-footer-category'>{getCategoryName(dummy.categoryId)}</p>
                <p className='main-footer-title'>{dummy.videoTitle}</p>
              </div>
              
            </div>
          </li >
        </>
      ))}
    </ul>
  )
}

export default MainMoreItems