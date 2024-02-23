import React, { useEffect, useState } from 'react'
import TimesetTop from './TimesetTop'
import TimesetChoose from './TimesetChoose'
import TimesetInput from './TimesetInput'
import TimesetStart from './TimesetStart'
import TimesetArrive from './TimesetArrive'
import Check from '../../assets/img/timeset_check.svg'
import Nav from '../Nav/Nav'

const Timeset = () => {
    const [all, setAll] = useState(true)
    const [show, setShow] = useState(false)
    const [witch, setWitch] = useState(false)
    const [time, setTime] = useState(0)
    const [choose, setChoose] = useState('')
    const [choosestart, setChoosestart] = useState('출발지')
    const [choosearrive, setChoosearrive] = useState('도착지')

    useEffect(() => {
        const setStartBtn = document.querySelector('.setStart');
        const setArriveBtn = document.querySelector('.setArrive');
        const CheckStart = document.querySelector('.check_start');
        const CheckArrive = document.querySelector('.check_arrive');

        if (setStartBtn && choosestart !== '출발지') {
            setStartBtn.style.backgroundColor = '#EAF2FF';
            CheckStart.innerHTML = `<img src=${Check} alt="Your Alt Text" />`;
        }

        if (setArriveBtn && choosearrive !== '도착지') {
            setArriveBtn.style.backgroundColor = '#EAF2FF';
            CheckArrive.innerHTML = `<img src=${Check} alt="Your Alt Text" />`;
        }

    }, [choose, choosestart, choosearrive, all])



    return (
        <>
            <Nav />
            {all ? (
                <div className='timeset_wrap'>
                    <TimesetTop
                        witch={witch} show={show}
                        setShow={setShow} setWitch={setWitch}
                        choosestart={choosestart} choosearrive={choosearrive}
                    />
                    {show ? (
                        <TimesetInput
                            setTime={setTime} time={time}
                            setWitch={setWitch} witch={witch}
                            choosestart={choosestart}
                            choosearrive={choosearrive}
                        />
                    ) : (
                        <TimesetChoose
                            setShow={setShow} time={time}
                            setAll={setAll} setChoose={setChoose}
                            setChoosestart={setChoosestart}
                            setChoosearrive={setChoosearrive}
                            choosestart={choosestart}
                            choosearrive={choosearrive}
                            all={all}
                        />
                    )}
                </div>
            ) : (
                <>
                    {choose === '출발지' ? (
                        <TimesetStart choosestart={choosestart} setChoosestart={setChoosestart} setAll={setAll} />
                    ) : (
                        <TimesetArrive choosearrive={choosearrive} setChoosearrive={setChoosearrive} setAll={setAll} />
                    )}
                </>
            )}
        </>
    )
}

export default Timeset