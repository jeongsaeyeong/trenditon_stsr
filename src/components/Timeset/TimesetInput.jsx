import React, { useEffect, useState } from 'react'
import axios from 'axios'
import postTime from '../../api/postTime'
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { idState } from '../Login/Login';

const TimesetInput = ({ time, setTime, setWitch, witch }) => {
    const userId = useRecoilValue(idState)

    const onSubmit = async (time) => {
        if (!(time)) {
            alert("시간을 입력해주세요!")
            return
        }
        setWitch(true)
        try {
            const response = await postTime({ userId: userId, time })
            console.log("time: ", time)

        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (time !== 0) {
            const RequestBody = {
                time: time
            };

            axios.put(`https://3.34.197.56/api/users/${userId}/change-time`, RequestBody)
                .then(response => {
                    console.log(response.data.message);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [time])


    return (
        <div className='userinput'>
            {witch ? (
                <>
                    <p>{time}분 <strong>소요</strong></p>
                    <div className='going_btn input_btn'>
                        <button><Link to='/favorite'>관심분야 체크하기</Link></button>
                        <button><Link to='/videopage'>영상 바로보기</Link></button>
                    </div>
                </>
            ) : (
                <>
                    <div className='input_box'>
                        <input
                            type="text"
                            value={time}
                            onKeyDown={(e) => {
                                if (!(e.key === 'Backspace' || /\d/.test(e.key))) {
                                    e.preventDefault();
                                }
                            }}
                            onChange={(e) => { setTime(e.currentTarget.value) }} />
                        <p>분</p>
                    </div>
                    <button onClick={() => onSubmit(time)}>확인</button>
                </>
            )}
        </div>
    )
}

export default TimesetInput