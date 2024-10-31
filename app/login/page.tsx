import Login from '@/components/Login'
import React from 'react'

const page = () => {
  return (
    <div className='flex-center flex-col gap-4 p-12'>
      <h1 className='font-bold text-4xl text-blue-500'>Login page</h1>
      <Login />
    </div>
  )
}

export default page