'use client'
import React, { FormEvent } from 'react';
import { useUser } from '../context/UserContext';
import { useRouter } from 'next/navigation';
import { Input } from './ui/input';
import { Button } from './ui/button';



const LoginPage: React.FC = () => {
  const { login } = useUser();
  const router=useRouter();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const username = (form.elements.namedItem('userName') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    const response = await fetch('http://localhost:7000/api/auth/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      login(data.data); // Set the user in context
      router.push('/') // Redirect after login
    } else {
      console.error(data.message);
    }
  };

  return (
    <form className='shadow-xl p-12 rounded-lg w-1/2' onSubmit={handleLogin}>
      <div className='flex flex-col gap-2 m-2'>
        <label className='font-semibold text-blue-500'>Username</label>
        <Input type='text' placeholder='Enter Username' name='userName' />
      </div>
      <div className='flex flex-col gap-2 m-2'>
        <label className='font-semibold text-blue-500'>Password</label>
        <Input type='password' placeholder='Enter Password' name='password' />
      </div>
      <Button type='submit' className='mt-4 bg-blue-600 font-semibold hover:bg-blue-700'>Submit</Button>
    </form>
  );
};

export default LoginPage;
