"use client";
import { registerSchema, RegisterSchemaType } from '@/app/schema/register.schema';
import { API_BASE_URL } from '@/config/api';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import RegiserImage from '../../../assets/images/Gemini_Generated_Image_jbrdrsjbrdrsjbrd.png';
import Image from 'next/image';
import { FaUserAlt, FaUserCheck } from 'react-icons/fa';
import { MdMarkEmailRead } from 'react-icons/md';
import { TbLockCheck, TbLockFilled } from 'react-icons/tb';
import Link from 'next/link';
import AuthHeader from '@/app/_components/AuthHeader/AuthHeader';

const Register = () => {
    const [loadingApi, setLoadingApi] = useState(false);
    const router = useRouter();


    const registerForm = useForm<RegisterSchemaType>({
        defaultValues: {
            name: "",
            username: "",
            email: "",
            dateOfBirth: "",
            gender: undefined,
            password: "",
            rePassword: "",
        },
        resolver: zodResolver(registerSchema)
    });

    async function handleRegister(values: RegisterSchemaType) {
        try {
            setLoadingApi(true);
            const { data } = await axios.post(`${API_BASE_URL}/users/signup`, values, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            setLoadingApi(false);
            toast.success(data.message, {
                description: "You can now login",
                duration: 2000,
                position: "top-center"
            });
            router.push("/login");
            console.log(data);
        } catch {
            setLoadingApi(false);
            toast.error("An error occurred", {
                description: "Please try again",
                duration: 2000,
                position: "top-center"
            });
        }
    }

    return (
        <div className='container mx-auto md:flex md:items-center md:justify-center p-5'>
            <AuthHeader />
            <div className="md:mt-0 mt-14 md:w-auto w-80 mx-auto ">
                <Image src={RegiserImage} width={900} height={900} priority alt="register" />
            </div>
            <div className="container mx-auto flex flex-col items-center">
                <div className='title text-center mb-4'>
                    <h1 className='text-4xl mt-5 font-bold'>Register</h1>
                </div>

                <form
                    className="mx-auto w-full md:max-w-xl p-3"
                    onSubmit={registerForm.handleSubmit(handleRegister)}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-[#6A798A]">
                                Name
                            </label>
                            <div className="relative flex justify-center items-center">
                                <input
                                    disabled={loadingApi}
                                    {...registerForm.register("name")}
                                    type="text"
                                    id="name"
                                    placeholder="Your Name"
                                    className="shadow-xs w-full ps-7 bg-[#F5F7FA] border border-gray-300 text-gray-900 text-sm rounded-3xl p-2.5"
                                    required
                                />
                                <FaUserAlt className="absolute left-2 text-gray-500 text-sm" />
                            </div>
                            {registerForm.formState.errors.name && (
                                <p className="text-red-500 text-sm mt-1">
                                    {registerForm.formState.errors.name.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-[#6A798A]">
                                User Name
                            </label>
                            <div className="relative flex justify-center items-center">
                                <input
                                    disabled={loadingApi}
                                    {...registerForm.register("username")}
                                    type="text"
                                    id="username"
                                    placeholder="Your Username"
                                    className="shadow-xs w-full ps-8 bg-[#F5F7FA] border border-gray-300 text-gray-900 text-sm rounded-3xl p-2.5"
                                    required
                                />
                                <FaUserCheck className="absolute left-2 text-gray-500 text-md" />
                            </div>
                            {registerForm.formState.errors.username && (
                                <p className="text-red-500 text-sm mt-1">
                                    {registerForm.formState.errors.username.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-[#6A798A]">
                                Email
                            </label>
                            <div className="relative flex justify-center items-center">
                                <input
                                    disabled={loadingApi}
                                    {...registerForm.register("email")}
                                    type="email"
                                    id="email"
                                    placeholder="Your Email"
                                    className="shadow-xs w-full ps-8 bg-[#F5F7FA] border border-gray-300 text-gray-900 text-sm rounded-3xl p-2.5"
                                    required
                                />
                                <MdMarkEmailRead className="absolute left-2 text-gray-500 text-md" />
                            </div>
                            {registerForm.formState.errors.email && (
                                <p className="text-red-500 text-sm mt-1">
                                    {registerForm.formState.errors.email.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-[#6A798A]">
                                Password
                            </label>
                            <div className="relative flex justify-center items-center">
                                <input
                                    disabled={loadingApi}
                                    {...registerForm.register("password")}
                                    type="password"
                                    id="password"
                                    placeholder="Set Password"
                                    className="shadow-xs w-full ps-7 bg-[#F5F7FA] border border-gray-300 text-gray-900 text-sm rounded-3xl p-2.5"
                                    required
                                />
                                <TbLockFilled className='absolute left-2 text-gray-500 text-md' />
                            </div>
                            {registerForm.formState.errors.password && (
                                <p className="text-red-500 text-sm mt-1">
                                    {registerForm.formState.errors.password.message}
                                </p>
                            )}
                        </div>

                        <div className="md:col-span-2">
                            <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-[#6A798A]">
                                Confirm Password
                            </label>
                            <div className="relative flex justify-center items-center">
                                <input
                                    disabled={loadingApi}
                                    {...registerForm.register("rePassword")}
                                    type="password"
                                    id="rePassword"
                                    placeholder="Confirm Password"
                                    className="shadow-xs w-full ps-7 bg-[#F5F7FA] border border-gray-300 text-gray-900 text-sm rounded-3xl p-2.5"
                                    required
                                />
                                <TbLockCheck className='absolute left-2 text-gray-500 text-md' />
                            </div>
                            {registerForm.formState.errors.rePassword && (
                                <p className="text-red-500 text-sm mt-1">
                                    {registerForm.formState.errors.rePassword.message}
                                </p>
                            )}
                        </div>

                        <div className="md:col-span-2">
                            <label htmlFor="dateOfBirth" className="block mb-2 text-sm font-medium text-[#6A798A]">
                                Date of Birth
                            </label>
                            <input
                                disabled={loadingApi}
                                {...registerForm.register("dateOfBirth")}
                                type="date"
                                id="dateOfBirth"
                                className="shadow-xs w-full bg-[#F5F7FA] border border-gray-300 text-gray-900 text-sm rounded-3xl p-2.5"
                                required
                            />
                            {registerForm.formState.errors.dateOfBirth && (
                                <p className="text-red-500 text-sm mt-1">
                                    {registerForm.formState.errors.dateOfBirth.message}
                                </p>
                            )}
                        </div>

                        <div className="md:col-span-2">
                            <label className="block mb-2 text-sm font-medium text-[#6A798A]">
                                Gender
                            </label>
                            <div className="flex gap-6">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        disabled={loadingApi}
                                        {...registerForm.register("gender")}
                                        type="radio"
                                        value="male"
                                        className="accent-[#1A324A]"
                                    />
                                    <span>Male</span>
                                </label>

                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        disabled={loadingApi}
                                        {...registerForm.register("gender")}
                                        type="radio"
                                        value="female"
                                        className="accent-[#1A324A]"
                                    />
                                    <span>Female</span>
                                </label>
                            </div>

                            {registerForm.formState.errors.gender && (
                                <p className="text-red-500 text-sm mt-1">
                                    {registerForm.formState.errors.gender.message}
                                </p>
                            )}
                        </div>

                    </div>
                    <div className="mt-6">
                        {loadingApi ? (
                            <button
                                disabled
                                className="w-full text-white opacity-75 mb-2 bg-[#1A324A] font-semibold rounded-3xl text-sm px-5 py-2.5 text-center"
                            >
                                Loading
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="w-full mb-2 cursor-pointer text-white bg-[#1A324A] hover:bg-[#16293f] font-semibold rounded-lg text-sm px-5 py-2.5 text-center transition-colors"
                            >
                                Register Now
                            </button>
                        )}
                        <span className="text-sm font-light text-gray-400 mt-1 block text-center">
                            Already have an account?{" "}
                            <Link
                                href="/login"
                                className="text-[#111E2D] hover:underline font-medium"
                            >
                                Sign In
                            </Link>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;