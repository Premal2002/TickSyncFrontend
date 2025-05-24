import React, { useState } from "react";
import { useRouter } from "next/router";
import { successful, responseError } from "@/HelperFunctions/SwalFunctions";

import { baseURL } from "@/HelperData/datavariables";
import {
  forgotPassword,
  resetPasswordApi,
  verifyOtpApi,
} from "@/services/userService";
import { useForm } from "react-hook-form";
import {
  forgotpasswordSchema,
  ForgotPasswordSchemaType,
  resetPasswordSchema,
  ResetPasswordSchemaType,
  verifyOtpSchema,
  VerifyOtpSchemaType,
} from "@/schemas/forgotpassword";
import { zodResolver } from "@hookform/resolvers/zod";
const API_URL = baseURL;

function ForgotPassword() {
  const router = useRouter();
  const { email: emailQuery } = router.query;

  const [step, setStep] = useState<"email" | "otp" | "reset" | "done">("email");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [emailFromForgotForm, setEmailFromForgotForm] = useState<string | null>(null);
  const [otpFromForgotForm, setOtpFromForgotForm] = useState<string | null>(null);

  const {
    register: registerForgot,
    handleSubmit: handleForgotSubmit,
    formState: { errors: errorsForgot },
  } = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(forgotpasswordSchema),
  });

  const {
    register: verifyOtpRegister,
    handleSubmit: handleVerifyOtpSubmit,
    formState: { errors: errorsVerifyOtp },
  } = useForm<VerifyOtpSchemaType>({
    resolver: zodResolver(verifyOtpSchema),
  });

  const {
    register: resetPasswordRegister,
    handleSubmit: handleResetPasswordSubmit,
    formState: { errors: errorsResetPassword },
  } = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(resetPasswordSchema),
  });

  // Toggle visibility function
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const sendOtp = async (data: ForgotPasswordSchemaType) => {
    forgotPassword(data).then((response: any) => {
      if (response) {
        successful(response.data);
        setStep("otp");
        setEmailFromForgotForm(data.email);
      }
    });
  };

  const verifyOtp = async (data: VerifyOtpSchemaType) => {
    const otp = data.otp;
    verifyOtpApi({ email: emailFromForgotForm, secretCode: otp }).then(
      (response: any) => {
        if (response && response.data.verified) {
          successful("OTP verified");
          setStep("reset");
          setOtpFromForgotForm(data.otp);
        }
      }
    );
  };

  const resetPassword = async (data: ResetPasswordSchemaType) => {
    resetPasswordApi({
      email: emailFromForgotForm,
      secretCode: otpFromForgotForm,
      newPassword: data.password,
      confirmPassword: data.confirmPassword,
    }).then((response: any) => {
      if (response) {
        successful(response.data.message);
        router.push("/Login");
        setStep("done");
      }
    });
  };

  const setInitialStep = () => {
    window.location.reload();
  };

  const onError = (formErrors: any) => {
    console.log("Validation Errors:", formErrors);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat text-black"
      style={{ backgroundImage: "url('/homePageBgImage.jpg')" }}
    >
      <div className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[35%] bg-white/15 border border-black px-6 py-8 rounded-3xl"
        style={{
          boxShadow: 'rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset',
        }}>
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>

        {step === "email" && (
          <>
            <form onSubmit={handleForgotSubmit(sendOtp, onError)}>
              <div>
                <label htmlFor="email" className="block mb-2">
                  Email:
                </label>
                <input
                  {...registerForgot("email")}
                  id="email"
                  className="w-full border rounded p-2 mb-4 text-black"
                  type="text"
                  placeholder="Enter your registered email"
                  required
                />{" "}
                {errorsForgot.email && (
                  <p className="text-red-600 text-sm">
                    {errorsForgot.email.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-gray-700 text-white py-2 rounded"
              >
                Send OTP
              </button>
            </form>
          </>
        )}

        {step === "otp" && (
          <>
            <form onSubmit={handleVerifyOtpSubmit(verifyOtp, onError)}>
              <div>
                <label htmlFor="otp" className="block mb-2">
                  Enter OTP
                </label>
                <input
                  {...verifyOtpRegister("otp")}
                  id="otp"
                  className="w-full border rounded p-2 mb-4"
                  type="text"
                  placeholder="6-digit code"
                  required
                />
                {errorsVerifyOtp.otp && (
                  <p className="text-red-600 text-sm">
                    {errorsVerifyOtp.otp.message}
                  </p>
                )}
              </div>
              <div className="flex py-2">
                <a
                  className="m-auto hover:text-blue-700"
                  href="#"
                  onClick={setInitialStep}
                >
                  Want to resend Otp?
                </a>
              </div>
              <button
                type="submit"
                className="w-full bg-red-500 text-white py-2 rounded"
              >
                Verify OTP
              </button>
            </form>
          </>
        )}

        {step === "reset" && (
          <>
            <form onSubmit={handleResetPasswordSubmit(resetPassword, onError)}>
              <div>
                <label htmlFor="password" className="block mb-2">New Password</label>
                <div id="password" className="flex items-center border border-gray-500 py-2 rounded-md mb-4 px-4">
                  <input
                    {...resetPasswordRegister('password')}
                    className="w-full outline-none"
                    type={passwordVisible ? "text" : "password"}
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
                {errorsResetPassword.password && (
                  <p className="text-red-600 text-sm">
                    {errorsResetPassword.password.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block mb-2">Confirm Password</label>
                <div id="confirmPassword" className="flex items-center border border-gray-500 py-2 rounded-md mb-4 px-4">
                  <input
                    {...resetPasswordRegister('confirmPassword')}
                    className="w-full outline-none"
                    type={confirmPasswordVisible ? "text" : "password"}
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
                {errorsResetPassword.confirmPassword && (
                  <p className="text-red-600 text-sm">
                    {errorsResetPassword.confirmPassword.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded mt-4"
              >
                Reset Password
              </button>
            </form>
          </>
        )}

        {step === "done" && (
          <div className="text-center text-green-700">
            Your password has been reset. Redirecting to login...
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
