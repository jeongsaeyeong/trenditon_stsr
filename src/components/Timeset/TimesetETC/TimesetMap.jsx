import React from 'react'
import PlaceRed from '../../../assets/img/timeset_placered.svg'
import PlaceBlue from '../../../assets/img/timeset_placeblue.svg'
import Place from '../../../assets/img/timeset_place.svg'

const TimesetMap = ({ setShow,  props, setSearch, search }) => {

    return (
        <div className="map">
            {props === '출발지' ? (
                <>
                    <div>
                        <img src={PlaceBlue} alt="place" />
                        <img src={Place} alt="place" />
                    </div>
                    <div className="bar"></div>
                    <div className='search'>
                        <input
                            className='timeset_btn'
                            placeholder='출발지를 입력하세요!'
                            value={search}
                            onChange={(e) => setSearch(e.currentTarget.value)}
                        />
                        <button onClick={() => { setShow(true) }}>검색</button>
                    </div>
                </>
            ) : (
                <>
                    <div>
                        <img src={Place} alt="place" />
                        <img src={PlaceRed} alt="place" />
                    </div>
                    <div className="bar"></div>
                    <div className='search'>
                        <input
                            className='timeset_btn'
                            placeholder='출발지를 입력하세요!'
                            value={search}
                            onChange={(e) => setSearch(e.currentTarget.value)}
                        />
                        <button onClick={() => { setShow(true) }}>검색</button>
                    </div>
                </>
            )}
        </div >
    )
}

export default TimesetMap