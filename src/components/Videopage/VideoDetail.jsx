import React from 'react'
import ReactPlayer from 'react-player'
import VideoTimer from './VideoTimer'
import Return from '../../assets/img/timeset_retrun.svg'

const VideoDetail = ({ videoUrl, second, setShow }) => {
    console.log('videoUrl', videoUrl)

    return (
        <body className=' app'>
            <div className='VideoDetail_wrap'>
                <button onClick={() => { setShow(false) }} className='retrun_btn'>
                    <img src={Return} alt="return" className='return' />
                </button>

                <ReactPlayer
                    height='360px'
                    playing={true}
                    url={videoUrl}
                    muted={true}
                    controls={true}
                    light={false}
                    pip={true}
                    rotate='90'
                />
                <div className='timer'>
                    <VideoTimer
                        second={second}
                    />
                </div>
            </div>
        </body>
    )
}

export default VideoDetail