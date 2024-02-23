import axios from 'axios'
import React from 'react'

async function fetchScrap({userId,type}) {
  try{
    const response = await axios.get(`https://3.34.197.56:443/api/scrap/${userId}?type=${type}`)
    return response.data
  }
  catch(error){
    console.log(error)
  }
}

export default fetchScrap