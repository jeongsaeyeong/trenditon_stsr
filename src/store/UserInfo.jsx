import React from 'react'
import { useQuery } from 'react-query'
import { fetchUserInfo } from '../api/fetchUserInfo'

function UserInfo() {
    const {data,isLoading,error} = useQuery('userInfomation', fetchUserInfo)

    if(isLoading){
        return <div>Loading...</div>
    }
    if(error){
        return <div>Erorr: {error.messaage}</div>
    }
    console.log(JSON.stringify(data,null,2))
}

export default UserInfo