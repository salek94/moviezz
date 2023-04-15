import * as Yup from 'yup';

// min 8 letter password, with at least a symbol, upper and lower case letters and a number
const passwordRules = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
const emailRules = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

export const ValidationUser = Yup.object().shape({
    
    firstName: Yup.string()
    .min(3, 'Must be 3 characters or more')
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
    lastName: Yup.string()
    .min(3, 'Must be 3 characters or more')
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
    userName: Yup.string()
    .min(3, 'Must be 3 characters or more')
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
    email: Yup.string()
    .email('Please enter valid email')
    .matches(emailRules, {message: 'Invalid email'})
    .required('Required'),
    password: Yup.string()
    .min(8, 'Must be 8 characters or more')
    .max(25, 'Must be 25 characters or less')
    .matches(passwordRules, {message:'Password must contain min 8 characters, with at least a symbol, upper and lower case letters and a number'})
    .required('Required'),
    confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Password must match')
})