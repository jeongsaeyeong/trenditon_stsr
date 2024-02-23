import React from 'react'
import ReactPlayer from 'react-player'
import { getCategoryName } from '../util/getCategoryName'
import bookmark_activity from '../../../assets/img/bookmark_activity.png';
import bookmark_notactivity from '../../../assets/img/bookmark_notactivity.png'


function MoreItems({recommendList,handleBookmark,bookMarkStates}) {
  return (
    <>
    {recommendList.map((dummy,index) => (
      <>
          <li key={dummy.videoId} className='more-content-video'>
          
              <div className='video-container'>
                  <ReactPlayer
                      url={dummy.url}
                      className='react-player'
                      width='100%'
                      height='100%'
                      controls={true}
                  />
              </div>
              <div className='more-content-footer'>
                  <div className='more-letter-wrap'>
                      <p className='more-footer-category'>{getCategoryName(dummy.categoryId)}</p>
                      <p className='more-footer-title'>{dummy.videoTitle}</p>
                  </div>
                  {bookMarkStates[dummy.videoId]?.state? <img src={bookmark_activity} className='more-bookmark' onClick={() =>handleBookmark({index, videoId: dummy.videoId})} alt='bookmark_activity' /> : <img className='more-bookmark' src={bookmark_notactivity} onClick={() =>handleBookmark({index, videoId: dummy.videoId})} alt='bookmark_notactivity' />}
              </div>
              
          </li >
      </>
  ))}
    </>
    
  )
}

export default MoreItems