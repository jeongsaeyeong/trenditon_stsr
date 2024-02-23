import React from 'react'
import { useNavigate } from 'react-router-dom'

function MypageButton({title}) {
    const navigate = useNavigate()
    function handleOnClick(title){
        if (title==='관심분야 설정'){
            navigate('/favorite')
        }
        else{
            navigate('/timeset')
        }
        
    }
  return (
    <div className='mypage-button-wrap'>
        <button onClick={() => handleOnClick(title)}>{title}</button>
    </div>
  )
}

export default MypageButton