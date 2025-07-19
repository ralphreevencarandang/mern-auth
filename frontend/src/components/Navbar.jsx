import React from 'react'
import {assets} from '../assets/assets.js'
import { Link, useNavigate } from 'react-router'
import { useContext } from 'react'
import { AppContent } from '../context/AppContext.jsx'
import toast from 'react-hot-toast'
import axios from '../lib/axios.js'
const Navbar = () => {
  const {userData,setUserData, setIsLoggedIn} = useContext(AppContent);

  const navigate = useNavigate();
  
    const logout = async ()=>{
      try {
        const res = await axios.post('/auth/logout')
        setIsLoggedIn(false)
        setUserData(false)
        navigate('/')
        toast.success('Logout Successfully!')
      } catch (error) {
        console.log('Error in logout function', error);
        toast.error(error.response.data.message)
      }
    }

    const sendVerificationOtp = async ()=>{
      try {
          const res = await axios.post('/auth/send-otp');
          navigate('/verify-email')
          toast.success('OTP send successfully!')
      } catch (error) {
          console.log('Error in Send Verification OTP function', error);
          toast.error(error)
      }
    }

  return (
    <div className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0'>
        <Link to={'/'}><img src={assets.logo} alt="Header Logo" className='w-28 sm:w-32'/></Link>
        {userData ? (
          <div className='w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative group cursor-pointer'>
              {userData.name[0].toUpperCase()}
              <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10'>
                <ul className='list-none m-0 p-2 bg-gray-100 text-sm'>
                  {!userData.isVerified && <li className='py-1 px-2 hover:bg-gray-200 cursor-pointer' onClick={()=> sendVerificationOtp()}>Verify email</li>}
                  <li className='py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10' onClick={()=> logout()}>Logout</li>
                </ul>

              </div>
          </div>
        ) :(
          <Link to={ '/login'} className='flex-center gap-2 border-1 border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all'>
          Login<img src={assets.arrow_icon} alt="arrow icon" />
          </Link>
          
        )}
        
     
    </div>
  )
}

export default Navbar
