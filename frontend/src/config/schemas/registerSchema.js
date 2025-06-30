import * as yup from 'yup';

const passwordRules= /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$/

export const registerSchema = yup.object().shape({
    name: yup.string().min(3).required('Name field is required'),
    email: yup.string().email('Please enter a valid email').required('Email field is required'),
    password: yup.string().min(4).matches(passwordRules, {message: 'Please create a stronger password'}).required('Password field is required')
})