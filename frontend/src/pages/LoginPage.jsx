import React, { useContext, useEffect } from 'react'
import { assets } from '../assets/assets.js'
import { Link } from 'react-router'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import axios from '../lib/axios.js'
import {Formik, Form} from 'formik'
import CustomInput from '../components/CustomInput.jsx'
import { registerSchema } from '../config/schemas/registerSchema.js'
import { useNavigate } from 'react-router'
import { AppContent } from '../context/AppContext.jsx'

const LoginPage = () => {

  const [isLoginPage, setIsLoginPage] =useState(true);
  const navigate = useNavigate();
  const { setIsLoggedIn,getUserData} = useContext(AppContent)
       

   
       


  const registerMutation = useMutation({
    mutationFn: async (values )=>{
        try { 
          const res = await axios.post('/auth/register', values)
          console.log('Submitting');
          setIsLoginPage(!isLoginPage)
          toast.success('Congratulations! You are now register!')
        } catch (error) {
            console.log('Error register Mutation', error)
            toast.error(error.response.data.message)
            console.log(`Error Status: ${error.response.status} ${error.response.statusText}`)
        }
    },
  })

  const loginMutation = useMutation({
    mutationFn: async(values)=>{
      try {
        axios.defaults.withCredentials=true
        const res = await axios.post('/auth/login', values);  
        setIsLoggedIn(true)
        toast.success('Successully Login! ')
        getUserData()
        navigate('/')

      } catch (error) {
        console.log('Error in login mutation', error);
        toast.error(error.response.data.message)
        console.log(`Error Status: ${error.response.status} ${error.response.statusText}`)
      }
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

            <Formik 
            initialValues={{name:'', email:'', password:''}} 


            validationSchema={!isLoginPage && registerSchema} 
            onSubmit={(values, actions)=>{
              if(isLoginPage){
                 loginMutation.mutate({
                    email: values.email,
                    password: values.password
                 })
              }else{
                  registerMutation.mutate(values)
                  actions.resetForm();

              }

            }}>

              {() =>

                <Form>
                    {!isLoginPage && 
                      <CustomInput imgUrl={assets.person_icon} alt={'Person Icon'} type="text" name="name" placeholder="Name" isLoginPage={isLoginPage}/>
                    }
                    <CustomInput imgUrl={assets.mail_icon} alt={'Email Icon'} type="text" name="email" placeholder="Email" isLoginPage={isLoginPage}/>
                    <CustomInput imgUrl={assets.lock_icon} alt={'Password Icon'} type="password" name="password" placeholder="Password" isLoginPage={isLoginPage}/>

                    {isLoginPage && 
                    <div className='mb-4'>
                    <Link to={'/reset-password'} className='text-indigo-500 cursor-pointer'>Forgot password?</Link>
                    </div>
                    }
                    <button type='submit' disabled={registerMutation.isPending || loginMutation.isPending} className={`cursor-pointer w-full py-2.5 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-900 text-white font-medium ${registerMutation.isPending ? 'opacity-70' : ''}`}>
                      {isLoginPage ? (loginMutation.isPending ? 'Logging in...' : 'Login') : (registerMutation.isPending ? 'Signing up...' : 'Sign up') }
                      </button>
                </Form>
              }
            </Formik>

            {!isLoginPage && 
            <p className='text-gray-400 text-center text-xs mt-4'>Already have an account? {' '}
              <button onClick={()=> setIsLoginPage(!isLoginPage)}><span className='text-blue-400 cursor-pointer underline'>Login here</span></button>
            </p>
            }

            {isLoginPage && 
            <p className='text-gray-400 text-center text-xs mt-4'>Don't have an account? {' '}
              <button onClick={()=> setIsLoginPage(!isLoginPage)} ><span className="text-blue-400 cursor-pointer underline }">Sign Up</span></button>
            </p>
            }
        </div>

    </div>
  )
}

export default LoginPage
