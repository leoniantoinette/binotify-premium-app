import React from 'react'
import registerImg from '../../assets/register.jpg'
import { Link } from 'react-router-dom'
function register() {
  return (
    <div>

<div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>

        <div className='bg-gray-800 flex flex-col justify-center'>
            <form className='max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8'>
                <h2 className='text-4xl text-white font-bold text-center'>Register</h2>
                <div className='flex flex-col text-gray-400 py-2'>
                    <label>Username</label>
                    <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="text" />
                </div>
                <div className='flex flex-col text-gray-400 py-2'>
                    <label>Email</label>
                    <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="email" />
                </div>
                <div className='flex flex-col text-gray-400 py-2'>
                    <label>Password</label>
                    <input className='p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="password" />
                </div>
                <div className='flex flex-col text-gray-400 py-2'>
                    <label>Confirm Password</label>
                    <input className='p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="password" />
                </div>
                <button className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'>Register</button>
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

export default register