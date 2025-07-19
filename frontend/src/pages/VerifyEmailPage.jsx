import React, { useEffect } from 'react'
import { Link } from 'react-router'
import { assets } from '../assets/assets'
import { useRef } from 'react'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import axios from '../lib/axios.js'
import { useNavigate } from 'react-router'
import { AppContent } from '../context/AppContext.jsx'
import { useContext } from 'react'
const VerifyEmailPage = () => {
  const navigate = useNavigate()
  const inputRefs = useRef([])

  const {getUserData, isLoggedIn, userData} = useContext(AppContent)

  const handleInput = (e, index)=>{
    if(e.target.value.length > 0 && index < inputRefs.current.length - 1){
        inputRefs.current[index + 1].focus();
    }
  }

  const handleKeyDown = (e, index)=>{
    if(e.key === 'Backspace' && e.target.value === '' && index > 0){
        inputRefs.current[index - 1].focus();

    }
  }

  const handlePaste = (e)=>{
    const paste = e.clipboardData.getData('text')
    const pasteArray = paste.split('')
    pasteArray.forEach((char, index) => {
      if(inputRefs.current[index]){
          inputRefs.current[index].value = char;
      }
    });
  }
  

  const verifyOTPMutaion = useMutation({
    mutationFn: async(e)=>{
      e.preventDefault()
        try {
          const otpArray = inputRefs.current.map(e => e.value)
          const otp = otpArray.join('')
          const res = await axios.post('/auth/verify-otp',{otp})
          getUserData()
          navigate('/')
          toast.success(res.data.message)
        } catch (error) {
            console.log('Error in SendOTP Mutaion', error);
            toast.error(error.message)
        }
    }
  })

  useEffect(()=>{
    isLoggedIn && userData && userData.isVerified && navigate('/')
  }, [isLoggedIn, userData])

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400'>
          <Link to={'/'}><img src={assets.logo} alt="Header Logo" className='w-28 sm:w-32 absolute left-5 sm:left-20 top-5 '/></Link>
          <form onSubmit={(e)=> verifyOTPMutaion.mutate(e)} className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm">
              <h1 className='text-white text-2xl font-semibold text-center mb-4'>Email Verify OTP</h1>
              <p className='text-center mb-6 text-indigo-300'>Enter the 6-digit code sent to your email</p>
              <div className="flex justify-between mb-8">
                  {Array(6).fill(0).map((_, index)=> 
                    <input type="text" maxLength='1' key={index} required className='w-12 h-12 bg-[#333A5C]  text-white text-center text-xl rounded-md'
                     ref={e => inputRefs.current[index] = e} 
                     onInput={(e)=> handleInput(e, index)} 
                     onKeyDown={(e)=> handleKeyDown(e, index)}
                     onPaste={handlePaste}
                     />
                  )}
              </div>
              <button type='submit' className='w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 rounded-klg text-white cursor-pointer '>Verify email</button>
          </form>
    </div>
  )
}

export default VerifyEmailPage
