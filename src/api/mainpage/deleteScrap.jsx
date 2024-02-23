import React from 'react'
import axios from 'axios'
async function deleteScrap({userId,videoId}) {
    try{
        const response = await axios.delete(`https://3.34.197.56:443/api/scrap/${userId}/${videoId}`)
        return response.data
      }
      catch(error){
        console.log(error)
      }
}

export default deleteScrap