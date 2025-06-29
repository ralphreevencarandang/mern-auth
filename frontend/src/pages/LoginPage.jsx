import React from 'react'
import { assets } from '../assets/assets.js'
import { Link } from 'react-router'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import axios from '../lib/axios.js'
import {Formik, Form} from 'formik'
const LoginPage = () => {

  const [isLoginPage, setIsLoginPage] =useState(true);


  const registerMutation = useMutation({
    mutationFn: async ()=>{

    },
    onSuccess: ()=>{

    }
  })
  
  return (
    <div className='flex-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400'>
      <div className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0'>
              <Link to={'/'}><img src={assets.logo} alt="Header Logo" className='w-28 sm:w-32'/></Link>
      </div>
        <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm'>
            <h2 className='text-3xl font-semibold text-white text-center mb-3'>{isLoginPage ? 'Login Account' : 'Create Account'}</h2>
            <p className='text-center text-sm mb-6'>{isLoginPage ? 'Login your account' : 'Create your account'}</p>

            <form>

                {!isLoginPage && 
                <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                    <img src={assets.person_icon} alt="Person Icon" />
                    <input type="text" placeholder='Fullname' required className='bg-transparent outline-none'/>
                </div>
                }

                <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                    <img src={assets.mail_icon} alt="Email Icon" />
                    <input type="text" placeholder='Email' required className='bg-transparent outline-none'/>
                </div>


                <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                    <img src={assets.lock_icon} alt="Lock Icon" />
                    <input type="text" placeholder='Password' required className='bg-transparent outline-none'/>
                </div>
         
                {isLoginPage && 
                <div className='mb-4'>

                <Link to={'/verify-email'} className='text-indigo-500 cursor-pointer'>Forgot password?</Link>
                </div>
                }

                <button className='cursor-pointer w-full py-2.5 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-900 text-white font-medium'>{isLoginPage ? 'Login' : 'Sign Up' }</button>
            
            </form>

            {!isLoginPage && 
            <p className='text-gray-400 text-center text-xs mt-4'>Already have an account? {' '}
              <button onClick={()=> setIsLoginPage(!isLoginPage)}><span className='text-blue-400 cursor-pointer underline'>Login here</span></button>
            </p>
            }

            {isLoginPage && 
            <p className='text-gray-400 text-center text-xs mt-4'>Don't have an account? {' '}
              <button onClick={()=> setIsLoginPage(!isLoginPage)}><span className='text-blue-400 cursor-pointer underline'>Sign Up</span></button>
            </p>
            }
        </div>

    </div>
  )
}

export default LoginPage
