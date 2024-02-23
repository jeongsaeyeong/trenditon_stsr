import React from 'react'
import axios from 'axios'
async function postTime({userId,time}) {
    try{
        const response = await axios.put(`https://3.34.197.56:443/api/users/${userId}/change-time`,{
            time
        })
        return response.data
    }
    catch(error){
        console.log(error)
    }
  
}

export default postTime