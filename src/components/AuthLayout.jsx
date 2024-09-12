import React, { useEffect, useState } from 'react'
import Spinner from './Spinner';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function AuthLayout({children, authentication=true}) {
    const[loading,setLoading]=useState(true);
    const authStatus = useSelector(state => state.auth.status)
    const navigate = useNavigate()

    useEffect(()=>{

        if(authentication && authentication !== authStatus){
            navigate('/login')
        }
        else if(!authentication && authentication !== authStatus){
            navigate('/')
        }
        
        setLoading(false)

    },[authentication,authStatus,navigate])

  return (
    <>
    {
        loading ? <Spinner/> : <>{children}</>
    }
    </>
   
  )
}
