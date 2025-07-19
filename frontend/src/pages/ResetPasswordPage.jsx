import React from 'react'
import { Link } from 'react-router'
import { assets } from '../assets/assets'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import axios from '../lib/axios.js'
import { useRef } from 'react'
import { useNavigate } from 'react-router'
const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const inputRefs = useRef([])

  const [isEmailSent, setIsEmailSent] = useState(false)
  const [otp, setOtp] = useState(0)
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false)


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
  

  const sendResetOTP = useMutation({
    mutationFn: async(e)=>{
      e.preventDefault();
      try {
        const res = await axios.post('/auth/reset-otp', {email: email})
        setIsEmailSent(true)
        toast.success(res.data.message)
      } catch (error) {
        console.log('Error in send reset otp function', error);
        toast.error(error.response.data.message)
      }
    }
  })


  const onSubmitOTP = async (e) =>{
    e.preventDefault();
    try {
        const otpArray = inputRefs.current.map( e => e.value)
        setOtp(otpArray.join(''))
        setIsOtpSubmitted(true)
    } catch (error) {
        console.log('Error in onSubmitOTP function', error);
        toast.error(error)
        
    }
  }

  const onSubmitNewPassword = useMutation({
    mutationFn: async (e)=>{
      e.preventDefault();
      try {

        const res = await axios.post('/auth/reset-password', {email: email, otp:otp, newPassword:newPassword})
        console.log(res.data);
        navigate('/login')
        toast.success(res.data.message)
      } catch (error) {
        console.log('Error onSubmitNewPassword Function', error);
        toast.error(error.response.data.message)
        
      }
  }
  });
  

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400'>
          <Link to={'/'}><img src={assets.logo} alt="Header Logo" className='w-28 sm:w-32 absolute left-5 sm:left-20 top-5 '/></Link>

          {!isEmailSent &&
            <form onSubmit={(e)=> sendResetOTP.mutate(e)} className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm">
              <h1 className='text-white text-2xl font-semibold text-center mb-4'>Reset Password</h1>
                <p className='text-center mb-6 text-indigo-300'>Enter your registered email address</p>
                <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                  <img src={assets.mail_icon} alt="" className='w-3 h-3'/>
                  <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='Email' className='bg-transparent outline-none text-white w-full'/>

                </div>
                <button type='submit' disabled={sendResetOTP.isPending} className='w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full mt-3 cursor-pointer'>
                  {sendResetOTP.isPending ? 'Submiting...' : 'Submit'}</button>
            </form>
          }
          
          {!isOtpSubmitted && isEmailSent &&  
            <form onSubmit={(e)=> onSubmitOTP(e)} className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm">
                <h1 className='text-white text-2xl font-semibold text-center mb-4'>Reset password OTP</h1>
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
                <button type='submit' className='w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 rounded-klg text-white cursor-pointer '>Submit</button>
            </form>}
          
 
        

          {/* Enter new Password */}
          {isEmailSent && isOtpSubmitted &&
            <form onSubmit={(e)=>onSubmitNewPassword.mutate(e)} className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm">
              <h1 className='text-white text-2xl font-semibold text-center mb-4'>New Password</h1>
                <p className='text-center mb-6 text-indigo-300'>Enter enter the new password</p>
                <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                  <img src={assets.lock_icon} alt="" className='w-3 h-3'/>
                  <input type="password" value={newPassword} onChange={(e)=> setNewPassword(e.target.value)} placeholder='New Password' className='bg-transparent outline-none text-white w-full'/>

                </div>
                <button type='submit' disabled={sendResetOTP.isPending} className='w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full mt-3 cursor-pointer'>
                  {sendResetOTP.isPending ? 'Submiting...' : 'Submit'}</button>
            </form>
           }
           

    
      
    </div>
  )
}

export default ResetPasswordPage
