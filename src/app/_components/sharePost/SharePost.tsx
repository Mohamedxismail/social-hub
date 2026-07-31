"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdAddPhotoAlternate, MdInsertPhoto } from "react-icons/md";
import { PiShareFat } from "react-icons/pi";
import { toast } from "sonner";

type ShareProps = {
    postId: string;
    shareCount: number;
}
function SharePost({ postId, shareCount }: ShareProps) {
    const [text, setText] = useState("")
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    async function handleSharePost() {
        setLoading(true)
        const res = await fetch(`/api/sharePost?postId=${postId}`, {
            method: "POST",
            body: JSON.stringify({
                body: text.trim() || " ",
            })
        }
        )
        const data = await res.json()
        console.log(data);

        if (res.ok) {
            router.refresh()
            toast.success(data.message)
            setText("")
            setLoading(false)
        }
    }

    return (
        <div className="">
            <div onClick={() => setOpen((prev => !prev))} className="">
                <button className="flex items-center text-white text-lg cursor-pointer gap-2" ><PiShareFat />
                </button>
            </div>
            {open && <div className="fixed inset-0 z-50  flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm p-6">
                <div className="w-full max-w-xl h-[45vh]  relative rounded-xl bg-[#18181b] border border-zinc-800 p-5 text-white flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-150">
                    <h1 className="mb-5 text-lg">Share This Post</h1>
                    <textarea dir="auto" placeholder="Say Something ..." className="bg-transparent text-lg  placeholder:text-gray-600 min-h-35 max-h-50 rounded-lg p-3" value={text} onChange={(e) => setText(e.target.value)} />
                    <button  onClick={() => {
                        handleSharePost();
                        setOpen((prev) => !prev);
                    }} className="self-end mt-3 bg-blue-600 cursor-pointer p-2  rounded-lg  ">{loading ? "loading" : "Share Now"}</button>
                    <button
                        onClick={() => {
                            setOpen(false);
                        }}
                        className="text-xl font-light absolute top-4 right-3 cursor-pointer text-zinc-400 hover:text-red-400 transition-colors"
                    >
                        ✕
                    </button>
                </div>

            </div>}

        </div>
    )
}

export default SharePost
