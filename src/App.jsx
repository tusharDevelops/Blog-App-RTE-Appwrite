import React, { useEffect, useState } from 'react'
import Spinner from './components/Spinner'
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import authService from './appwrite/auth'
import { login, logout } from './redux/slices/authSlice'

import './App.css'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'

export default function App() {

  const[loading,setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])

return (
<>
    {
    loading ? <Spinner/> 
    :
    (
        <div className='min-h-screen flex w-screen bg-gray-400'>
        <div className='w-screen '>
          <Header />
          <main>
          <Outlet/>
          </main>
          <Footer />
        </div>
      </div>
    )

    }
</>  
  
)
}

