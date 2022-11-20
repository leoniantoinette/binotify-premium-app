import React from 'react'
import registerImg from '../../assets/register.jpg'
import { Link,useNavigate } from 'react-router-dom'
import {useForm} from 'react-hook-form'
import Axios from 'axios'
import {useState} from 'react'  
function Register() {
  const [username, setUsernameReg] = useState('')
  const [password, setPasswordReg] = useState('')
  const [email, setEmailReg] = useState('')
  const [name, setNameReg] = useState('')

  const navigate = useNavigate()
  const registers=() =>{
    Axios.post("http://localhost:8080/registers",{
      username: username,
      password: password,
      email: email,
      name: name,
    })}
  const {register, getValues, handleSubmit, formState: {errors}} = useForm()
  const onSubmit = (data) => {
        console.log(data)
    };
  console.log(errors)
  return (
    <div>
      <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
          <div className='bg-gray-800 flex flex-col justify-center'>
              <form method="POST" onSubmit={handleSubmit(onSubmit)} className='max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8'>
                  <h2 className='text-4xl text-white font-bold text-center'>Register</h2>
                  <div className='field flex flex-col text-gray-400 py-2'>
                      <label >Name</label>
                      <input placeholder="Name.." className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="text" name='name' {...register('name',{required: true, pattern: /^[a-zA-Z ]{1,20}$/})}
                      onChange={(e)=>{
                        setNameReg(e.target.value);
                      }}/>
                  </div>
                    {errors.name && <p className='text-red-500'>Please Check Name</p>}
                  <div className='field flex flex-col text-gray-400 py-2'>
                      <label >Username</label>
                      <input placeholder="Username.." className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="text" name='username' {...register('username',{required: true, pattern: /^[a-z0-9_]{1,20}$/})}
                      onChange={(e)=>{
                        setUsernameReg(e.target.value);
                      }}/>
                  </div>
                    {errors.username && <p className='text-red-500'>Please Check Username</p>}
                    
                  <div className='field flex flex-col text-gray-400 py-2'>
                      <label>Email</label>
                      <input placeholder="Email.." className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="email" name='email' {...register('email',{required: true, pattern: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/})}
                      onChange={(e)=>{
                        setEmailReg(e.target.value);
                      }}/>
                  </div>
                  {errors.email && <p className='text-red-500'>Please Check Email</p>}
                  <div className='field flex flex-col text-gray-400 py-2'>
                      <label>Password</label>
                      <input placeholder="Password.." className='p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="password" name='password' {...register('password',{required: true})}
                      onChange={(e)=>{
                        setPasswordReg(e.target.value);
                      }}/>
                  </div>
                  {errors.password && <p className='text-red-500'>Please Check Password</p>}
                  <div className='field flex flex-col text-gray-400 py-2'>
                      <label>Confirm Password</label>
                      <input placeholder="Confirm password.." className='p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="password" name='confirmpassword' {...register('confirmpassword',{required: true, 
                      validate: (value) => {
                        const { password } = getValues();
                        return password === value || "Passwords should match!";
                      }})}
                      />
                  </div>
                    {errors.confirmpassword && <p className='text-red-500'>Please Check Confirm Password</p>}
                  <button  onClick={registers} type="submit" id='submit' name="register"className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'>Register</button>
                  <div className='flex justify-between text-gray-400 py-2'>
                      <p className='flex items-center'>Already Have an Account?</p> 
                      <p className='cursor-pointer'><Link to="/login">Login Here</Link></p>
                  </div>
              </form>
          </div>
          <div className='hidden sm:block'>
              <img className='w-full h-full object-cover' src={registerImg} alt="" />
          </div>
      </div>
    </div>
  )
}

export default Register