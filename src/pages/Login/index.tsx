import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchemaType } from "@/schemas/login";
import { useRouter } from "next/router";
import { loginUser } from "@/services/userService";
import { infoMsg, responseError, responseErrorReload, successful } from "@/HelperFunctions/SwalFunctions";
import { useAuth } from "@/HelperFunctions/AuthContext";
import { Eye, EyeOff } from "lucide-react";
import { logOutUser } from "@/HelperFunctions/userFunctions";

function Login() {
  let router = useRouter();
  const { email } = router.query;
  const { fromMiddleware } = router.query;
  const { login, isLoggedIn } = useAuth();

  if (fromMiddleware) {
    if(fromMiddleware.includes("Token expired")){
      logOutUser();
      router.replace("/Login");
      responseErrorReload(fromMiddleware);      
    }else{
      responseError(fromMiddleware);
      router.push("/Login");
    }
  }

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
    if(isLoggedIn){
      infoMsg("Already Logged in. Log out first to log in with different account!")
      router.replace("/")
    }else{
      loginUser(data).then((response: any) => {
        if (response) {
          const authUser = response.data;
          // Setting token in a cookie
          Cookies.set("authenticatedUser", JSON.stringify(authUser), {
            path: "/",
            expires: 1,
          }); 
          login();
          router.push({
            pathname: "/",
          });
          successful("Login Successful");
        }
      });
    }
    
  };

  const onError = (formErrors: any) => {
    console.log("Validation Errors:", formErrors);
  };
  return (
    <div>
      <div className="bg-gradient-to-r from-slate-200 to-slate-400">
      <div className="bg-white/5 backdrop-blur-[3px] font-bold w-full h-full py-15">
        <div className="mx-4 sm:mx-20 md:mx-40 lg:mx-60 xl:mx-80 2xl:mx-110 text-black px-8 py-10 xs:py-15 xs:px-15 lg:py-20 lg:px-30 rounded-3xl bg-white/15"
        style={{
          boxShadow: 'rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset',
        }}>
          <h1 className="text-center">Login</h1>
          <br />
          <form className="font-bold" onSubmit={handleSubmit(onSubmit, onError)}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                defaultValue={email == undefined ? "" : email}
                {...register("email")}
                className="w-full border border-gray-900 py-2 rounded-md mt-1 px-2 outline-none"
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
              <label htmlFor="password">Password</label>
              <div className="flex justify-between w-full border border-gray-900 py-2 rounded-md mt-1 px-2">
                <input
                  {...register("password")}
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
              {errors.password && (
                <p className="text-red-600 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <br />
            <div className="flex">
              <a className="m-auto hover:text-blue-700" href="/ForgotPassword">
                Forgot Password?
              </a>
            </div>
            <br />
            <div className="flex">
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-500 text-white rounded-md px-8 py-2 m-auto cursor-pointer"
              >
                Login
              </button>
            </div>
            <br />
            <div className="flex">
              <Link className="m-auto hover:text-blue-700" href={"/Register"}>
                Don't Have an Account?
              </Link>
            </div>
          </form>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Login;
