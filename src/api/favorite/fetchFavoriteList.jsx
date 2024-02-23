import React from 'react'
import axios from 'axios'

async function fetchFavoriteList() {
    try{
        const response = await axios.get('https://3.34.197.56:443/api/categories/read-all')
        return response.data
    }
    catch(error){
        return new Error(error)
    }
}

export default fetchFavoriteList