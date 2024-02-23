import React from 'react'
import axios from 'axios'

async function postScrap({userId, videoId}) {
    try{
        const response =await axios.post(`https://3.34.197.56:443/api/scrap/${userId}/${videoId}`,{
        
        })
        return response.data
    }
    catch(error){
        return new Error(error)
    }
}

export default postScrap