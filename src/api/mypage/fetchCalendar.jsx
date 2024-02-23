import React from 'react'
import axios from 'axios' 

async function fetchCalendar(userId) {
  try{
    const response = await axios.get(`https://3.34.197.56:443/api/attendance/${userId}`)
    return response.data
  }
  catch(error){
    console.log(error)
  }
  
}

export default fetchCalendar