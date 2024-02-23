import React, { useState } from 'react'
import Subway from '../../../assets/img/timeset_subway.svg'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

const TimesetSwiper = ({ search, setShow, show, setChoose, setAll, markers, setSearch }) => {
    const Array = [...markers]
    const [selectedSlide, setSelectedSlide] = useState(null);

    const handleSlideClick = (map, index) => {
        setChoose(map);
        setSearch(map);
        setSelectedSlide(index);
        setShow(false)
    };

    const Submit = () => {
        if (search===''){
            alert('위치를 설정해주세요!')
            return
        }
        setAll(true)
    }

    return (
        <>
            {show ? (
                <div>
                    <Swiper
                        pagination={{
                            dynamicBullets: true,
                        }}
                        modules={[Pagination]}
                        className="mySwiper swiper"
                    >
                        {Array.map((map, key) => (
                            <SwiperSlide
                                key={key}
                                onClick={() => { handleSlideClick(map.content, key); }}
                                className={selectedSlide === key ? 'selected' : ''}
                            >
                                <img src={Subway} alt="subway" className='subway' />
                                <p>{map.content}</p>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            ) : (
                <div className='start_btn'>
                    <button onClick={() => { Submit(); }}>확인</button>
                </div>
            )}
        </>
    )
}

export default TimesetSwiper