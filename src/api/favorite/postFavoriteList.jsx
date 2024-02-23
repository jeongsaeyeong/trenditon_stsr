import React from 'react'
import axios from 'axios'

async function postFavoriteList({userId,selectedItems}) {
    try{
        const categoryIdsList = selectedItems.filter((item) => item !== null).map((item) => item.categoryId);
        console.log("categoryids pre-post: ", categoryIdsList)
        const response = await axios.put(`https://3.34.197.56:443/api/categories/${userId}/change-categories`,{
            "categoryIds" : categoryIdsList
        })
        console.log("categoryids 후 post: ", categoryIdsList)
        return response.data
    }
    catch(error){
        return new Error(error)
    }
}

export default postFavoriteList