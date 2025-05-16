// components/AdminLogin.tsx

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { successful } from '@/HelperFunctions/SwalFunctions';

function AdminLogin() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [error, setError] = useState('');

    const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        // Static admin credentials
        const staticEmail = 'admin@example.com';
        const staticPassword = 'admin123';

        if (email === staticEmail && password === staticPassword) {
            Cookies.set('authenticatedAdmin', JSON.stringify({ email }), { path: '/', expires: 1 });
            successful('Admin Login Successful');
            router.push('/admin/dashboard');
        } else {
            setError('Invalid email or password');
        }
    };

    return (
<div>
            <div className="bg-[url('../../public/homePageBgImage.jpg')] bg-cover py-25 ">
            
            <div className="text-black w-full max-w-md bg-white p-8 rounded-2xl shadow-xl  mx-auto mt-20">
                <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block font-semibold mb-1">Email</label>
                        <input
                            className="w-full border border-black px-3 py-2 rounded-md outline-none"
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Admin Email"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block font-semibold mb-1">Password</label>
                        <div className="flex items-center border border-black px-3 py-2 rounded-md">
                            <input
                                className="w-full outline-none"
                                type={passwordVisible ? 'text' : 'password'}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Admin Password"
                                required
                            />
                            <button type="button" onClick={togglePasswordVisibility} className="ml-2 text-black">
                                {passwordVisible ? '🙈' : '👁️'}
                            </button>
                        </div>
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
