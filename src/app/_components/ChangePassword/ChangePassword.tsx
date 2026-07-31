"use client";
import React, { useState } from "react";
import { signOut } from "next-auth/react";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordSchemaType, updatePasswordSchema } from "@/app/schema/updatePassword.schema";

export default function ChangePassword() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false)

  const passwordForm = useForm<PasswordSchemaType>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    resolver: zodResolver(updatePasswordSchema),
  });

  async function handleChangePassword(data: PasswordSchemaType) {
    try {
      setLoading(true)
      const res = await fetch("/api/changePassword", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: data.currentPassword,
          newPassword: data.newPassword,
        }),
      });

      const resData = await res.json();

      if (res.ok) {
        setLoading(false)
        toast.success(resData.message || "Password updated successfully , please login again");
        await signOut({ callbackUrl: "/login" });
      } else {

        setLoading(false)
        passwordForm.setError("currentPassword", {
          type: "manual",
          message: "Incorrect current password",
        });
      }
    } catch (error) {
      passwordForm.setError("currentPassword", {
        type: "manual",
        message: "Incorrect current password",
      });
    }
  }

  return (
    <div className="bg-[#111827]/80 border mb-5 border-gray-800 rounded-3xl p-6 sm:p-8 shadow-xl backdrop-blur-sm">
      <h3 className="text-2xl font-bold text-white mb-6">Security</h3>

      <form onSubmit={passwordForm.handleSubmit(handleChangePassword)} className="flex flex-col gap-5">

        <div className="relative">
          <label className="text-md text-gray-300 mb-1.5 block font-medium">
            Current Password
          </label>
          <div className="relative flex items-center">
            <FaLock className="absolute left-4 text-gray-500 text-sm" />

            <input
              {...passwordForm.register("currentPassword")}
              type={showCurrent ? "text" : "password"}
              placeholder="••••••••"
              className="w-full pl-11 pr-11 py-3 bg-[#0B0F17]/60 border border-gray-800 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-slate-500 transition"
            />

            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-4 text-gray-500 hover:text-gray-300 transition text-sm"
            >
              {showCurrent ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {passwordForm.formState.errors.currentPassword && (
            <p className="text-red-500 text-md mt-1.5">{passwordForm.formState.errors.currentPassword.message}</p>
          )}
        </div>

        <div className="relative">
          <label className="text-md text-gray-300 mb-1.5 block font-medium">
            New Password
          </label>
          <div className="relative flex items-center">
            <FaLock className="absolute left-4 text-gray-500 text-sm" />
            <input
              {...passwordForm.register("newPassword")}
              type={showNew ? "text" : "password"}
              placeholder="••••••••"
              className="w-full pl-11 pr-11 py-3 bg-[#0B0F17]/60 border border-gray-800 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-slate-500 transition"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-4 text-gray-500 hover:text-gray-300 transition text-sm"
            >
              {showNew ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {passwordForm.formState.errors.newPassword && (
            <p className="text-red-500 text-md mt-1.5">{passwordForm.formState.errors.newPassword.message}</p>
          )}
        </div>

        <div className="relative">
          <label className="text-md text-gray-300 mb-1.5 block font-medium">
            Confirm New Password
          </label>
          <div className="relative flex items-center">
            <FaLock className="absolute left-4 text-gray-500 text-sm" />
            <input
              {...passwordForm.register("confirmPassword")}
              type={showConfirm ? "text" : "password"}
              placeholder="••••••••"
              className="w-full pl-11 pr-11 py-3 bg-[#0B0F17]/60 border border-gray-800 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-slate-500 transition"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-4 text-gray-500 hover:text-gray-300 transition text-sm"
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {passwordForm.formState.errors.confirmPassword && (
            <p className="text-red-500 text-md mt-1.5">{passwordForm.formState.errors.confirmPassword.message}</p>
          )}
        </div>

        <button
          disabled={loading}
          type="submit"
          className="w-full bg-blue-600 disabled:bg-slate-600 cursor-pointer  text-white font-semibold py-3 rounded-xl transition-all duration-200 mt-2 shadow-sm shadow-blue-600/25 active:scale-[0.99]"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>

      </form>
    </div>
  );
}