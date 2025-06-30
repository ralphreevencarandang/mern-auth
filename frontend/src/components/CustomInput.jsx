import React from 'react'
import {  useField } from 'formik'
const CustomInput = ({label, imgUrl, alt, ...props}) => {

    const [field, meta] = useField(props)


    
  return (

    <div className='mb-4 '>
        <div className={`flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C] ${meta.touched && meta.error ? 'border border-red-500' : ''}`}>
            <img src={imgUrl} alt={alt} />
            <input {...field} {...props} className='bg-transparent outline-none w-full'/>
            
        </div>
        <p className='text-xs text-red-500 px-5'>{meta.touched && meta.error ? meta.error : ''}</p>

    </div>
  )
}

export default CustomInput
