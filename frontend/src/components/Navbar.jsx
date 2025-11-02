import React from 'react'
import { IoIosArrowRoundForward } from "react-icons/io";

import { useAppContext } from '../context/AppContext';
import { Flag } from 'lucide-react';


const Navbar = () => {
    const {navigate, token} = useAppContext()
  return (
    <div className='flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32'>
        <Flag onClick={()=> navigate('/')} className='w-6 sm:w-8 cursor-pointer' />
      <button onClick={()=> navigate('/admin')} className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5'>{token? 'Dasboard': 'Login'} <IoIosArrowRoundForward />
 </button>
    </div>
  )
} 

export default Navbar
