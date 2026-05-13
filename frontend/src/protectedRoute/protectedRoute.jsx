import React, { useContext } from 'react'
import { AuthContext } from '../context/Authcontext'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({children}) {

    const {isAuth , loading} = useContext(AuthContext)
    if(loading) return <p>Loading...</p>
    if(!isAuth) return <Navigate to={'/login'}></Navigate>
  return (
    children
  )
}
// code lo check krvana h 
