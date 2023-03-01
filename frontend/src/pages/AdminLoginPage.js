import React from 'react'
import Login from '../components/Login/Login'

function AdminLoginPage() {
  return (
    <Login admin={true} />
  )
}

export default AdminLoginPage