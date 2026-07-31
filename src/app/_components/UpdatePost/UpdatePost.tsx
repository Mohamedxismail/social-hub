"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdAddPhotoAlternate } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5"; 
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type UpdateProps = {
  postId: string;
  postContent: string;
  postImage?: string;
};

export default function UpdatePost({
  postId,
  postContent,
  postImage,
}: UpdateProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [content, setContent] = useState(postContent);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState(postImage || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setContent(postContent);
    setPreview(postImage || "");
    setFile(null);
  }, [postContent, postImage]);

  async function handleUpdatePost() {
    setLoading(true);

    const formData = new FormData();

    formData.append("body", content);

    if (file) {
      formData.append("image", file);
    } 
    const res = await fetch(`/api/updatePost?postId=${postId}`, {
      method: "PUT",
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      toast.success(data.message);
      router.refresh();
      setOpen(false);
    } else {
      toast.warning(data.message);
    }
    setLoading(false);
  }
  const handleRemoveImage = () => {
    setFile(null);
    setPreview(""); 
    const fileInput = document.getElementById("image") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-md px-1 py-2 text-blue-400 cursor-pointer"
      >
        <FiEdit />
        Edit Post
      </button>

      {open && (
        <div className="fixed inset-0 z-50  flex items-center justify-center bg-black/60 backdrop-blur-sm ">
          <div className="w-full max-w-sm rounded-2xl bg-[#1f232b] p-6 shadow-2xl">

            <h2 className="mb-5 text-xl font-bold text-white">
              Edit Post
            </h2>

            <textarea dir="auto"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              className="min-h-40 w-full resize-none rounded-xl border border-zinc-700 bg-[#262b33] p-4 text-white outline-none"
            />

            <div className="mt-4 flex gap-3">
              <label
                htmlFor="image"
                className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-600 px-4 py-2 text-white "
              >
                <MdAddPhotoAlternate />
                {preview ? "Change Image" : "Add Image"}
              </label>

              <input
                id="image"
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
            </div>

            {preview && (
              <div className="mt-5 relative group">
                <Image
                  src={preview}
                  alt="Preview"
                  width={700}
                  height={300}
                  className="w-full rounded-2xl object-cover max-h-105"
                  unoptimized
                />
                
                
                <button
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2  text-red-600 rounded-full p-1.5 cursor-pointer  transition-opacity duration-300 "
                  title="Remove Image"
                >
                  <IoCloseSharp size={24} />
                </button>
              </div>
            )}

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  setOpen(false);
                  setContent(postContent);
                  setPreview(postImage || "");
                  setFile(null);
                }}
                className="rounded-lg bg-zinc-700 px-5 py-2 text-white hover:bg-zinc-600 transition cursor-pointer"
              >
                 Cancel
              </button>

              <button
                disabled={(!content.trim() && !file && !preview) || loading} 
                onClick={handleUpdatePost}
                className="rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
              >
                {loading ? "Saving" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}