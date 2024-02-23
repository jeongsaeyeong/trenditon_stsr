import axios from 'axios'
import React from 'react'

async function fetchCalendarItem({userId,date}) {
    try{
        const response = await axios.get(`https://3.34.197.56:443/api/attendance/${userId}/get?date=${date}`)
        return response.data
    }
    catch(error){
        return new Error(error)
    }
}

export default fetchCalendarItem