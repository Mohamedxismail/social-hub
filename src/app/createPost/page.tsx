"use client";
import { useRef, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import skelton from "@/assets/images/3c67757cef723535a7484a6c7bfbfc43.jpg";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import { MdAddPhotoAlternate } from "react-icons/md";
import Link from "next/link";
import { FaPenNib } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";

export default function Post() {
  const router = useRouter();
  const { data: session } = useSession();
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const pathname = usePathname();
  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
    setContent(textarea.value);
  };

  async function handleCreatePost() {
    const formData = new FormData();

    if (file) {
      formData.append("image", file);
    }

    formData.append("body", content);
    setLoading(true)
    const res = await fetch("/api/createPost", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      setContent("");
      textareaRef.current!.style.height = "auto";
      setFile(null);
      setPreview("");
      toast.success(data.message);
       if (pathname === "/createPost") {
      router.push("/");
    } else {
      router.refresh();
    }
      setLoading(false)
    } if (!res.ok) {
      toast.error("Failed to create post");
       setLoading(false)
      return;
    }
    setLoading(false)
  }

  return (
    <div className={`p-1 ${pathname === "/createPost" ? "p-2" : "p-0" }`}>
    <div className="rounded-xl border border-zinc-800  bg-[#111827]/80 p-5 shadow-lg">
      <div className="flex items-start gap-4">
        <Link href={`/profile/${session?.user._id}`}> <Image
          className="rounded-full object-cover w-14 h-14"
          src={session?.user?.photo || skelton}
          alt="Profile Picture"
          width={56}
          height={56}
        /> </Link>

        <div className="flex-1 flex flex-col gap-4">
          <textarea dir="auto" required
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onInput={handleInput}
            placeholder="What's on your mind?"
            className="w-full bg-transparent text-white placeholder:text-gray-500 outline-none resize-none overflow-hidden min-h-5 max-h-52"
          />          {preview && (
            <div className="relative w-fit">
              <Image
                src={preview}
                alt="Preview"
                width={450}
                height={300}
                className="rounded-xl border border-zinc-700 object-cover max-h-30 w-auto"
              />

              <button
                type="button"
                onClick={() => {
                  setPreview("");
                  setFile(null);
                }}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/70 hover:bg-red-600 transition flex items-center justify-center text-white"
              >
                ✕
              </button>
            </div>
          )}

          <div className="flex items-center justify-between border-t border-zinc-800 pt-4">
            <label
              htmlFor="file"
              className="flex items-center  cursor-pointer text-gray-300 hover:text-white transition"
            >
              <div className="flex justify-center items-center gap-1">
                <MdAddPhotoAlternate className="text-xl text-slate-400" />
                <span className="text-sm font-medium mt-1">Add Photo</span>
              </div>
            </label>
            <input
              id="file"
              className="hidden"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const selectedFile = e.target.files?.[0];
                if (!selectedFile) return;
                setFile(selectedFile);
                setPreview(URL.createObjectURL(selectedFile));
              }}
            />
            <button
              disabled={!content.trim() || loading}
              onClick={handleCreatePost}
              className="bg-blue-600 hover:bg-blue-700 cursor-pointer transition px-4 py-1 rounded-lg text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Posting" : "Post"}
            </button>
          </div>
        </div>
      </div>
      
    </div>
    {
  pathname === "/createPost" && (
    <div className="text-center text-3xl text-white flex flex-col items-center mt-20">
     
      <FaPenToSquare className="text-5xl mb-5 text-slate-500" />
      
      <h1>Create Post</h1>
    </div>
  )
}
    
    </div>
    
  );
}