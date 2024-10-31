
import RegisterForm from '@/components/RegisterForm'
import React from 'react'

const page = () => {
    return (
        <div className='flex-center flex-col gap-4 p-12'>
            <h1 className='font-bold text-4xl text-blue-500'>Register page</h1>
            <RegisterForm />
        </div>
    )
}

export default page