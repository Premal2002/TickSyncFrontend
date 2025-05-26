// components/AdminLogin.tsx

import React, { useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { successful } from "@/HelperFunctions/SwalFunctions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchemaType } from "@/schemas/login";
import { loginUser } from "@/services/userService";
import { useAuth } from "@/HelperFunctions/AuthContext";
import { Eye, EyeOff } from "lucide-react";

function AdminLogin() {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
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
      <div className="bg-[url('../../public/homePageBgImage.jpg')] bg-cover">
        <div className="bg-white/5 backdrop-blur-[1px] font-bold w-full h-full py-20">
          <div className="text-black w-full max-w-md bg-white/20 px-12 py-16 rounded-2xl shadow-xl mx-auto">
            <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>
            <form onSubmit={handleSubmit(onSubmit, onError)}>
              <div className="mb-4">
                <label htmlFor="email" className="block font-semibold mb-1">
                  Email
                </label>
                <input
                  className="w-full border border-black px-3 py-2 rounded-md outline-none"
                  type="text"
                  id="email"
                  {...register("email")}
                  placeholder="Admin Email"
                  required
                />
                {errors.email && (
                  <p className="text-red-600 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block font-semibold mb-1">
                  Password
                </label>
                <div className="flex items-center border border-black px-3 py-2 rounded-md">
                  <input
                    className="w-full outline-none"
                    type={passwordVisible ? "text" : "password"}
                    id="password"
                    {...register("password")}
                    placeholder="Admin Password"
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
                {errors.password && (
                  <p className="text-red-600 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
