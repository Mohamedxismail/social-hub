"use client";

import Image from "next/image";
import React, { useState } from "react";
import { FiSend } from "react-icons/fi";
import { MdAddPhotoAlternate } from "react-icons/md";
import { toast } from "sonner";

type PostIdComment = {
  postId: string;
  onCommentCreated: () => void;
};

function CreateComment({ postId, onCommentCreated }: PostIdComment) {
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<File | null>(null);
  const [previews, setPreviews] = useState("");
  const[loading,setLoading]=useState(false)

  async function handleCreateComment() {
    const formData = new FormData();

    formData.append("content", content);

    if (files) {
      formData.append("image", files);
    }

    setLoading(true)
    const res = await fetch(`/api/createComment?postId=${postId}`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      setContent("");
      setFiles(null);
      setPreviews("");
      onCommentCreated();
      toast.success(data.message);
      setLoading(false)
    } else {
      toast.warning(data.message);
      setLoading(false)
    }
  }

  return (
    <div className="mt-7">
      {previews && (
        <div className="relative mt-4 mb-4 w-fit">
          <Image
            src={previews}
            alt="Preview"
            width={100}
            height={100}
            className=" rounded-lg object-cover border border-gray-700"
          />

          <button
            type="button"
            onClick={() => {
              setFiles(null);
              setPreviews("");
            }}
            className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-white"
          >
            ✕
          </button>
        </div>
      )}
      <div className="flex items-center">
        
        <input dir="auto"
          className="w-full rounded-lg text-md border border-gray-700 bg-[#252525] p-3 text-white outline-none"
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your comment"
        />

        <label htmlFor="files" className="ms-2 cursor-pointer">
          <MdAddPhotoAlternate className="text-2xl" />
        </label>

        <input
          id="files"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const selectedFiles = e.target.files?.[0];
            if (!selectedFiles) return;
            setFiles(selectedFiles);
            setPreviews(URL.createObjectURL(selectedFiles));
          }}
        />

        <button
          disabled={!content.trim() || loading}
          onClick={handleCreateComment}
          className="ms-4 text-xl rounded-lg disabled:opacity-40 disabled:cursor-not-allowed text-white cursor-pointer"
        >
          <FiSend />
        </button>
      </div>

      
    </div>
  );
}

export default CreateComment;