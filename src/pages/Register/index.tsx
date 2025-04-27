import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { registerSchema, RegisterSchemaType } from "@/schemas/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";

function Register() {
  // State for toggling password visibility
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  // Toggle visibility function
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterSchemaType) => {
    console.log("User Register Data:", data);
  };

  return (
    <div>
      <div className="bg-[url('../../public/homePageBgImage.jpg')] bg-cover py-25">
        <div className="mx-110 border text-black border-black px-30 py-20 rounded-3xl bg-white/65">
          <h1 className="text-center ">Sign Up</h1>
          <br />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="name">Name</label>
              <input
                {...register("fullname")}
                className="w-full border border-gray-500 py-1 rounded-md mt-1 px-2"
                type="text"
                name="name"
                id="name"
                placeholder="Enter Your Name"
                required
              />
              {errors.fullname && (
                <p className="text-red-600 text-sm">
                  {errors.fullname.message}
                </p>
              )}
            </div>
            <br />
            <div>
              <label htmlFor="email">Email</label>
              <input
                {...register("email")}
                className="w-full border border-gray-500 py-1 rounded-md mt-1 px-2"
                type="text"
                name="email"
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
                className="w-full border border-gray-500 py-1 rounded-md mt-1 px-2"
                type="text"
                name="phone"
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
              <div className="flex justify-between w-full border border-gray-500 py-1 rounded-md mt-1 px-2">
                <input
                  {...register("password")}
                  className="w-full outline-0"
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Enter your Password"
                  required
                />
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
              </div>

              {errors.password && (
                <p className="text-red-600 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <br />
            <div>
              <label htmlFor="confirmpassword">Confirm Password</label>
              <div className="flex justify-between w-full border border-gray-500 py-1 rounded-md mt-1 px-2">
                <input
                  {...register("confirmPassword")}
                  className="w-full outline-0"
                  type={confirmPasswordVisible ? "text" : "password"}
                  name="confirmpassword"
                  id="confirmpassword"
                  placeholder="Re-Enter above Password"
                  required
                />
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
                className="bg-red-500 rounded-md px-8 py-2 m-auto cursor-pointer"
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
  );
}

export default Register;
