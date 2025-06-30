import React from 'react'
import {assets} from '../assets/assets.js'
import { Link } from 'react-router'
const Navbar = () => {
  return (
    <div className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0'>
        <Link to={'/'}><img src={assets.logo} alt="Header Logo" className='w-28 sm:w-32'/></Link>
        <Link to={'/login'} className='flex-center gap-2 border-1 border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all'>
          Login <img src={assets.arrow_icon} alt="arrow icon" />
        </Link>
     
    </div>
  )
}

export default Navbar
