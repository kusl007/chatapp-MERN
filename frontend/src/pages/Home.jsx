import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const Home = () => {
    const {authUser} = useAuth()
    useEffect(()=>{
        if(!authUser){
            Navigate('/login')
        }
        console.log(authUser)
    },[authUser])
  return (
    <div>
        <div className="bg-red">hi  {authUser?.user?.fullname}</div>
      
    </div>
  )
}

export default Home
