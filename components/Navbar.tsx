'use client'
import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import Link from 'next/link';
import { Button } from './ui/button';
import { User } from 'lucide-react';


const Navbar: React.FC = () => {
    const { user, logout } = useUser();
    const navLinks = [
        {
            name: 'Login',
            link: '/login'
        },
        {
            name: 'Register',
            link: '/register'
        }
    ];
    const [isOpen, setIsOpen] = useState(false);


    return (
        <nav className="p-4 shadow-md flex justify-between items-center bg-black text-white">
            <Link href={'/'}>
                <h1 className="text-xl font-bold">Leader Board</h1>
            </Link>

            {user ? (
                <div className="flex items-center gap-4">
                    <Button className='border' onClick={() => setIsOpen(prev => !prev)}>
                        <User />
                    </Button>
                    <Button
                        onClick={logout}
                        className="bg-red-500 hover:bg-red-600"
                    >
                        Logout
                    </Button>
                </div>
            ) : (
                <div className='flex-center gap-2'>
                    {navLinks.map(item => (
                        <Button className='bg-blue-500 hover:bg-blue-600' key={item.name}>
                            <Link href={item.link}>
                                {item.name}
                            </Link>
                        </Button>
                    ))}
                </div>
            )}

            {isOpen && (
                <div className='absolute top-20 right-20 rounded-xl w-[250px] h-[160px] border shadow-xl text-black p-4 bg-gray-200'>
                    <h1 className='font-semibold mb-3'>Name:<span className='text-blue-500 ml-2'>{user?.firstName}</span></h1>
                    <p className='font-semibold mb-3'>Email:<span className='text-blue-500 ml-2'>{user?.email}</span></p>
                    <p className='font-semibold mb-3'>Points:<span className='text-blue-500 ml-2'>{user?.Points}</span></p>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
