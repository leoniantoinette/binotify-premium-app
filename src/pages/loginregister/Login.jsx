import React from 'react'
import loginImg from '../../assets/login.png'
import { Link } from 'react-router-dom'
import {useForm} from 'react-hook-form'

function Tes() {
  const {register, handleSubmit, formState: {errors}} = useForm()
  const onSubmit = (data) => {
        console.log(data)
    };
  console.log(errors)
  return (
    <div>
        
      <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
        <div className='hidden sm:block'>
              <img className='w-full h-full object-cover' src={loginImg} alt="" />
          </div>
          <div className='bg-gray-800 flex flex-col justify-center'>
              <form onSubmit={handleSubmit(onSubmit)} className='max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8'>
                  <h2 className='text-4xl text-white font-bold text-center'>Login</h2>
                  <div className='field flex flex-col text-gray-400 py-2'>
                      <label >Username</label>
                      <input placeholder="Username.." className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="text" name='username' {...register('username',{required: true}, {pattern:{value:/^(?=.{1,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,message:"This is not a valid email"}})}/>
                  </div>
                    {errors.username && <p className='text-red-500'>Username is required</p>}
                  <div className='field flex flex-col text-gray-400 py-2'>
                      <label>Password</label>
                      <input placeholder="Password.." className='p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="password" name='password' {...register('password',{required: true})}/>
                  </div>
                  {errors.password && <p className='text-red-500'>Password is required</p>}
                  <button type='submit' className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'>Login</button>
                  <div className='flex justify-between text-gray-400 py-2'>
                      <p className='flex items-center'>Don't Have an Account?</p> 
                      <p className='cursor-pointer'><Link to="/register">Register Here</Link></p>
                  </div>
              </form>
          </div>
          
      </div>
    </div>
  )
}

export default Tes