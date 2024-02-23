import React from 'react'
import Return from '../../../assets/img/timeset_retrun.svg'

const TimesetRetrun = ({ setAll, props }) => {
    return (
        <>
            <button onClick={() => { setAll(true) }} className='retrun_btn'>
                <img src={Return} alt="return" className='return' />
            </button>
            <p className='start'>
                {props === '출발지' ? (
                    <>
                        <strong>{props}</strong> 설정
                    </>
                ) : (
                    <>
                        <strong style={{color: '#FF6D6D'}}>{props}</strong> 설정
                    </>
                )}
            </p>
        </>
    )
}

export default TimesetRetrun