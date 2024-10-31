'use client';

import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';

interface User {
  firstName: string;
  Points: number;
  // Add other properties as needed
}

const HomePage: React.FC = () => {
  const { user } = useUser();
  const [users, setUsers] = useState<User[]>([]);
  const { toast } = useToast();
  console.log(user?.username);
  

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:7000/api/user/v1/get-users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const handlereward = async (e: any) => {
    await fetch('http://localhost:7000/api/user/v1/claim-points', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user?.username)
    });
    toast({
      title: `Points Claimed for ${user?.firstName}`,
    })
  };


  return (
    <div className="p-8 bg-gray-50 w-[90%] mx-auto mt-12">
      <div className='flex justify-between items-center bg-blue-500 p-6 rounded-lg'>
        <div>
          <p></p>
          <p></p>
        </div>
        <div className='flex gap-4'>
          <User className='text-white' />
          <h2 className="text-2xl font-bold  text-white">Home Page</h2>
        </div>
      </div>

      {users.length > 0 ? (
        users.map((item, index) => (
          <div onClick={handlereward} key={index} className="px-4 py-2 flex justify-between items-center mt-8 hover:bg-gray-200 rounded-lg">

            <div className='flex-center gap-6'>
              <User />
              <div>
                <p>{item.firstName}</p>
                <p>Rank:{item.firstName}</p>
              </div>
            </div>
            <p className='text-orange-400'>Prize: ₹{item.Points}</p>
            <p className='text-green-400'>₹{item.Points}</p>
          </div>
        ))
      ) : (
        <p>Loading users...</p>
      )}
    </div>
  );
};

export default HomePage;
