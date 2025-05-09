import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { successful, responseError } from '@/HelperFunctions/SwalFunctions';

import { baseURL } from "@/HelperData/datavariables";
const API_URL = baseURL;



function ForgotPassword() {
  const router = useRouter();
  const { email: emailQuery } = router.query;

  const [step, setStep] = useState<'email' | 'otp' | 'reset' | 'done'>('email');
  const [email, setEmail] = useState(emailQuery as string || '');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

      // Toggle visibility function
      const togglePasswordVisibility = () => {
          setPasswordVisible(!passwordVisible);
      };
      const toggleConfirmPasswordVisibility = () => {
          setConfirmPasswordVisible(!confirmPasswordVisible);
      };

  const sendOtp = async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if (res.ok) {
        successful(``);
        setStep('otp');
      } else {
        responseError("Failed to send OTP");
      }
    } catch (err) {
      responseError("Network error");
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/verify-reset-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, secretCode: otp })
      });
      const data = await res.json();
      if (res.ok && data.verified) {
        successful("OTP verified");
        setStep('reset');
      } else {
        responseError("Invalid or expired OTP");
      }
    } catch {
      responseError("Verification failed");
    }
  };

  const resetPassword = async () => {
    if (newPassword !== confirmPassword) {
      responseError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, secretCode: otp, newPassword, confirmPassword })
      });

      if (res.ok) {
        successful("Password reset successful");
        setStep('done');
        setTimeout(() => router.push('/Login'), 1500);
      } else {
        responseError("Password reset failed");
      }
    } catch {
      responseError("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat text-black" style={{ backgroundImage: "url('/homePageBgImage.jpg')" }}>
      <div className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[33%] bg-white/65 border border-black px-6 py-8 rounded-3xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
  
        {step === 'email' && (
          <>
            <label className="block mb-2">Email:</label>
            <input
              className="w-full border rounded p-2 mb-4 text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your registered email"
              required
            />
            <button onClick={sendOtp} className="w-full bg-gray-700 text-white py-2 rounded">
              Send OTP
            </button>
          </>
        )}
  
        {step === 'otp' && (
          <>
            <label className="block mb-2">Enter OTP</label>
            <input
              className="w-full border rounded p-2 mb-4"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              type="text"
              placeholder="6-digit code"
              required
            />
            <button onClick={verifyOtp} className="w-full bg-red-500 text-white py-2 rounded">
              Verify OTP
            </button>
          </>
        )}
  
        {step === 'reset' && (
          <>
            <label className="block mb-2">New Password</label>
            <div className="flex items-center border border-gray-500 py-2 rounded-md mb-4 px-4">
              <input
                className="w-full outline-none"
                type={passwordVisible ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
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

          <label className="block mb-2">Confirm Password</label>
          <div className="flex items-center border border-gray-500 py-2 rounded-md mb-4 px-4">
            <input
              className="w-full outline-none"
              type={confirmPasswordVisible ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              required
            />
            {confirmPasswordVisible ? (
                                    <svg
                                        onClick={toggleConfirmPasswordVisibility}
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
                                        onClick={toggleConfirmPasswordVisibility}
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

          <button onClick={resetPassword} className="w-full bg-black text-white py-2 rounded mt-4">
            Reset Password
          </button>
        </>
      )}

      {step === 'done' && (
        <div className="text-center text-green-700">
          Your password has been reset. Redirecting to login...
        </div>
      )}
    
    </div>
    </div>
  );
}

export default ForgotPassword;
