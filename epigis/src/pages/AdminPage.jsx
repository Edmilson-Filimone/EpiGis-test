import React from 'react'
import { toast } from 'react-toastify'
import { auth } from '../firebase.config'
import { useNavigate } from 'react-router-dom'

function AdminPage() {
    const navigate = useNavigate()
    
    const signOut = ()=>{
        auth.signOut()
        toast.info("You have been signed out")
        navigate('/')
    }

  return (
    <>
    <h3 className='text-2xl text-center mt-5 mx-auto font-semibold'>Administrator Page</h3>
    <button onClick={signOut} className='block mt-10 mx-auto py-2 px-3 shadow-md rounded-md bg-red-500 text-white text-center font-medium transition ease-in-out duration-100 hover:bg-red-600'>Sign Out</button>
    </>
  )
}

export default AdminPage