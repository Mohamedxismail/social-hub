"use client";
import { loginSchema, LoginSchemaType } from '@/app/schema/login.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import loginImage from '../../../assets/images/Gemini_Generated_Image_i0jdh0i0jdh0i0jd.png'
import Image from 'next/image';
import { TbLock } from "react-icons/tb";
import { MdOutlineMarkEmailRead } from 'react-icons/md';
import Link from 'next/link';
import AuthHeader from '@/app/_components/AuthHeader/AuthHeader';
const Login = () => {
    const [loadingApi, setLoadingApi] = useState(false)
    const router = useRouter()
    
    const loginForm = useForm<LoginSchemaType>({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: zodResolver(loginSchema)
    })
    async function handleLogin(values: LoginSchemaType) {
        setLoadingApi(true)
      
        const res = await signIn("credentials", {

            email: values.email,
            password: values.password,
            redirect: false,
            callbackUrl: "/"
        })
        console.log("SIGNIN RESULT:", res);
        if (res?.ok) {
            toast.success("signed in successfully", {
                duration: 1000,
                position: "top-center"
            })
            router.push(res?.url || "/")
            router.refresh()
            setLoadingApi(false)

        } else {
            toast.error("incorrect email or password", {
                duration: 1000,
                position: "top-center"
            })
            setLoadingApi(false)
        }
    }
    return (
        <div className='container m-auto md:flex md:items-center md:justify-center bg-white   '>
            <AuthHeader/>
            <div className="md:mt-0 mt-14 md:w-auto w-80 mx-auto">
                <Image src={loginImage} height={1000} width={1000} priority alt="login" />
            </div>
            <div className="container mx-auto flex flex-col items-center  ">
                <div className='title text-center'>
                    <h1 className='text-4xl mt-1 font-bold text-[#111E2D]'>Login</h1>
                </div>
                <form
                    className="mx-auto mt-4 p-5 md:p-0 w-full max-w-sm"
                    onSubmit={loginForm.handleSubmit(handleLogin)}
                >
                    <div className="mb-5">
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-[#6A798A]"
                        >
                            Email
                        </label>

                        <div className="relative flex justify-center items-center">
                            <input
                                disabled={loadingApi}
                                {...loginForm.register("email")}
                                type="email"
                                placeholder="Your Email"
                                id="email"
                                className="shadow-xs w-full ps-8 bg-[#F5F7FA] border border-gray-300 text-gray-900 text-sm rounded-3xl p-2.5"
                                required
                            />

                            <MdOutlineMarkEmailRead className="absolute left-2  text-gray-500 text-md" />
                        </div>

                        {loginForm.formState.errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {loginForm.formState.errors.email.message}
                            </p>
                        )}
                    </div>

                    <div className="mb-5">
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-[#6A798A]"
                        >
                            Password
                        </label>

                        <div className="relative pb-3 flex justify-center items-center">
                            <input
                                disabled={loadingApi}
                                {...loginForm.register("password")}
                                type="password"
                                id="password"
                                placeholder="Your Password"
                                className="shadow-xs w-full ps-7 bg-[#F5F7FA] border border-gray-300 text-gray-900 text-sm rounded-3xl p-2.5"
                                required
                            />

                            <TbLock className="absolute left-2  text-gray-500 text-md" />
                        </div>

                        {loginForm.formState.errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {loginForm.formState.errors.password.message}
                            </p>
                        )}

                        <span className="text-sm  font-light text-gray-400">
                            Don't have an account ?{" "}
                            <Link
                                href="/register"
                                className="text-[#111E2D] hover:underline font-light"
                            >
                                Sign Up
                            </Link>
                        </span>
                    </div>

                    {loadingApi ? (
                        <button
                            disabled
                            className="w-full text-white opacity-75 bg-[#1A324A] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            Loading
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="w-full text-white bg-[#1A324A] cursor-pointer font-semibold rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            Login Now
                        </button>
                    )}
                </form>
            </div>
        </div>
    )
}

export default Login
