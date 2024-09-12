import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import authService from '../appwrite/auth'
import { useDispatch } from 'react-redux'
import { login } from '../redux/slices/authSlice'

export default function VerifiCation() {

    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
   // let userData = null

    const verify = async()=>{
        try {
            const response = await authService.verifyAccount(location)
           // userData = await authService.getCurrentUser()
            if(response)return response
        } catch (error) {
            console.log("erorwhihle verification", error)            
        }
    }

    useEffect(()=>{
        const res = verify()
        if(res){
           // dispatch(login({userData}))
            navigate('/')    
        }
        else{
            alert("Failed to verify")
            navigate('/sigup')
        }
    },[])

  return (
    <div className=' text-red-600'>
      wait we are verifying
    </div>
  )
}
