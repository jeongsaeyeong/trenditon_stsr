import React from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'

export async function fetchUserInfo({userId}) {
    try{
        const response = await axios.get(`https://3.34.197.56:443/api/users/lhj1234/user-info`)
        return response.data
    }
    catch(error){
        throw new Error(error)
    }
}
