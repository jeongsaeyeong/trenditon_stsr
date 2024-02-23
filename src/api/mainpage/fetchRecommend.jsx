import axios from 'axios'
import React from 'react'

async function fetchRecommend({userId}) {
  try{
    const response = await axios.get(`https://3.34.197.56:443/api/video/home/recommend/${userId}`)
    return response.data
  }
  catch(error){
    console.log(error)
  }
}

export default fetchRecommend