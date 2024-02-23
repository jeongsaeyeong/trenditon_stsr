import React, { useEffect, useState } from 'react';
import Flag from '../../assets/img/video_flag.svg';
import Subway from '../../assets/img/video_subway.svg';

const VideoTimer = ({ second }) => {
    const [seconds, setSeconds] = useState(second);
    const [barStyle, setBarStyle] = useState({ height: '100%' });

    useEffect(() => {
        const intervalId = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const percentage = (seconds / second) * 100;
        setBarStyle({ height: `${percentage}%` });
    }, [seconds, second]);

    return (
        <div className='timer_box'>
            <p>{Math.floor(seconds / 60)} 분</p>
            <div>
                <div className={'timerber'} style={barStyle}>
                    <img src={Subway} alt="flag" />
                </div>
            </div>
            <img src={Flag} alt="flag" />
        </div>
    );
};

export default VideoTimer;
