
import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Link from 'next/link'

function Login() {
  return (
    <div>
        <div  className="bg-[url('../../public/homePageBgImage.jpg')] bg-cover py-25">
        <div className="mx-110 border text-black border-black px-30 py-20 rounded-3xl bg-white/65">
            <h1 className='text-center'>Login</h1>
            <br />
            <form>
                <div>
                    <label htmlFor="email">Email</label>
                    <input className='w-full border border-gray-500 py-1 rounded-md mt-1 px-2' type="email" name='email' id='email' placeholder='Enter Your Email' required/>
                </div>
                <br />
                <div>
                    <label htmlFor="name">Password</label>
                    <input className='w-full border border-gray-500 py-1 rounded-md mt-1 px-2' type="password" name='name' id='name' placeholder='Enter Password' required/>
                </div>
                <br />
                <div className='flex'>
                    <a className='m-auto hover:text-blue-700' href="#">Forgot Password?</a>
                </div>
                <br />
                <div className='flex'>
                    <button className='bg-red-500 rounded-md px-8 py-2 m-auto cursor-pointer'>Login</button>
                </div>
                <br />
                <div className='flex'>
                    <Link className='m-auto hover:text-blue-700' href={'/Register'}>Don't Have an Account?
                    </Link>
                </div>
            </form>
        </div>
        </div>
    </div>
  )
}

export default Login