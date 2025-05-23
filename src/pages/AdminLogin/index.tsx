// components/AdminLogin.tsx

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { successful } from '@/HelperFunctions/SwalFunctions';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginSchemaType } from '@/schemas/login';
import { loginUser } from '@/services/userService';
import { useAuth } from '@/HelperFunctions/AuthContext';

function AdminLogin() {
    const router = useRouter();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();

    const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginSchemaType>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = (data: LoginSchemaType) => {
        loginUser(data).then((response: any) => {
            if (response) {
                const authUser = response.data;
                // ✅ Set token in a cookie (accessible by middleware)
                Cookies.set("authenticatedUser", JSON.stringify(authUser), {
                    path: "/",
                    expires: 1,
                }); // expires in 1 day
                login();
                router.push({
                    pathname: "/AdminDashboard",
                });
                successful("Login Successful");
            }
        });
    };

    const onError = (formErrors: any) => {
        console.log("Validation Errors:", formErrors);
    };

    return (
        <div>
            <div className="bg-[url('../../public/homePageBgImage.jpg')] bg-cover py-25 ">

                <div className="text-black w-full max-w-md bg-white px-12 py-16 rounded-2xl shadow-xl  mx-auto mt-20">
                    <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>
                    <form onSubmit={handleSubmit(onSubmit, onError)}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block font-semibold mb-1">Email</label>
                            <input
                                className="w-full border border-black px-3 py-2 rounded-md outline-none"
                                type="text"
                                id="email"
                                {...register("email")}
                                placeholder="Admin Email"
                                required
                            />
                            {errors.email && (
                                <p className="text-red-600 text-sm">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="block font-semibold mb-1">Password</label>
                            <div className="flex items-center border border-black px-3 py-2 rounded-md">
                                <input
                                    className="w-full outline-none"
                                    type={passwordVisible ? 'text' : 'password'}
                                    id="password"
                                    {...register("password")}
                                    placeholder="Admin Password"
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
                                <p className="text-red-600 text-sm">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {error && <p className="text-red-600 text-sm text-center mb-2">{error}</p>}

                        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-md">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;
