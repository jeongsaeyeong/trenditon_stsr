import React from 'react'

// name,time => 전역상태관리로 교체해야함.
function MypageHeader({name,time}) {
    
  return (
    <div className='mypage-header'>
        <p className='mypage-name'>{name}님은 틈새시간을</p>
        <h1 className='mypage-time'>{time}</h1>
        <p className='mypage-sonteum'><span style={{color:'#006FFD', fontWeight:"bolder"}}>손틈새로</span> 알차게 채웠어요</p>
    </div>
  )
}

export default MypageHeader