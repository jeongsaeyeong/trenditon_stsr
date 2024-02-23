import React, { useEffect, useState } from 'react'
import 'swiper/css';
import 'swiper/css/pagination';
import TimesetSwiper from './TimesetETC/TimesetSwiper'
import TimesetRetrun from './TimesetETC/TimesetRetrun'
import TimesetMap from './TimesetETC/TimesetMap';
import { Map, MapMarker } from "react-kakao-maps-sdk";

const { kakao } = window

const TimesetStart = ({ choosestart, setChoosestart, setAll }) => {

    const [position, setPosition] = useState({ coords: { latitude: 37.506320759000715, longitude: 127.05368251210247 } }); // 기본 위치 설정
    const [show, setShow] = useState(false)
    const [choose, setChoose] = useState('출발지');
    const [search, setSearch] = useState('')

    const [info, setInfo] = useState()
    const [markers, setMarkers] = useState([])
    const [map, setMap] = useState()

    useEffect(() => {
        setChoosestart(choose)

        if (choosestart !== '출발지') {
            document.querySelector('.timeset_btn').style.backgroundColor = '#EAF2FF';
        }
    }, [choose, setChoosestart, choosestart])

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setPosition(position);
                console.log(position);
            },
            (error) => {
                console.error(error);
            },
            { enableHighAccuracy: true }
        );
    }, []);

    useEffect(() => {
        if (!map) return
        const ps = new kakao.maps.services.Places()

        ps.keywordSearch(search, (data, status, _pagination) => {
            if (status === kakao.maps.services.Status.OK) {
                const bounds = new kakao.maps.LatLngBounds()
                let markers = []

                for (var i = 0; i < data.length; i++) {
                    markers.push({
                        position: {
                            lat: data[i].y,
                            lng: data[i].x,
                        },
                        content: data[i].place_name,
                    })
                    bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
                }
                setMarkers(markers)
                map.setBounds(bounds)
            }
        })
    }, [map, search])

    return (
        <div className='timeset_wrap'>
            <TimesetRetrun setAll={setAll} props={'출발지'} />
            <TimesetMap setShow={setShow} choose={choose} show={show} setChoose={setChoose} props={'출발지'} setSearch={setSearch} search={search} />
            <Map
                center={{ lat: position.coords.latitude, lng: position.coords.longitude }}
                style={{
                    width: "100%",
                    height: "350px",
                }}
                level={3}
                onCreate={setMap}
                className='choose_start'
            >
                <MapMarker
                    position={{ lat: position.coords.latitude, lng: position.coords.longitude }}
                />

                {search && markers.map((marker, index) => (
                    <MapMarker
                        key={`marker-${index}`}
                        position={marker.position}
                        onClick={() => {setInfo(marker); setSearch(marker.content)}}
                    >
                    </MapMarker>
                ))}
            </Map>

            <TimesetSwiper setShow={setShow} show={show} setChoose={setChoose} setAll={setAll} markers={markers} setSearch={setSearch} search={search}/>
        </div>
    )
}

export default TimesetStart
