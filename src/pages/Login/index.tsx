
import React from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'

function Login() {
  return (
    <div>
        <Navbar />
        <div className='bg-red-50 py-25'>
        <div className="mx-110 border border-black px-30 py-25 rounded-3xl bg-white">
            <h1 className='text-center'>Login</h1>
            <form>
                <div>
                    <label htmlFor="name">Name</label>
                    <input className='w-full border border-gray-500 py-1 rounded-md mt-1 px-2' type="text" name='name' id='name' placeholder='Enter Your Name' required/>
                </div>
                <br />
                <div>
                    <label htmlFor="email">Email</label>
                    <input className='w-full border border-gray-500 py-1 rounded-md mt-1 px-2' type="email" name='email' id='email' placeholder='Enter Your Email' required/>
                </div>
                <br />
                <div className='flex'>
                    <a className='ms-auto' href="#">Forgot Password</a>
                </div>
                <br />
                <div className='flex'>
                    <button className='bg-red-500 rounded-xl px-8 py-2 m-auto cursor-pointer'>Login</button>
                </div>
                <br />
                <div className='flex'>
                    <a className='m-auto' href="#">Don't Have an Account?</a>
                </div>
            </form>
        </div>
        </div>
        <Footer />
    </div>
  )
}

export default Login