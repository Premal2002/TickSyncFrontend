import React, { useState } from "react";
import { registerSchema, RegisterSchemaType } from "@/schemas/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { registerUser } from "@/services/userService";
import { useRouter } from "next/router";
import { successful } from "@/HelperFunctions/SwalFunctions";
import { Eye, EyeOff } from "lucide-react";

function Register() {
  const router = useRouter();
  // State for toggling password visibility
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  // Toggle visibility function
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterSchemaType) => {
    registerUser(data).then(response => {
      if (response) {
        router.push({
          pathname: "/Login",
          query: { email: data.email },
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
      <div className="bg-[url('../../public/homePageBgImage.jpg')] bg-cover">
        <div className="bg-white/5 backdrop-blur-[1px] font-bold w-full h-full py-15">
          <div className="mx-92 text-black px-30 py-10 rounded-3xl bg-white/8"
            style={{
              boxShadow: 'rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset',
            }}>
            <h1 className="text-center ">Sign Up</h1>
            <br />
            <form className="font-bold" onSubmit={handleSubmit(onSubmit, onError)}>
              <div>
                <label htmlFor="name">Name</label>
                <input
                  {...register("fullName")}
                  className="w-full border border-gray-900 py-2 rounded-md mt-1 px-2 outline-none"
                  type="text"
                  id="name"
                  placeholder="Enter Your Name"
                  required
                />
                {errors.fullName && (
                  <p className="text-red-600 text-sm">
                    {errors.fullName.message}
                  </p>
                )}
              </div>
              <br />
              <div>
                <label htmlFor="email">Email</label>
                <input
                  {...register("email")}
                  className="w-full border border-gray-900 py-2 rounded-md mt-1 px-2 outline-none"
                  type="text"
                  id="email"
                  placeholder="Enter Your Email"
                  required
                />
                {errors.email && (
                  <p className="text-red-600 text-sm">{errors.email.message}</p>
                )}
              </div>
              <br />
              <div>
                <label htmlFor="phone">Phone No.</label>
                <input
                  {...register("phone")}
                  className="w-full border border-gray-900 py-2 rounded-md mt-1 px-2 outline-none"
                  type="text"
                  id="phone"
                  placeholder="Enter your Phone number"
                  required
                />
                {errors.phone && (
                  <p className="text-red-600 text-sm">{errors.phone.message}</p>
                )}
              </div>
              <br />
              <div>
                <label htmlFor="password">Password</label>
                <div className="flex justify-between w-full border border-gray-900 py-2 rounded-md mt-1 px-2">
                  <input
                    {...register("passwordHash")}
                    className="w-full outline-0"
                    type={passwordVisible ? "text" : "password"}
                    id="password"
                    placeholder="Enter your Password"
                    required
                  />
                  {passwordVisible ? (
                    <Eye
                      onClick={togglePasswordVisibility}
                      className="w-6 h-6 text-gray-800 cursor-pointer"
                    />
                  ) : (
                    <EyeOff
                      onClick={togglePasswordVisibility}
                      className="w-6 h-6 text-gray-800 cursor-pointer"
                    />
                  )}
                </div>

                {errors.passwordHash && (
                  <p className="text-red-600 text-sm">
                    {errors.passwordHash.message}
                  </p>
                )}
              </div>
              <br />
              <div>
                <label htmlFor="confirmpassword">Confirm Password</label>
                <div className="flex justify-between w-full border border-gray-900 py-2 rounded-md mt-1 px-2">
                  <input
                    {...register("confirmPassword")}
                    className="w-full outline-0"
                    type={confirmPasswordVisible ? "text" : "password"}
                    id="confirmPassword"
                    placeholder="Re-Enter above Password"
                    required
                  />
                  {confirmPasswordVisible ? (
                    <Eye
                      onClick={toggleConfirmPasswordVisibility}
                      className="w-6 h-6 text-gray-800 cursor-pointer"
                    />
                  ) : (
                    <EyeOff
                      onClick={toggleConfirmPasswordVisibility}
                      className="w-6 h-6 text-gray-800 cursor-pointer"
                    />
                  )}
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-600 text-sm">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
              <br />
              <div className="flex">
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-500 rounded-md px-8 py-2 m-auto cursor-pointer"
                >
                  Register
                </button>
              </div>
              <br />
              <div className="flex">
                <Link className="m-auto hover:text-blue-700" href={"/Login"}>
                  Already Have an Account?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
