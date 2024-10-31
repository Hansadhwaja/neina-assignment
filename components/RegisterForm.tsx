
'use client'
import React, { FormEvent } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import {  useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';

const RegisterForm = () => {
    const { login } = useUser();
    const router=useRouter();
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const firstName = (form.elements.namedItem('firstName') as HTMLInputElement).value;
        const lastName = (form.elements.namedItem('lastName') as HTMLInputElement).value;
        const username = (form.elements.namedItem('userName') as HTMLInputElement).value;
        const email = (form.elements.namedItem('email') as HTMLInputElement).value;
        const password = (form.elements.namedItem('password') as HTMLInputElement).value;

        const newUser = {
            firstName,
            lastName,
            username,
            email,
            password
        };

        try {
            const response = await fetch('http://localhost:7000/api/auth/v1/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            });
            const data = await response.json();


            if (response.ok) {
                login(data.data);
                router.push('/') ;
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    return (
        <form className='shadow-xl p-12 rounded-lg' onSubmit={handleSubmit}>
            <div className='flex gap-4 m-2'>
                <div className='flex flex-col gap-2'>
                    <label className='font-semibold text-blue-500'>First Name</label>
                    <Input type='text' placeholder='Enter First Name' name='firstName' />
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='font-semibold text-blue-500'>Last Name</label>
                    <Input type='text' placeholder='Enter Last Name' name='lastName' />
                </div>
            </div>
            <div className='flex flex-col gap-2 m-2'>
                <label className='font-semibold text-blue-500'>Username</label>
                <Input type='text' placeholder='Enter Username' name='userName' />
            </div>
            <div className='flex flex-col gap-2 m-2'>
                <label className='font-semibold text-blue-500'>Email</label>
                <Input type='text' placeholder='Enter Email' name='email' />
            </div>
            <div className='flex flex-col gap-2 m-2'>
                <label className='font-semibold text-blue-500'>Password</label>
                <Input type='password' placeholder='Enter Password' name='password' />
            </div>
            <Button type='submit' className='mt-4 bg-blue-600 font-semibold hover:bg-blue-700'>Submit</Button>
        </form>
    );
};

export default RegisterForm;
