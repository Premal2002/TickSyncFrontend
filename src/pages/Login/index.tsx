import Cookies from 'js-cookie';
import React, { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginSchemaType } from '@/schemas/login';
import { useRouter } from 'next/router';
import { LoginUser } from '@/services/userService';
import { successful } from '@/HelperFunctions/SwalFunctions';

function Login() {
    let router = useRouter()
    const { email } = router.query;
    //console.log(email);

    const [passwordVisible, setPasswordVisible] = useState(false);
    // Toggle visibility function
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginSchemaType>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = (data: LoginSchemaType) => {
        // console.log("User Register Data:", data);
        LoginUser(data).then((response: any) => {
            if (response) {
                const authUser = response.data;
                // ✅ Set token in a cookie (accessible by middleware)
                Cookies.set('authenticatedUser', JSON.stringify(authUser), { path: '/', expires: 1 }); // expires in 1 day
                router.push({ pathname: "/" });
                successful("Login Successful");
            }
        });
    };

    const onError = (formErrors: any) => {
        console.log("Validation Errors:", formErrors);
    };
    return (
        <div>
            <div className="bg-[url('../../public/homePageBgImage.jpg')] bg-cover py-25">
                <div className="mx-110 border text-black border-black px-30 py-20 rounded-3xl bg-white/65">
                    <h1 className='text-center'>Login</h1>
                    <br />
                    <form onSubmit={handleSubmit(onSubmit, onError)}>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input defaultValue={email == undefined ? "" : email} {...register("email")} className='w-full border border-gray-500 py-1 rounded-md mt-1 px-2 outline-none' type="text" name='email' id='email' placeholder='Enter Your Email' required />
                            {errors.email && (
                                <p className="text-red-600 text-sm">{errors.email.message}</p>
                            )}
                        </div>
                        <br />
                        <div>
                            <label htmlFor="password">Password</label>
                            <div className="flex justify-between w-full border border-gray-500 py-1 rounded-md mt-1 px-2">
                                <input
                                    {...register("password")}
                                    className="w-full outline-0"
                                    type={passwordVisible ? "text" : "password"}
                                    id="password"
                                    placeholder="Enter your Password"
                                    required
                                />
                                {passwordVisible ? (
                                    <svg
                                        onClick={togglePasswordVisibility}
                                        className="w-6 h-6 text-gray-800 cursor-pointer"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                                        />
                                        <path
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        onClick={togglePasswordVisibility}
                                        className="w-6 h-6 text-gray-800 cursor-pointer"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                        />
                                    </svg>
                                )}
                            </div>
                            {errors.password && (
                                <p className="text-red-600 text-sm">{errors.password.message}</p>
                            )}
                        </div>
                        <br />
                        <div className='flex'>
                            <a className='m-auto hover:text-blue-700' href="/ForgotPassword">Forgot Password?</a>
                        </div>
                        <br />
                        <div className='flex'>
                            <button type='submit' className='bg-red-600 hover:bg-red-500 rounded-md px-8 py-2 m-auto cursor-pointer'>Login</button>
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