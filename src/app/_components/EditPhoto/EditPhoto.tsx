"use client";
import Image from "next/image";
import React, { useState } from "react";
import skelton from "@/assets/images/3c67757cef723535a7484a6c7bfbfc43.jpg";
import { toast } from "sonner";
import { FaCamera } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
type Props = {
    user: {
        name: string;
        username: string;
        photo: string;
    };
};
export default function EditPhoto({ user }: Props) {
    const router = useRouter()
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const { update } = useSession();

    async function handlePhoto() {
        if (!file) return;
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("photo", file);
            const res = await fetch("/api/editPhoto", {
                method: "PUT",
                body: formData,
            });
            const data = await res.json();
            if (res.ok) {
                toast.success(data.message);
                router.refresh()
                setFile(null);
                setPreview(null);
                await update();
            } else {
                toast.warning(data.message);
            }
        } catch {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-[#111827]/80 border border-gray-800 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-xl backdrop-blur-sm relative">
            <div className="relative group">
                <div className="w-28 h-28 rounded-full overflow-hidden border-2  p-1 bg-gray-900 shadow-lg">
                    <Image
                        src={preview || user.photo || skelton}
                        alt="photo user"
                        width={112}
                        height={112}
                        className="w-full h-full rounded-full object-cover"
                    />
                </div>
                <label className="absolute bottom-1 right-1 bg-slate-600 text-white p-2.5 rounded-full cursor-pointer shadow-md transition-all duration-200 border-2 border-[#111827] group-hover:scale-110">
                    <FaCamera className="text-xs" />
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                            const selectedFile = e.target.files?.[0];
                            if (!selectedFile) return;
                            setFile(selectedFile);
                            setPreview(URL.createObjectURL(selectedFile));
                        }}
                    />
                </label>
            </div>

            <h2 className="text-xl font-bold text-white mt-4">
                {user.name}
            </h2>

            <span className="text-sm text-slate-400 font-medium">
                @ {user.username}
            </span>

            <p className="text-gray-500 mt-2">
                Click the camera icon to choose a new profile photo
            </p>

            {file && (
                <button
                    onClick={handlePhoto}
                    disabled={loading}
                    className="mt-6 bg-blue-700 cursor-pointer disabled:bg-blue-600/40 disabled:cursor-not-allowed px-6 py-3 rounded-xl font-semibold transition"
                >
                    {loading ? "Uploading ..." : "Save Photo"}
                </button>
            )}
        </div>
    );
}