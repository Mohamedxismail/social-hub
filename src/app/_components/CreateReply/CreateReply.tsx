"use client"
import Image from "next/image";
import { useState } from "react";
import { FiSend } from "react-icons/fi";
import { MdAddPhotoAlternate } from "react-icons/md";
import { toast } from "sonner";
type ReplyProps = {
  postId: string;
  commentId: string;
  onCommentCreated: () => void;
}
function CreateReply({ postId, commentId, onCommentCreated }: ReplyProps) {
  const [contentReply, setContentReply] = useState("")
    const[fileReply,setFileReply] = useState<File | null>(null)
    const[previewReply,setPreviewReply]=useState("")
  
  const [open, setOpen] = useState(false)

  async function handleCreateReply() {
    const formData = new FormData()
    formData.append("content", contentReply)
      if (fileReply) {
      formData.append("image", fileReply);
    }
    const res = await fetch(`/api/createReply?postId=${postId}&commentId=${commentId}`, {
      method: "POST",
      body: formData
    })

    const data = await res.json()
    console.log(data);
    if (res.ok) {
      setContentReply("")
      onCommentCreated()
      toast.success(data.message)
      setPreviewReply("")
    } else {
      toast.warning(data.message)
    }
  }

  return (
    <div className="w-full mt-2">
       {previewReply && (
        <div className="relative mt-4 mb-4 w-fit">
          <Image
            src={previewReply}
            alt="Preview"
            width={50}
            height={50}
            className=" rounded-lg object-cover border border-gray-700"
          />

          <button
            type="button"
            onClick={() => {
              setFileReply(null);
              setPreviewReply("");
            }}
            className="absolute -top-2 -right-2 flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-red-600 text-white"
          >
            ✕
          </button>
        </div>
      )}
      <button 
        onClick={() => setOpen((prev) => !prev)}
        className="text-xs text-gray-400 hover:text-white font-medium transition-colors cursor-pointer"
      >
        {open ? "Cancel" : "Reply"}
      </button>

      {open && (
        <div className="flex items-center gap-2 mt-2 w-full bg-[#1e1e1e] border border-gray-700/60 rounded-lg px-3 py-1.5 focus-within:border-gray-500 transition-colors">
          <input dir="auto" 
            className="flex-1 bg-transparent text-sm text-white outline-none placeholder-gray-500"
            type='text' 
            value={contentReply} 
            onChange={(e) => setContentReply(e.target.value)} 
            placeholder='Write your reply ...' 
          />
          <label htmlFor='fileReply' className='cursor-pointer'><MdAddPhotoAlternate className='text-2xl ms-2' /></label>
                <input onChange={(e)=> {
                  const selectedFileReply = e.target.files?.[0];
                  if(!selectedFileReply) return;
                  
                    setFileReply(selectedFileReply)
                    setPreviewReply(URL.createObjectURL(selectedFileReply))
                    
                  
                }}  id='fileReply' className='hidden' type='file' accept="image/*"/>
          <button
            onClick={handleCreateReply}
            className="text-gray-400 hover:text-white transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed text-base"
            disabled={!contentReply.trim()}
          >
            <FiSend />
          </button> 
        </div>
      )}
    </div>
  )
}

export default CreateReply;