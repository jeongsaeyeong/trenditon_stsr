import React from 'react'

function HistoryHeader({userid, date}) {
    return (
        <div className='history-header-wrap'>
            <h1 className='header-date'>{date}</h1>
            <p className='header-user'>{userid}님이</p>
            <p className='header-user'>손틈새로 공부한 내용</p>
        </div>
    )
}

export default HistoryHeader