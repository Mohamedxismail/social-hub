"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FiTrash2 } from "react-icons/fi"
import { toast } from "sonner"

type PostIdProps = {
  postId: string
}
function DeletePost({ postId }: PostIdProps) {
  const router = useRouter()
  const[loading,setLoading]=useState(false)

  async function handleDeltePost() {
    setLoading(true)
    const res = await fetch(`/api/deletePost?postId=${postId}`, {
      method: "DELETE"
    })

    const data = await res.json()

    if (res.ok) {
      router.refresh()
      toast.success(data.message)
      setLoading(false)

    } else {
      toast.warning(data.message)
      setLoading(false)
    }
    setLoading(false)

  }
  return (
    <div className="flex ">
      <button disabled={loading}
        onClick={handleDeltePost}
        className="flex items-center gap-2 disabled:opacity-60 rounded-md px-1 py-2 cursor-pointer text-red-500"
      >
        <FiTrash2 className="text-xl" />
       {loading ? "Deleting" : "Delete"} 
      </button>
    </div>
  )
}

export default DeletePost
